import React, { useEffect, useRef } from 'react';

export default function StarsCanvas({ darkMode }) {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const starsRef = useRef([]);
  const pulsesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const numStars = width < 768 ? 80 : 180;

    const createStars = () => {
      starsRef.current = [];
      for (let i = 0; i < numStars; i++) {
        starsRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * (darkMode ? 1.8 : 3.5) + 0.4,
          alpha: Math.random() * 0.5 + 0.5,
          delta: Math.random() * 0.02 + 0.005,
          dx: (Math.random() - 0.5) * 0.35,
          dy: (Math.random() - 0.5) * 0.35,
          boost: 0,
        });
      }
    };

    createStars();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Pulsing circles
      pulsesRef.current.forEach((pulse, i) => {
        pulse.radius += 3;
        pulse.alpha -= 0.015;

        if (pulse.alpha > 0) {
          ctx.beginPath();
          ctx.arc(pulse.x, pulse.y, pulse.radius, 0, 2 * Math.PI);
          ctx.strokeStyle = `rgba(${pulse.color}, ${pulse.alpha})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          pulsesRef.current.splice(i, 1);
        }
      });

      // Stars
      for (let star of starsRef.current) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        const boostFactor = 1 + star.boost * 2;
        ctx.fillStyle = darkMode
          ? `rgba(255, 255, 255, ${Math.min(star.alpha * boostFactor, 1)})`
          : `rgba(102, 191, 255, ${Math.min(star.alpha * boostFactor, 1)})`;
        ctx.fill();

        star.x += star.dx * (1 + star.boost);
        star.y += star.dy * (1 + star.boost);

        star.alpha += star.delta;
        if (star.alpha <= 0.3 || star.alpha >= 1) star.delta = -star.delta;
        star.boost *= 0.92;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createStars();
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      // Zvezdice koje reaguju
      for (let star of starsRef.current) {
        const dx = star.x - cx;
        const dy = star.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const angle = Math.atan2(dy, dx);
          star.dx += Math.cos(angle) * 0.8;
          star.dy += Math.sin(angle) * 0.8;
          star.boost = 1;
        }
      }

      // Dodaj pulse krug
      pulsesRef.current.push({
        x: cx,
        y: cy,
        radius: 0,
        alpha: 0.4,
        color: darkMode ? '239, 68, 68' : '59, 130, 246', // red-500 / blue-500
      });
    };

    const handleTouch = (e) => {
      const touch = e.touches[0];
      handleClick({ clientX: touch.clientX, clientY: touch.clientY });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouch);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
