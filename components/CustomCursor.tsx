'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mx = 0, my = 0, cx = 0, cy = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = `${mx}px`; dot.style.top = `${my}px`;
    };

    const animate = () => {
      cx += (mx - cx) * 0.1; cy += (my - cy) * 0.1;
      cursor.style.left = `${cx}px`; cursor.style.top = `${cy}px`;
      requestAnimationFrame(animate);
    };

    const onEnter = () => cursor.classList.add('hover');
    const onLeave = () => cursor.classList.remove('hover');

    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    animate();
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
