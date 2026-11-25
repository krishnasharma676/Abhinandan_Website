import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';

const BOX_THEMES = {
  'crimson-polka': {
    bg: '#FB1443',
    dot: '#FFFFFF',
    polka: true,
    ribbon: 0xffffff,
    rim: 0xffa6b6,
  },
  'ivory-gold': {
    bg: '#FAF7F2',
    dot: '#D4AF37',
    polka: true,
    ribbon: 0xd4af37,
    rim: 0xffe885,
  },
  'blush-rose': {
    bg: '#F8D4CD',
    dot: '#FB1443',
    polka: false,
    ribbon: 0xfb1443,
    rim: 0xfb1443,
  },
};

function createBoxTexture(theme) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, 512, 512);

  if (theme.polka) {
    ctx.fillStyle = theme.dot;
    const dotRadius = 13;
    const spacing = 64;
    for (let y = 0; y < 512 + spacing; y += spacing) {
      for (let x = 0; x < 512 + spacing; x += spacing) {
        const offsetX = (y / spacing) % 2 === 0 ? 0 : spacing / 2;
        ctx.beginPath();
        ctx.arc(x + offsetX, y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else {
    // Diagonal subtle silk weave sheen
    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 4;
    for (let i = -512; i < 1024; i += 28) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 512, 512);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.5, 1.5);
  return texture;
}

export default function InteractiveGiftBox3D({
  className = '',
  themeKey = 'crimson-polka',
  isUnboxed = false,
  isActive = true,
  onToggleUnbox,
}) {
  const mountRef = useRef(null);
  const stateRef = useRef({ isUnboxed, themeKey, isActive });
  const materialsRef = useRef(null);

  useEffect(() => {
    stateRef.current.isUnboxed = isUnboxed;
  }, [isUnboxed]);

  useEffect(() => {
    stateRef.current.isActive = isActive;
  }, [isActive]);

  // Dynamically update 3D WebGL textures/materials when theme pill changes
  useEffect(() => {
    stateRef.current.themeKey = themeKey;
    const mats = materialsRef.current;
    if (!mats) return;

    const theme = BOX_THEMES[themeKey] || BOX_THEMES['crimson-polka'];
    const newTex = createBoxTexture(theme);
    if (mats.boxMaterial.map) mats.boxMaterial.map.dispose();
    mats.boxMaterial.map = newTex;
    mats.boxMaterial.needsUpdate = true;

    mats.satinRibbonMaterial.color.setHex(theme.ribbon);
    mats.satinRibbonMaterial.needsUpdate = true;

    mats.rimLight.color.setHex(theme.rim);
  }, [themeKey]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 360;
    const height = mount.clientHeight || 360;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0.9, 6.2);
    camera.lookAt(0, 0.05, 0);

    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isCoarse ? 1.5 : 2));
    renderer.shadowMap.enabled = false;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.margin = '0 auto';
    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    const initialTheme = BOX_THEMES[stateRef.current.themeKey] || BOX_THEMES['crimson-polka'];
    const polkaTexture = createBoxTexture(initialTheme);

    const boxMaterial = new THREE.MeshPhysicalMaterial({
      map: polkaTexture,
      roughness: 0.25,
      metalness: 0.08,
      clearcoat: 0.65,
      clearcoatRoughness: 0.14,
    });

    const satinRibbonMaterial = new THREE.MeshPhysicalMaterial({
      color: initialTheme.ribbon,
      roughness: 0.14,
      metalness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const innerGoldMaterial = new THREE.MeshStandardMaterial({
      color: 0xffdf70,
      roughness: 0.2,
      metalness: 0.85,
      emissive: 0xffaa00,
      emissiveIntensity: 0.75,
    });

    const mainGroup = new THREE.Group();
    mainGroup.rotation.y = Math.PI / 4;
    mainGroup.rotation.x = 0.22;
    scene.add(mainGroup);

    const boxWidth = 1.9;
    const boxHeight = 1.55;
    const boxDepth = 1.9;

    const boxBase = new THREE.Mesh(
      new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth),
      boxMaterial
    );
    boxBase.castShadow = true;
    boxBase.receiveShadow = true;
    mainGroup.add(boxBase);

    const ribbonWidth = 0.42;
    boxBase.add(
      new THREE.Mesh(
        new THREE.BoxGeometry(ribbonWidth, boxHeight + 0.02, boxDepth + 0.02),
        satinRibbonMaterial
      )
    );
    boxBase.add(
      new THREE.Mesh(
        new THREE.BoxGeometry(boxWidth + 0.02, boxHeight + 0.02, ribbonWidth),
        satinRibbonMaterial
      )
    );

    // Inner Glowing Gold Treasure Bed
    const innerLightMesh = new THREE.Mesh(
      new THREE.BoxGeometry(boxWidth - 0.18, 0.22, boxDepth - 0.18),
      innerGoldMaterial
    );
    innerLightMesh.position.y = boxHeight / 2 - 0.04;
    boxBase.add(innerLightMesh);

    // Floating Golden & Ruby Sparkle Gems emerging when unboxed
    const gemGroup = new THREE.Group();
    boxBase.add(gemGroup);
    const gems = [];
    const gemMaterials = [
      new THREE.MeshStandardMaterial({
        color: 0xffe885,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0xffc83d,
        emissiveIntensity: 0.55,
      }),
      new THREE.MeshStandardMaterial({
        color: 0xfb1443,
        metalness: 0.35,
        roughness: 0.18,
        emissive: 0xfb1443,
        emissiveIntensity: 0.3,
      }),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.5,
        roughness: 0.15,
      }),
    ];

    for (let i = 0; i < 18; i++) {
      const geom =
        i % 2 === 0
          ? new THREE.OctahedronGeometry(0.11 + (i % 3) * 0.03, 0)
          : new THREE.IcosahedronGeometry(0.09 + (i % 3) * 0.025, 0);
      const gem = new THREE.Mesh(geom, gemMaterials[i % gemMaterials.length]);
      const angle = (i / 18) * Math.PI * 2;
      const radius = 0.25 + (i % 4) * 0.16;
      gem.userData = {
        angle,
        radius,
        restY: boxHeight / 2 - 0.15,
        peakY: boxHeight / 2 + 0.55 + (i % 4) * 0.22,
        speed: 1.4 + (i % 5) * 0.35,
      };
      gem.position.set(Math.cos(angle) * radius, gem.userData.restY, Math.sin(angle) * radius);
      gem.scale.setScalar(0.01);
      gemGroup.add(gem);
      gems.push(gem);
    }

    // Lid Group
    const lidGroup = new THREE.Group();
    const defaultLidY = boxHeight / 2 + 0.17;
    lidGroup.position.y = defaultLidY;
    mainGroup.add(lidGroup);

    const lidMesh = new THREE.Mesh(
      new THREE.BoxGeometry(boxWidth + 0.12, 0.36, boxDepth + 0.12),
      boxMaterial
    );
    lidMesh.castShadow = true;
    lidGroup.add(lidMesh);

    lidGroup.add(
      new THREE.Mesh(
        new THREE.BoxGeometry(ribbonWidth, 0.38, boxDepth + 0.14),
        satinRibbonMaterial
      )
    );
    lidGroup.add(
      new THREE.Mesh(
        new THREE.BoxGeometry(boxWidth + 0.14, 0.38, ribbonWidth),
        satinRibbonMaterial
      )
    );

    const bowGroup = new THREE.Group();
    bowGroup.position.y = 0.24;
    lidGroup.add(bowGroup);

    bowGroup.add(new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), satinRibbonMaterial));

    const createBowLoop = (rotY, rotZ) => {
      const loopGroup = new THREE.Group();
      loopGroup.rotation.y = rotY;
      loopGroup.rotation.z = rotZ;
      const loopMesh = new THREE.Mesh(
        new THREE.TorusGeometry(0.38, 0.09, 14, 28, Math.PI * 1.55),
        satinRibbonMaterial
      );
      loopMesh.scale.set(1, 1, 0.85);
      loopMesh.position.set(0.28, 0.12, 0);
      loopMesh.rotation.x = Math.PI / 2;
      loopGroup.add(loopMesh);
      return loopGroup;
    };

    bowGroup.add(createBowLoop(0.4, 0.35));
    bowGroup.add(createBowLoop(-0.4, -0.35));
    bowGroup.add(createBowLoop(Math.PI - 0.4, -0.35));
    bowGroup.add(createBowLoop(-Math.PI + 0.4, 0.35));

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

    // Contact shadow plane
    const createShadowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(64, 64, 10, 64, 64, 60);
      gradient.addColorStop(0, 'rgba(200, 20, 60, 0.38)');
      gradient.addColorStop(0.55, 'rgba(140, 20, 40, 0.16)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(canvas);
    };

    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(3.7, 3.7),
      new THREE.MeshBasicMaterial({
        map: createShadowTexture(),
        transparent: true,
        depthWrite: false,
      })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.04;
    mainGroup.add(shadowPlane);

    // Studio Lights
    scene.add(new THREE.AmbientLight(0xffffff, 1.35));
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.3);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffe8e0, 1.3);
    fillLight.position.set(-5, 3, -2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(initialTheme.rim, 2.6, 10);
    rimLight.position.set(0, -1, 3);
    scene.add(rimLight);

    const innerGlowLight = new THREE.PointLight(0xffd24d, 0, 6);
    innerGlowLight.position.set(0, 1.1, 0);
    mainGroup.add(innerGlowLight);

    materialsRef.current = { boxMaterial, satinRibbonMaterial, rimLight };

    // Interaction variables: Drag-to-spin 360 + Scroll choreography + Click/Tap-to-Unbox
    let hoveredState = false;
    let isDragging = false;
    let dragDistance = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let dragYawOffset = 0;
    let dragPitchOffset = 0;
    let pointerTiltX = 0;
    let pointerTiltY = 0;
    let scrollRotationY = 0;
    let scrollLidBoost = 0;

    const triggerConfetti = (clientX, clientY) => {
      const originX = clientX ? clientX / window.innerWidth : 0.5;
      const originY = clientY ? clientY / window.innerHeight : 0.65;
      confetti({
        particleCount: 55,
        spread: 75,
        startVelocity: 32,
        origin: { x: originX, y: originY },
        colors: ['#FB1443', '#FFE885', '#FFA6B6', '#FFFFFF', '#D4AF37'],
        disableForReducedMotion: true,
      });
    };

    const handlePointerDown = (e) => {
      isDragging = true;
      dragDistance = 0;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
    };

    const handlePointerMove = (e) => {
      const rect = mount.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      pointerTiltY = nx * 0.55;
      pointerTiltX = ny * 0.25;

      if (isDragging) {
        const dx = e.clientX - lastPointerX;
        const dy = e.clientY - lastPointerY;
        dragDistance += Math.abs(dx) + Math.abs(dy);
        dragYawOffset += dx * 0.014;
        dragPitchOffset = Math.max(-0.45, Math.min(0.45, dragPitchOffset + dy * 0.008));
        lastPointerX = e.clientX;
        lastPointerY = e.clientY;
      }
    };

    const handlePointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      // Treat crisp tap/click (not drag) as Unbox Toggle!
      if (dragDistance < 8 && onToggleUnbox) {
        const nextOpen = !stateRef.current.isUnboxed;
        onToggleUnbox(nextOpen);
        if (nextOpen) {
          triggerConfetti(e.clientX, e.clientY);
        }
      }
    };

    const handleMouseEnter = () => {
      hoveredState = true;
    };

    const handleMouseLeave = () => {
      hoveredState = false;
      isDragging = false;
      pointerTiltX = 0;
      pointerTiltY = 0;
    };

    const handleScroll = () => {
      const scrollRatio = Math.min(1, window.scrollY / (window.innerHeight * 0.85));
      scrollRotationY = scrollRatio * Math.PI * 1.15;
      scrollLidBoost = Math.sin(scrollRatio * Math.PI) * 0.35;
    };

    mount.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp);
    mount.addEventListener('mouseenter', handleMouseEnter);
    mount.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let animationFrameId = null;
    let isVisible = true;
    const clock = new THREE.Clock();

    const shouldRender = () =>
      isVisible && stateRef.current.isActive && document.visibilityState !== 'hidden';

    const animate = () => {
      if (!shouldRender()) {
        animationFrameId = null;
        return;
      }
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const unboxed = stateRef.current.isUnboxed;

      // Idle gentle continuous spin + drag + mouse tilt + scroll turn
      const idleSpin = isDragging ? 0 : Math.sin(elapsedTime * 0.55) * 0.18;
      const targetRotY = Math.PI / 4 + dragYawOffset + pointerTiltY + scrollRotationY + idleSpin;
      const targetRotX = 0.22 + dragPitchOffset + pointerTiltX + (unboxed ? 0.08 : 0);

      mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.09;
      mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.09;

      // Floating vertical hover
      const floatOffset = Math.sin(elapsedTime * 2.2) * 0.065;
      mainGroup.position.y = floatOffset + (hoveredState || unboxed ? 0.08 : 0);

      // Lid target position & open tilt
      const targetLidY =
        defaultLidY + (unboxed ? 0.92 : hoveredState ? 0.28 : 0) + scrollLidBoost;
      const targetLidRotX = unboxed ? -0.34 : hoveredState ? -0.08 : 0;
      const targetLidZ = unboxed ? -0.32 : 0;

      lidGroup.position.y += (targetLidY - lidGroup.position.y) * 0.11;
      lidGroup.rotation.x += (targetLidRotX - lidGroup.rotation.x) * 0.11;
      lidGroup.position.z += (targetLidZ - lidGroup.position.z) * 0.11;

      // Treasure inner glow + orbiting gems when unboxed or scrolled
      const openFactor = unboxed ? 1 : Math.min(0.65, scrollLidBoost * 1.4);
      innerGlowLight.intensity += (openFactor * 3.8 - innerGlowLight.intensity) * 0.1;

      gems.forEach((gem, idx) => {
        const d = gem.userData;
        const targetScale = unboxed ? 1 : openFactor > 0.2 ? 0.7 : 0.001;
        const nextScale = gem.scale.x + (targetScale - gem.scale.x) * 0.12;
        gem.scale.setScalar(nextScale);

        const orbitAngle = d.angle + elapsedTime * d.speed * 0.45;
        const targetY = unboxed
          ? d.peakY + Math.sin(elapsedTime * d.speed + idx) * 0.18
          : d.restY + openFactor * 0.45;

        gem.position.x = Math.cos(orbitAngle) * (d.radius + (unboxed ? 0.25 : 0));
        gem.position.z = Math.sin(orbitAngle) * (d.radius + (unboxed ? 0.25 : 0));
        gem.position.y += (targetY - gem.position.y) * 0.12;
        gem.rotation.x += 0.025;
        gem.rotation.y += 0.03;
      });

      if (hoveredState || unboxed) {
        bowGroup.rotation.y = Math.sin(elapsedTime * 3.8) * 0.06;
      }

      renderer.render(scene, camera);
    };

    const resumeLoop = () => {
      if (animationFrameId === null && shouldRender()) {
        clock.getDelta();
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) resumeLoop();
      },
      { threshold: 0.01 }
    );
    observer.observe(mount);

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') resumeLoop();
    };
    const handlePointerResume = () => resumeLoop();
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('scroll', handlePointerResume, { passive: true });

    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth || 360;
      const h = mount.clientHeight || 360;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('scroll', handlePointerResume);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      mount.removeEventListener('pointerdown', handlePointerDown);
      mount.removeEventListener('mouseenter', handleMouseEnter);
      mount.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      polkaTexture.dispose();
      boxMaterial.dispose();
      satinRibbonMaterial.dispose();
      innerGoldMaterial.dispose();
      gemMaterials.forEach((m) => m.dispose());
    };
  }, [onToggleUnbox]);

  return (
    <div
      ref={mountRef}
      data-cursor={isUnboxed ? 'CLOSE' : 'UNBOX'}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none touch-pan-y ${className}`}
      title="Tap to open box or drag to spin 360°"
    />
  );
}
