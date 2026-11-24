import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, RotateCw, Eye } from 'lucide-react';

const COLOR_THEMES = [
  { name: 'Champagne & Gold', box: 0xFAF7F2, ribbon: 0xC5A059, lid: 0xF5EFEB },
  { name: 'Royal Burgundy', box: 0x581825, ribbon: 0xD4AF37, lid: 0x48121D },
  { name: 'Emerald Velvet', box: 0x1B3B2B, ribbon: 0xE6CA65, lid: 0x142B20 },
  { name: 'Blush Rose', box: 0xF4DCD6, ribbon: 0xA75D59, lid: 0xECD0C9 },
];

export default function GiftBox3D() {
  const mountRef = useRef(null);
  const [activeTheme, setActiveTheme] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLidOpen, setIsLidOpen] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  // References to 3D objects for updates
  const sceneRef = useRef(null);
  const boxMeshRef = useRef(null);
  const lidGroupRef = useRef(null);
  const ribbonMeshRef = useRef(null);
  const lidRibbonRef = useRef(null);
  const bowRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch (e) {
      setWebGLSupported(false);
      return;
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 420;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 2.4, 5.2);
    camera.lookAt(0, 0.2, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff3db, 2.2);
    mainLight.position.set(4, 7, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0xe8d2a6, 1.5);
    rimLight.position.set(-4, -2, -4);
    scene.add(rimLight);

    const softFill = new THREE.PointLight(0xffeedd, 1.0, 10);
    softFill.position.set(0, -2, 3);
    scene.add(softFill);

    // Main Gift Box Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Shadow Floor
    const shadowGeo = new THREE.PlaneGeometry(5, 5);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.18 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.0;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Materials
    const currentTheme = COLOR_THEMES[activeTheme];
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: currentTheme.box,
      roughness: 0.35,
      metalness: 0.08,
    });

    const lidMaterial = new THREE.MeshStandardMaterial({
      color: currentTheme.lid,
      roughness: 0.32,
      metalness: 0.1,
    });

    const ribbonMaterial = new THREE.MeshStandardMaterial({
      color: currentTheme.ribbon,
      roughness: 0.25,
      metalness: 0.65,
    });

    // Box Base Geometry
    const boxSize = { w: 2.1, h: 1.5, d: 2.1 };
    const boxGeo = new THREE.BoxGeometry(boxSize.w, boxSize.h, boxSize.d);
    const boxMesh = new THREE.Mesh(boxGeo, boxMaterial);
    boxMesh.castShadow = true;
    boxMesh.receiveShadow = true;
    boxMesh.position.y = 0;
    rootGroup.add(boxMesh);
    boxMeshRef.current = boxMesh;

    // Body Ribbons (Vertical & Horizontal crosses)
    const ribbonW = 0.35;
    const ribbonThick = 0.015;
    
    // Ribbon wrap 1 (Z axis)
    const r1Geo = new THREE.BoxGeometry(ribbonW, boxSize.h + 0.01, boxSize.d + 0.02);
    const r1Mesh = new THREE.Mesh(r1Geo, ribbonMaterial);
    r1Mesh.castShadow = true;
    boxMesh.add(r1Mesh);

    // Ribbon wrap 2 (X axis)
    const r2Geo = new THREE.BoxGeometry(boxSize.w + 0.02, boxSize.h + 0.01, ribbonW);
    const r2Mesh = new THREE.Mesh(r2Geo, ribbonMaterial);
    r2Mesh.castShadow = true;
    boxMesh.add(r2Mesh);
    ribbonMeshRef.current = [r1Mesh, r2Mesh];

    // Box Lid (Grouped so it can hinge or open)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, boxSize.h / 2 + 0.12, 0);
    rootGroup.add(lidGroup);
    lidGroupRef.current = lidGroup;

    const lidGeo = new THREE.BoxGeometry(boxSize.w + 0.15, 0.28, boxSize.d + 0.15);
    const lidMesh = new THREE.Mesh(lidGeo, lidMaterial);
    lidMesh.castShadow = true;
    lidMesh.receiveShadow = true;
    lidGroup.add(lidMesh);

    // Lid Ribbon Cross
    const lidR1Geo = new THREE.BoxGeometry(ribbonW, 0.29, boxSize.d + 0.17);
    const lidR1Mesh = new THREE.Mesh(lidR1Geo, ribbonMaterial);
    lidGroup.add(lidR1Mesh);

    const lidR2Geo = new THREE.BoxGeometry(boxSize.w + 0.17, 0.29, ribbonW);
    const lidR2Mesh = new THREE.Mesh(lidR2Geo, ribbonMaterial);
    lidGroup.add(lidR2Mesh);
    lidRibbonRef.current = [lidR1Mesh, lidR2Mesh];

    // Bow Knot and Loops
    const bowGroup = new THREE.Group();
    bowGroup.position.set(0, 0.18, 0);
    lidGroup.add(bowGroup);
    bowRef.current = bowGroup;

    // Central knot
    const knotGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const knotMesh = new THREE.Mesh(knotGeo, ribbonMaterial);
    knotMesh.castShadow = true;
    bowGroup.add(knotMesh);

    // 4 Bow loops using Torus
    const loopGeo = new THREE.TorusGeometry(0.3, 0.11, 12, 24, Math.PI * 1.5);
    for (let i = 0; i < 4; i++) {
      const loop = new THREE.Mesh(loopGeo, ribbonMaterial);
      loop.rotation.z = (Math.PI / 2) * i + Math.PI / 4;
      loop.rotation.x = Math.PI / 4;
      loop.scale.set(1.1, 0.8, 1);
      loop.castShadow = true;
      bowGroup.add(loop);
    }

    // Ribbon tails
    const tailGeo = new THREE.PlaneGeometry(0.32, 0.8);
    const tailMat = ribbonMaterial.clone();
    tailMat.side = THREE.DoubleSide;
    const tail1 = new THREE.Mesh(tailGeo, tailMat);
    tail1.position.set(0.3, -0.3, 0.4);
    tail1.rotation.set(0.6, 0.3, -0.4);
    bowGroup.add(tail1);

    const tail2 = new THREE.Mesh(tailGeo, tailMat);
    tail2.position.set(-0.3, -0.3, 0.4);
    tail2.rotation.set(0.6, -0.3, 0.4);
    bowGroup.add(tail2);

    // Golden Floating Sparkle Particles
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4.5;
      positions[i * 3 + 1] = Math.random() * 3.5 - 1.0;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4.5;
      scales[i] = Math.random() * 0.08 + 0.03;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xEAD79B,
      size: 0.1,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // Interaction variables
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0.5;
    let targetRotationX = 0.2;
    let clock = new THREE.Clock();

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!isDragging) {
        // subtle mouse follow
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        targetRotationY = 0.5 + x * 0.45;
        targetRotationX = 0.2 - y * 0.25;
        return;
      }
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      targetRotationX = Math.max(-0.4, Math.min(0.6, targetRotationX));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      targetRotationY += deltaX * 0.01;
      targetRotationX += deltaY * 0.01;
      targetRotationX = Math.max(-0.4, Math.min(0.6, targetRotationX));
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth damped rotation
      rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.08;
      rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.08;

      // Floating oscillation
      rootGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;

      // Lid Open / Close animation
      if (lidGroupRef.current) {
        const targetLidY = isLidOpen ? 1.6 : boxSize.h / 2 + 0.12;
        const targetLidRotZ = isLidOpen ? 0.35 : 0;
        lidGroupRef.current.position.y += (targetLidY - lidGroupRef.current.position.y) * 0.1;
        lidGroupRef.current.rotation.z += (targetLidRotZ - lidGroupRef.current.rotation.z) * 0.1;
      }

      // Sparkles slow spin
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.15;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isLidOpen]);

  // Update Theme Colors dynamically
  useEffect(() => {
    const theme = COLOR_THEMES[activeTheme];
    if (boxMeshRef.current && theme) {
      boxMeshRef.current.material.color.setHex(theme.box);
      if (lidGroupRef.current && lidGroupRef.current.children[0]) {
        lidGroupRef.current.children[0].material.color.setHex(theme.lid);
      }
      if (ribbonMeshRef.current) {
        ribbonMeshRef.current.forEach(m => m.material.color.setHex(theme.ribbon));
      }
      if (lidRibbonRef.current) {
        lidRibbonRef.current.forEach(m => m.material.color.setHex(theme.ribbon));
      }
      if (bowRef.current) {
        bowRef.current.children.forEach(c => {
          if (c.material) c.material.color.setHex(theme.ribbon);
        });
      }
    }
  }, [activeTheme]);

  return (
    <div className="relative w-full h-[400px] sm:h-[450px] lg:h-[500px] flex items-center justify-center select-none">
      {webGLSupported ? (
        <>
          {/* 3D WebGL Canvas */}
          <div
            ref={mountRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            title="Click and drag to rotate the luxury gift box in 3D"
          />

          {/* Interactive Floating Controls */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 rounded-full bg-cream-50/90 backdrop-blur-md shadow-soft border border-gold/30 z-10">
            {COLOR_THEMES.map((theme, idx) => (
              <button
                key={theme.name}
                onClick={() => setActiveTheme(idx)}
                className={`w-6 h-6 rounded-full transition-all duration-300 relative border ${
                  activeTheme === idx ? 'scale-110 ring-2 ring-gold' : 'hover:scale-105 opacity-80'
                }`}
                style={{
                  backgroundColor: `#${theme.box.toString(16).padStart(6, '0')}`,
                  borderColor: `#${theme.ribbon.toString(16).padStart(6, '0')}`
                }}
                title={theme.name}
                aria-label={theme.name}
              >
                {activeTheme === idx && (
                  <span className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-gold" />
                )}
              </button>
            ))}

            <div className="w-[1px] h-4 bg-cream-300 mx-1" />

            {/* Toggle Lid Peek */}
            <button
              onClick={() => setIsLidOpen(!isLidOpen)}
              className="flex items-center gap-1 text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-gold/15 text-chocolate hover:bg-gold hover:text-white transition-colors"
            >
              <Eye className="w-3 h-3 text-gold" />
              <span>{isLidOpen ? 'Close Lid' : 'Peek Inside'}</span>
            </button>
          </div>

          {/* Rotate Hint Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[11px] font-medium text-chocolate/60 bg-cream-50/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gold/20 pointer-events-none">
            <RotateCw className="w-3 h-3 text-gold animate-spin" style={{ animationDuration: '6s' }} />
            <span>Interactive 3D • Drag to Rotate</span>
          </div>
        </>
      ) : (
        /* Fallback CSS 3D Box */
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="relative w-48 h-48 bg-gradient-to-tr from-cream-200 via-cream-50 to-champagne rounded-2xl shadow-luxury border-2 border-gold/40 flex items-center justify-center animate-float">
            <div className="absolute inset-x-0 h-8 bg-gold/80 shadow-md top-1/2 -translate-y-1/2" />
            <div className="absolute inset-y-0 w-8 bg-gold/80 shadow-md left-1/2 -translate-x-1/2" />
            <div className="w-14 h-14 rounded-full bg-gold shadow-gold-glow flex items-center justify-center text-white z-10">
              <Sparkles className="w-7 h-7" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

