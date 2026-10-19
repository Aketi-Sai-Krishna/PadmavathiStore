import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeHero({ reducedMotion }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer;
    let frame = 0;
    let disposed = false;
    let isReduced = reducedMotion;
    const pointer = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 8.6);

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      host.classList.add("webgl-fallback");
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");

    scene.add(new THREE.HemisphereLight(0xffffff, 0x9c8357, 2));
    const key = new THREE.DirectionalLight(0xffffff, 2.7);
    key.position.set(4, 6, 7);
    scene.add(key);
    const warm = new THREE.PointLight(0xffb64d, 1.7, 18);
    warm.position.set(-4, 1, 4);
    scene.add(warm);

    const group = new THREE.Group();
    scene.add(group);

    const material = (color, roughness = 0.34) =>
      new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.025 });

    const colors = [
      material(0xf47735), material(0xffd45d), material(0x528654),
      material(0xfff2d3), material(0xed9982), material(0x8cb7df),
      material(0x70412f), material(0xffffff)
    ];

    const box = new THREE.BoxGeometry(1, 1.25, 0.48);
    const smallBox = new THREE.BoxGeometry(0.78, 0.86, 0.45);
    const sphere = new THREE.SphereGeometry(0.38, 28, 20);
    const torus = new THREE.TorusGeometry(0.4, 0.15, 12, 32);

    const add = (geometry, mat, position, rotation, scale) => {
      const mesh = new THREE.Mesh(geometry, mat);
      mesh.position.set(...position);
      mesh.rotation.set(...rotation);
      mesh.scale.set(...scale);
      group.add(mesh);
      return mesh;
    };

    const heroPack = add(box, colors[0], [0.1, -0.02, 0.35], [0.03, -0.35, -0.08], [1.5, 1.45, 1.15]);
    const label = add(new THREE.BoxGeometry(0.95, 0.46, 0.035), colors[3], [0.1, -0.02, 0.91], [0.03, -0.35, -0.08], [1.45, 1.3, 1]);
    const biscuitPack = add(smallBox, colors[1], [-1.48, 0.95, -0.4], [0.12, 0.3, -0.25], [1.15, 1.2, 1]);
    const drinkPack = add(smallBox, colors[2], [1.55, -0.85, -0.2], [0.1, -0.5, 0.18], [1.05, 1.15, 1]);
    const sweetPack = add(smallBox, colors[4], [1.45, 1.05, -1], [0.2, 0.55, 0.3], [0.8, 0.85, 0.9]);
    const candy = add(sphere, colors[1], [-1.5, -1.15, 0.2], [0, 0, 0], [0.72, 0.72, 0.72]);
    const ring = add(torus, colors[6], [0.1, 1.55, -0.5], [0.5, 0.25, 0.3], [0.9, 0.9, 0.9]);

    // Subtle floating spheres give the scene depth without heavy particles.
    const orbiters = [];
    for (let i = 0; i < 15; i++) {
      const orb = new THREE.Mesh(sphere, colors[i % colors.length]);
      const angle = (i / 15) * Math.PI * 2;
      const radius = 2.25 + (i % 3) * 0.2;
      orb.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.72, -0.8 + (i % 4) * 0.2);
      const size = 0.07 + (i % 3) * 0.025;
      orb.scale.setScalar(size);
      group.add(orb);
      orbiters.push({ orb, angle, radius });
    }

    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(1.65, 1.8, 0.12, 48),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, transparent: true, opacity: 0.78 })
    );
    platform.position.set(0, -1.72, -0.15);
    platform.scale.set(1.12, 1, 0.62);
    group.add(platform);

    const clock = new THREE.Clock();

    const resize = () => {
      if (disposed) return;
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      camera.aspect = width / height;
      camera.position.z = width < 480 ? 10 : 8.6;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    };

    const onPointerMove = (event) => {
      const rect = host.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };
    const onPointerLeave = () => { pointer.x = 0; pointer.y = 0; };

    const animate = () => {
      if (disposed) return;
      frame = requestAnimationFrame(animate);
      if (isReduced) {
        renderer.render(scene, camera);
        return;
      }
      const t = clock.getElapsedTime();
      smooth.x += (pointer.x - smooth.x) * 0.035;
      smooth.y += (pointer.y - smooth.y) * 0.035;
      camera.position.x += (smooth.x * 0.48 - camera.position.x) * 0.025;
      camera.position.y += (-smooth.y * 0.32 - camera.position.y) * 0.025;
      camera.lookAt(0, 0, 0);
      group.rotation.y = Math.sin(t * 0.22) * 0.08 + smooth.x * 0.07;
      group.rotation.x = Math.cos(t * 0.19) * 0.035 - smooth.y * 0.03;
      heroPack.position.y = -0.02 + Math.sin(t * 0.75) * 0.06;
      biscuitPack.position.y = 0.95 + Math.sin(t * 1.1 + 1.2) * 0.07;
      drinkPack.position.y = -0.85 + Math.sin(t * 0.9 + 2.3) * 0.07;
      sweetPack.position.y = 1.05 + Math.sin(t * 0.85 + 0.8) * 0.06;
      candy.rotation.y = t * 0.24;
      ring.rotation.z = 0.3 + Math.sin(t * 0.4) * 0.15;
      orbiters.forEach(({ orb, angle, radius }, i) => {
        const a = angle + t * (0.045 + (i % 3) * 0.015);
        orb.position.x = Math.cos(a) * radius;
        orb.position.y = Math.sin(a) * radius * 0.72 + Math.sin(t + i) * 0.05;
      });
      renderer.render(scene, camera);
    };

    const motionHandler = (event) => {
      isReduced = event.detail;
      if (isReduced) {
        cancelAnimationFrame(frame);
        renderer.render(scene, camera);
      } else {
        clock.start();
        animate();
      }
    };

    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("padmavathi-motion-change", motionHandler);

    resize();
    if (!isReduced) animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", resize);
      window.removeEventListener("padmavathi-motion-change", motionHandler);
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          (Array.isArray(object.material) ? object.material : [object.material]).forEach((m) => m.dispose());
        }
      });
    };
  }, [reducedMotion]);

  return <div className="three-hero" ref={hostRef} role="img" aria-label="Animated 3D display of colourful wholesale product packages" />;
}