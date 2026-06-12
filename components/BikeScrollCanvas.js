"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Html, useProgress, useGLTF, useEnvironment } from "@react-three/drei";
import * as THREE from "three";
import { transform } from "framer-motion";

export const BIKE_MODEL_URL = "/models/bike.glb";
// Starts fetching + parsing as soon as this chunk loads (ClientShell imports it
// during the splash intro, so the model is ready before the site appears).
// The Environment HDR also suspends the scene, so warm it too.
useGLTF.preload(BIKE_MODEL_URL);
useEnvironment.preload({ preset: "warehouse" });

/*
 * Scroll choreography keyframes (input = scroll progress 0 → 1):
 *   rotation — one full revolution, ending at the same angle it started
 *   scale    — grows through the feature stages, pulls back for the finale
 *   x        — alternates sides so the bike sits opposite each text panel
 */
const KEYS = [0, 0.16, 0.36, 0.56, 0.78, 1];
const SCALE_OUT = [1.0, 1.45, 1.7, 1.9, 1.25, 1.05];
const X_OUT = [1.7, -1.4, 1.4, -1.4, 0, 0];
const ROT_START = -Math.PI * 0.15;
const ROT_END = ROT_START + Math.PI * 2;

function ScrollBike({ progress }) {
  const group = useRef();
  const { scene } = useGLTF(BIKE_MODEL_URL);
  const { size } = useThree();

  const geometry = useMemo(() => {
    let rawGeo;
    scene.traverse((o) => { if (!rawGeo && o.isMesh) rawGeo = o.geometry; });
    const geo = rawGeo.clone();

    geo.computeBoundingBox();
    const center = new THREE.Vector3();
    geo.boundingBox.getCenter(center);
    geo.translate(-center.x, -center.y, -center.z);

    // CAD files use Z-up; Three.js uses Y-up. +90° X maps height to up,
    // then 180° Z flips it right-side up.
    geo.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI / 2));
    geo.applyMatrix4(new THREE.Matrix4().makeRotationZ(Math.PI));

    geo.computeBoundingSphere();
    const s = 3.2 / (geo.boundingSphere?.radius || 1);
    geo.scale(s, s, s);

    geo.computeVertexNormals();
    return geo;
  }, [scene]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    const p = progress.get();
    // On narrow screens shrink the side-to-side travel so the bike stays in frame
    const xFactor = Math.min(1, size.width / 1100);

    const targetRot = transform(p, [0, 1], [ROT_START, ROT_END]);
    const targetScale = transform(p, KEYS, SCALE_OUT);
    const targetX = transform(p, KEYS, X_OUT) * xFactor;

    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetRot, 5, delta);
    g.position.x = THREE.MathUtils.damp(g.position.x, targetX, 5, delta);
    const s = THREE.MathUtils.damp(g.scale.x, targetScale, 5, delta);
    g.scale.setScalar(s);

    // Gentle idle float so the bike never feels frozen between scrolls
    g.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.06;
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry} castShadow>
        <meshStandardMaterial
          color="#1A1714"
          metalness={0.72}
          roughness={0.22}
          envMapIntensity={1.2}
        />
      </mesh>
    </group>
  );
}

function ModelLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ textAlign: "center", fontFamily: "system-ui, sans-serif", userSelect: "none", minWidth: "160px" }}>
        <div style={{ fontSize: "0.55rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C09850", marginBottom: "0.8rem" }}>
          Loading 3D Model
        </div>
        <div style={{ fontSize: "3rem", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1, color: "#fff" }}>
          {Math.round(progress)}
          <span style={{ fontSize: "1rem", marginLeft: "0.15rem", color: "#C09850" }}>%</span>
        </div>
      </div>
    </Html>
  );
}

export default function BikeScrollCanvas({ progress }) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 9], fov: 42 }}
      dpr={[1, 1.8]}
      shadows
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0, background: "transparent", pointerEvents: "none" }}
    >
      <ambientLight intensity={0.28} color="#FFF6EE" />
      <directionalLight position={[6, 8, 5]} intensity={2.0} color="#FFFFFF" castShadow />
      <directionalLight position={[-5, 3, 3]} intensity={0.7} color="#FFF0CC" />
      <directionalLight position={[0, 2, -8]} intensity={3.5} color="#D4AA60" />
      <directionalLight position={[0, -4, 2]} intensity={0.4} color="#FFF8F0" />

      <Suspense fallback={<ModelLoader />}>
        <ScrollBike progress={progress} />
        <Environment preset="warehouse" />
      </Suspense>
    </Canvas>
  );
}
