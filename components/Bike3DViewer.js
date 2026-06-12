"use client";

import { Suspense, useMemo, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useProgress, Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const BIKE_MODEL_URL = "/models/bike.glb";
useGLTF.preload(BIKE_MODEL_URL);

function BikeModel() {
  const { scene } = useGLTF(BIKE_MODEL_URL);

  const geometry = useMemo(() => {
    let rawGeo;
    scene.traverse((o) => { if (!rawGeo && o.isMesh) rawGeo = o.geometry; });
    const geo = rawGeo.clone();

    // Step 1 — Center the raw geometry
    geo.computeBoundingBox();
    const center = new THREE.Vector3();
    geo.boundingBox.getCenter(center);
    geo.translate(-center.x, -center.y, -center.z);

    // Step 2 — Reorient: CAD files use Z-up; Three.js uses Y-up.
    // +90° on X maps CAD-Z (height) → Three.js Y (up),
    // then 180° on Z flips it right-side up (was upside-down after just X).
    geo.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI / 2));
    geo.applyMatrix4(new THREE.Matrix4().makeRotationZ(Math.PI));

    // Step 3 — Scale geometry to a consistent visible radius
    geo.computeBoundingSphere();
    const s = 3.2 / (geo.boundingSphere?.radius || 1);
    geo.scale(s, s, s);

    geo.computeVertexNormals();
    return geo;
  }, [scene]);

  return (
    <mesh geometry={geometry} rotation={[0, -Math.PI * 0.15, 0]} castShadow>
      <meshStandardMaterial
        color="#1A1714"
        metalness={0.72}
        roughness={0.22}
        envMapIntensity={1.2}
      />
    </mesh>
  );
}

function ModelLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
        userSelect: "none",
        minWidth: "160px",
      }}>
        <div style={{
          fontSize: "0.55rem",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "#C09850",
          marginBottom: "0.8rem",
        }}>
          Loading 3D Model
        </div>
        <div style={{
          fontSize: "3rem",
          fontWeight: "300",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          color: "#fff",
        }}>
          {Math.round(progress)}
          <span style={{ fontSize: "1rem", marginLeft: "0.15rem", color: "#C09850" }}>%</span>
        </div>
        <div style={{
          marginTop: "1.2rem",
          width: "140px",
          height: "1px",
          background: "rgba(255,255,255,0.08)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            top: 0, left: 0,
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #9A7C38, #C09850)",
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>
    </Html>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.28} color="#FFF6EE" />
      <directionalLight position={[6, 8, 5]} intensity={2.0} color="#FFFFFF" castShadow />
      <directionalLight position={[-5, 3, 3]} intensity={0.7} color="#FFF0CC" />
      <directionalLight position={[0, 2, -8]} intensity={3.5} color="#D4AA60" />
      <directionalLight position={[0, -4, 2]} intensity={0.4} color="#FFF8F0" />

      <Suspense fallback={<ModelLoader />}>
        <BikeModel />
        <Environment preset="warehouse" />
      </Suspense>

      <OrbitControls
        target={[0, 0, 0]}
        autoRotate
        autoRotateSpeed={0.8}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI * 2 / 3}
        dampingFactor={0.06}
        enableDamping
      />
    </>
  );
}

export default function Bike3DViewer({ className, height = "100vh" }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    // Explicit height required — R3F Canvas doesn't fill min-height, only height
    <div
      className={className}
      style={{ width: "100%", height, position: "relative", display: "block" }}
    >
      <Canvas
        camera={{ position: [2, 1, 9], fov: 42 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", inset: 0, background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
