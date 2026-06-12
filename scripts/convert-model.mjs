/**
 * Converts public/models/bike.stl (52 MB, ~1M triangles) into a compact GLB:
 *   1. Parse binary STL
 *   2. Deduplicate vertices (STL repeats every vertex per-triangle)
 *   3. Simplify with meshoptimizer to a target triangle count
 *   4. Write a minimal GLB (positions + indices; normals computed client-side)
 *
 * Usage: node scripts/convert-model.mjs [targetTriangles]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { MeshoptSimplifier } from "meshoptimizer";

const TARGET_TRIS = Number(process.argv[2]) || 160_000;
const SRC = "model-src/bike.stl";
const OUT = "public/models/bike.glb";

// ── 1. Parse binary STL ──
const buf = readFileSync(SRC);
const triCount = buf.readUInt32LE(80);
console.log(`STL triangles: ${triCount.toLocaleString()}`);

// ── 2. Deduplicate vertices ──
const vertMap = new Map();
const positions = [];
const indices = new Uint32Array(triCount * 3);
let nextIdx = 0;

for (let t = 0; t < triCount; t++) {
  const base = 84 + t * 50 + 12; // skip header + normal
  for (let v = 0; v < 3; v++) {
    const off = base + v * 12;
    const key = buf.toString("latin1", off, off + 12);
    let idx = vertMap.get(key);
    if (idx === undefined) {
      idx = nextIdx++;
      vertMap.set(key, idx);
      positions.push(buf.readFloatLE(off), buf.readFloatLE(off + 4), buf.readFloatLE(off + 8));
    }
    indices[t * 3 + v] = idx;
  }
}
const posArr = new Float32Array(positions);
console.log(`Unique vertices: ${nextIdx.toLocaleString()}`);

// ── 3. Simplify ──
await MeshoptSimplifier.ready;
const [simplified, error] = MeshoptSimplifier.simplify(
  indices, posArr, 3, TARGET_TRIS * 3, 0.01, [],
);
console.log(`Simplified to ${(simplified.length / 3).toLocaleString()} triangles (error ${error.toFixed(4)})`);

// Compact: drop unreferenced vertices
const remap = new Int32Array(nextIdx).fill(-1);
let outVerts = 0;
const outIdx = new Uint32Array(simplified.length);
for (let i = 0; i < simplified.length; i++) {
  const old = simplified[i];
  if (remap[old] === -1) remap[old] = outVerts++;
  outIdx[i] = remap[old];
}
const outPos = new Float32Array(outVerts * 3);
for (let old = 0; old < nextIdx; old++) {
  const nw = remap[old];
  if (nw !== -1) {
    outPos[nw * 3] = posArr[old * 3];
    outPos[nw * 3 + 1] = posArr[old * 3 + 1];
    outPos[nw * 3 + 2] = posArr[old * 3 + 2];
  }
}
console.log(`Compacted vertices: ${outVerts.toLocaleString()}`);

// ── 4. Write minimal GLB ──
const min = [Infinity, Infinity, Infinity];
const max = [-Infinity, -Infinity, -Infinity];
for (let i = 0; i < outVerts; i++) {
  for (let c = 0; c < 3; c++) {
    const val = outPos[i * 3 + c];
    if (val < min[c]) min[c] = val;
    if (val > max[c]) max[c] = val;
  }
}

const pad4 = (n) => (n + 3) & ~3;
const idxBytes = outIdx.byteLength;
const posBytes = outPos.byteLength;
const binLength = pad4(idxBytes) + posBytes;

const gltf = {
  asset: { version: "2.0", generator: "tem-convert-model" },
  scene: 0,
  scenes: [{ nodes: [0] }],
  nodes: [{ mesh: 0, name: "bike" }],
  meshes: [{ primitives: [{ attributes: { POSITION: 1 }, indices: 0, mode: 4 }] }],
  accessors: [
    { bufferView: 0, componentType: 5125, count: outIdx.length, type: "SCALAR" },
    { bufferView: 1, componentType: 5126, count: outVerts, type: "VEC3", min, max },
  ],
  bufferViews: [
    { buffer: 0, byteOffset: 0, byteLength: idxBytes, target: 34963 },
    { buffer: 0, byteOffset: pad4(idxBytes), byteLength: posBytes, target: 34962 },
  ],
  buffers: [{ byteLength: binLength }],
};

let jsonStr = JSON.stringify(gltf);
while (jsonStr.length % 4) jsonStr += " ";
const jsonBuf = Buffer.from(jsonStr, "utf8");

const bin = Buffer.alloc(binLength);
Buffer.from(outIdx.buffer, outIdx.byteOffset, idxBytes).copy(bin, 0);
Buffer.from(outPos.buffer, outPos.byteOffset, posBytes).copy(bin, pad4(idxBytes));

const total = 12 + 8 + jsonBuf.length + 8 + bin.length;
const out = Buffer.alloc(total);
out.writeUInt32LE(0x46546c67, 0); // magic "glTF"
out.writeUInt32LE(2, 4);
out.writeUInt32LE(total, 8);
out.writeUInt32LE(jsonBuf.length, 12);
out.writeUInt32LE(0x4e4f534a, 16); // "JSON"
jsonBuf.copy(out, 20);
const binChunkOff = 20 + jsonBuf.length;
out.writeUInt32LE(bin.length, binChunkOff);
out.writeUInt32LE(0x004e4942, binChunkOff + 4); // "BIN"
bin.copy(out, binChunkOff + 8);

writeFileSync(OUT, out);
console.log(`Wrote ${OUT}: ${(out.length / 1024 / 1024).toFixed(2)} MB (was ${(buf.length / 1024 / 1024).toFixed(1)} MB)`);
