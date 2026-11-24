import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function InteractiveGiftBox3D({ className = '' }) {
  const mountRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 360;
    const height = mount.clientHeight || 360;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera (Tuned for prominent, elegant luxury scale)
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0.75, 5.9);
    camera.lookAt(0, 0, 0);

    // 3. Renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.margin = '0 auto';
    mount.appendChild(renderer.domElement);

    // 4. Procedural Polka Dot Texture for Official Brand Logo Box (#FB1443)
    const createPolkaDotTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      // Base: Official Logo Crimson Rose (#FB1443)
      ctx.fillStyle = '#FB1443';
      ctx.fillRect(0, 0, 512, 512);

      // Crisp White Polka Dots
      ctx.fillStyle = '#FFFFFF';
      const dotRadius = 14;
      const spacing = 64;

      for (let y = 0; y < 512 + spacing; y += spacing) {
        for (let x = 0; x < 512 + spacing; x += spacing) {
          const offsetX = (y / spacing) % 2 === 0 ? 0 : spacing / 2;
          ctx.beginPath();
          ctx.arc(x + offsetX, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1.5, 1.5);
      return texture;
    };

    const polkaTexture = createPolkaDotTexture();

    // 5. Materials
    const boxMaterial = new THREE.MeshPhysicalMaterial({
      map: polkaTexture,
      roughness: 0.28,
      metalness: 0.06,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
    });

    const satinRibbonMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff, // Pure Pearlescent Silk White Ribbon
      roughness: 0.14,
      metalness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const innerGoldMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0xffaa00,
      emissiveIntensity: 0.6,
    });

    // 6. Build the Gift Box Hierarchy
    const mainGroup = new THREE.Group();
    // Default diamond-turned 45 degree tilt matching Chely
    mainGroup.rotation.y = Math.PI / 4;
    mainGroup.rotation.x = 0.2;
    scene.add(mainGroup);

    // Box Base
    const boxWidth = 1.9;
    const boxHeight = 1.6;
    const boxDepth = 1.9;

    const baseGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const boxBase = new THREE.Mesh(baseGeometry, boxMaterial);
    boxBase.castShadow = true;
    boxBase.receiveShadow = true;
    mainGroup.add(boxBase);

    // Base Ribbons (X and Z wraps)
    const ribbonWidth = 0.42;
    const ribbonXGeom = new THREE.BoxGeometry(ribbonWidth, boxHeight + 0.02, boxDepth + 0.02);
    const ribbonX = new THREE.Mesh(ribbonXGeom, satinRibbonMaterial);
    boxBase.add(ribbonX);

    const ribbonZGeom = new THREE.BoxGeometry(boxWidth + 0.02, boxHeight + 0.02, ribbonWidth);
    const ribbonZ = new THREE.Mesh(ribbonZGeom, satinRibbonMaterial);
    boxBase.add(ribbonZ);

    // Interior Gold Glow (visible when lid lifts)
    const innerLightMesh = new THREE.Mesh(
      new THREE.BoxGeometry(boxWidth - 0.2, 0.2, boxDepth - 0.2),
      innerGoldMaterial
    );
    innerLightMesh.position.y = boxHeight / 2 - 0.05;
    boxBase.add(innerLightMesh);

    // Lid Group (Animates on hover!)
    const lidGroup = new THREE.Group();
    const defaultLidY = boxHeight / 2 + 0.18;
    lidGroup.position.y = defaultLidY;
    mainGroup.add(lidGroup);

    const lidGeometry = new THREE.BoxGeometry(boxWidth + 0.12, 0.38, boxDepth + 0.12);
    const lidMesh = new THREE.Mesh(lidGeometry, boxMaterial);
    lidMesh.castShadow = true;
    lidGroup.add(lidMesh);

    // Lid Ribbons
    const lidRibbonX = new THREE.Mesh(
      new THREE.BoxGeometry(ribbonWidth, 0.4, boxDepth + 0.14),
      satinRibbonMaterial
    );
    lidGroup.add(lidRibbonX);

    const lidRibbonZ = new THREE.Mesh(
      new THREE.BoxGeometry(boxWidth + 0.14, 0.4, ribbonWidth),
      satinRibbonMaterial
    );
    lidGroup.add(lidRibbonZ);

    // 3D Satin Ribbon Bow on Top of Lid
    const bowGroup = new THREE.Group();
    bowGroup.position.y = 0.24;
    lidGroup.add(bowGroup);

    // Center knot
    const knotGeom = new THREE.SphereGeometry(0.24, 16, 16);
    const knotMesh = new THREE.Mesh(knotGeom, satinRibbonMaterial);
    bowGroup.add(knotMesh);

    // 4 Fluffy Bow Loops
    const createBowLoop = (rotY, rotZ, scaleX = 1) => {
      const loopGroup = new THREE.Group();
      loopGroup.rotation.y = rotY;
      loopGroup.rotation.z = rotZ;

      const torusGeom = new THREE.TorusGeometry(0.38, 0.09, 14, 28, Math.PI * 1.55);
      const loopMesh = new THREE.Mesh(torusGeom, satinRibbonMaterial);
      loopMesh.scale.set(scaleX, 1, 0.85);
      loopMesh.position.set(0.28, 0.12, 0);
      loopMesh.rotation.x = Math.PI / 2;
      loopGroup.add(loopMesh);
      return loopGroup;
    };

    bowGroup.add(createBowLoop(0.4, 0.35));
    bowGroup.add(createBowLoop(-0.4, -0.35));
    bowGroup.add(createBowLoop(Math.PI - 0.4, -0.35));
    bowGroup.add(createBowLoop(-Math.PI + 0.4, 0.35));

    // 2 Flowing Ribbon Tails cascading off front
    const tailGeom = new THREE.CylinderGeometry(0.08, 0.16, 0.9, 12);
    const tail1 = new THREE.Mesh(tailGeom, satinRibbonMaterial);
    tail1.position.set(0.35, -0.22, 0.5);
    tail1.rotation.z = -0.55;
    tail1.rotation.x = 0.4;
    bowGroup.add(tail1);

    const tail2 = new THREE.Mesh(tailGeom, satinRibbonMaterial);
    tail2.position.set(-0.35, -0.22, 0.5);
    tail2.rotation.z = 0.55;
    tail2.rotation.x = 0.4;
    bowGroup.add(tail2);

    // Soft Contact Shadow Plane underneath
    const createShadowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(64, 64, 10, 64, 64, 60);
      gradient.addColorStop(0, 'rgba(180, 20, 50, 0.45)');
      gradient.addColorStop(0.5, 'rgba(120, 10, 30, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(canvas);
    };

    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(3.6, 3.6),
      new THREE.MeshBasicMaterial({
        map: createShadowTexture(),
        transparent: true,
        depthWrite: false,
      })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.02;
    mainGroup.add(shadowPlane);

    // 7. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.2);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8d0f5, 1.4);
    fillLight.position.set(-5, 3, -2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffa6b6, 2.5, 10);
    rimLight.position.set(0, -1, 3);
    scene.add(rimLight);

    // 8. Mouse & Hover Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0.2;
    let targetRotationY = Math.PI / 4;
    let hoveredState = false;
    let targetLidY = defaultLidY;

    const handleMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Normalized coordinates (-1 to 1)
      const nx = (clientX / rect.width) * 2 - 1;
      const ny = (clientY / rect.height) * 2 - 1;

      mouseX = nx;
      mouseY = ny;

      // Mouse tilts the box in 3D
      targetRotationY = Math.PI / 4 + nx * 0.75;
      targetRotationX = 0.2 + ny * 0.4;
      setHasInteracted(true);
    };

    const handleMouseEnter = () => {
      hoveredState = true;
      setIsHovered(true);
      targetLidY = defaultLidY + 0.28; // Lid lifts slightly on hover!
    };

    const handleMouseLeave = () => {
      hoveredState = false;
      setIsHovered(false);
      targetRotationY = Math.PI / 4;
      targetRotationX = 0.2;
      targetLidY = defaultLidY;
    };

    mount.addEventListener('mousemove', handleMouseMove);
    mount.addEventListener('mouseenter', handleMouseEnter);
    mount.addEventListener('mouseleave', handleMouseLeave);

    // 9. Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp mouse rotation
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.08;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.08;

      // Gentle floating bobbing
      const floatOffset = Math.sin(elapsedTime * 2.2) * 0.07;
      mainGroup.position.y = floatOffset + (hoveredState ? 0.12 : 0);

      // Lid lift animation on hover
      lidGroup.position.y += (targetLidY - lidGroup.position.y) * 0.12;

      // Gentle knot pulse
      if (hoveredState) {
        bowGroup.rotation.y = Math.sin(elapsedTime * 4) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Responsive Resize
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mount.removeEventListener('mousemove', handleMouseMove);
      mount.removeEventListener('mouseenter', handleMouseEnter);
      mount.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      polkaTexture.dispose();
      boxMaterial.dispose();
      satinRibbonMaterial.dispose();
      innerGoldMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
    />
  );
}
