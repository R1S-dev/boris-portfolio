import React, { useEffect, useRef } from 'react';

export default function StarsCanvas({ darkMode }) {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const numStars = window.innerWidth < 768 ? 80 : 180;

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
        });
      }
    };

    createStars();

    const draw = () => {
      ctx.globalAlpha = 0.85;
      ctx.clearRect(0, 0, width, height);
      for (let star of starsRef.current) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = darkMode
          ? `rgba(255, 255, 255, ${star.alpha})`
          : `rgba(102, 191, 255, ${star.alpha * 0.7})`;

        ctx.fill();

        star.alpha += star.delta;
        if (star.alpha <= 0.3 || star.alpha >= 1) star.delta = -star.delta;

        star.x += star.dx;
        star.y += star.dy;

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

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
