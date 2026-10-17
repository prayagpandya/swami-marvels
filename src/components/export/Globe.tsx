"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useMotionSettings } from '../../hooks/useMotionSettings';

interface Route {
  from: [number, number];
  to: [number, number];
}

/** Origin is India; destinations are illustrative trade lanes, not claimed markets. */
const ORIGIN: [number, number] = [22.5, 72.5];

const ROUTES: Route[] = [
  { from: ORIGIN, to: [25.2, 55.3] },
  { from: ORIGIN, to: [51.5, -0.12] },
  { from: ORIGIN, to: [1.35, 103.8] },
  { from: ORIGIN, to: [-1.29, 36.8] },
  { from: ORIGIN, to: [40.7, -74.0] },
  { from: ORIGIN, to: [-33.86, 151.20] }, // Sydney, Australia
  { from: ORIGIN, to: [-23.55, -46.63] }, // São Paulo, South America
  { from: ORIGIN, to: [-33.92, 18.42] },  // Cape Town, South Africa
  { from: ORIGIN, to: [35.67, 139.65] },   // Tokyo, Japan
  { from: ORIGIN, to: [50.11, 8.68] },     // Frankfurt, Europe
  { from: ORIGIN, to: [24.71, 46.67] },    // Riyadh, Middle East
  { from: ORIGIN, to: [13.75, 100.50] }    // Bangkok, Southeast Asia
];


const toVector = (lat: number, lon: number, radius = 1) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

/**
 * A restrained three.js globe: a dotted sphere with animated trade arcs.
 * It only runs while visible, and holds still for reduced-motion users.
 */
export function Globe({ className = '' }: {className?: string;}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionSettings();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.35, 3.70);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    container.appendChild(renderer.domElement);

    const world = new THREE.Group();
    world.rotation.z = THREE.MathUtils.degToRad(-14);
    scene.add(world);

    // Dotted sphere
    const positions: number[] = [];
    for (let lat = -80; lat <= 80; lat += 4) {
      const circumference = Math.cos(THREE.MathUtils.degToRad(lat));
      const count = Math.max(6, Math.round(circumference * 90));
      for (let i = 0; i < count; i++) {
        const lon = -180 + 360 / count * i;
        const v = toVector(lat, lon, 1);
        positions.push(v.x, v.y, v.z);
      }
    }
    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const dotMaterial = new THREE.PointsMaterial({
      color: 0xe6dccb,
      size: 0.013,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true
    });
    const dots = new THREE.Points(dotGeometry, dotMaterial);
    world.add(dots);

    // Soft inner sphere so the far side reads as solid
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.985, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0x1c1a17 })
    );
    world.add(core);

    // Trade arcs
    const arcs = ROUTES.map((route, index) => {
      const start = toVector(route.from[0], route.from[1]);
      const end = toVector(route.to[0], route.to[1]);
      const distance = start.distanceTo(end);
      const mid = start.clone().add(end).normalize().multiplyScalar(1 + distance * 0.32);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(96);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      geometry.setDrawRange(0, points.length);
      const line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({ color: 0xa45f35, transparent: true, opacity: 0.35 })
      );
      world.add(line);

      const pulseA = new THREE.Mesh(
        new THREE.SphereGeometry(0.016, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xa45f35 })
      );
      world.add(pulseA);

      const pulseB = new THREE.Mesh(
        new THREE.SphereGeometry(0.016, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xa45f35 })
      );
      world.add(pulseB);

      return { curve, geometry, line, pulseA, pulseB, offset: index * 0.19, total: points.length };
    });

    // Origin marker
    const originMarker = new THREE.Mesh(
      new THREE.SphereGeometry(0.022, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xa45f35 })
    );
    originMarker.position.copy(toVector(ORIGIN[0], ORIGIN[1], 1.005));
    world.add(originMarker);

    // Interactive grab and drag rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationY = 0;
    let rotationX = 0;
    const autoRotateSpeed = 0.13;
    let lastTime = performance.now();

    container.style.cursor = 'grab';

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
      container.style.cursor = 'grabbing';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      rotationY += deltaX * 0.005;
      rotationX += deltaY * 0.005;

      // Clamp X rotation to prevent flipping upside down (-60 to 60 degrees)
      rotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotationX));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
      container.style.cursor = 'grab';
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        container.style.cursor = 'grabbing';
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      rotationY += deltaX * 0.006;
      rotationX += deltaY * 0.006;
      rotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotationX));

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
      container.style.cursor = 'grab';
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      if (!clientWidth || !clientHeight) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight, false);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let visible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    let frame = 0;
    const startTime = performance.now();

    const renderFrame = () => {
      const now = performance.now();
      const deltaTime = (now - lastTime) / 1000;
      lastTime = now;

      const elapsed = (now - startTime) / 1000;

      if (!reduced) {
        if (!isDragging) {
          rotationY += deltaTime * autoRotateSpeed;
        }
        world.rotation.y = rotationY;
        world.rotation.x = rotationX;
      } else {
        world.rotation.y = 0.6;
        world.rotation.x = 0;
      }

      arcs.forEach((arc) => {
        const t = reduced ? 1 : (elapsed * 0.16 + arc.offset) % 1.0;
        
        // Pulse A
        const pointAtA = arc.curve.getPointAt(Math.min(0.999, t));
        arc.pulseA.position.copy(pointAtA);
        
        // Pulse B (offset by 0.5)
        const tB = (t + 0.5) % 1.0;
        const pointAtB = arc.curve.getPointAt(Math.min(0.999, tB));
        arc.pulseB.position.copy(pointAtB);
      });

      renderer.render(scene, camera);
    };

    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (visible) renderFrame();
    };
    loop();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      arcs.forEach((arc) => {
        arc.geometry.dispose();
        (arc.line.material as THREE.Material).dispose();
        arc.pulseA.geometry.dispose();
        (arc.pulseA.material as THREE.Material).dispose();
        arc.pulseB.geometry.dispose();
        (arc.pulseB.material as THREE.Material).dispose();
      });
      dotGeometry.dispose();
      dotMaterial.dispose();
      core.geometry.dispose();
      (core.material as THREE.Material).dispose();
      originMarker.geometry.dispose();
      (originMarker.material as THREE.Material).dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [reduced]);

  return <div ref={containerRef} className={className} role="presentation" />;
}