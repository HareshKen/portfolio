"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function StarBackground() {
  const canvasRef = useRef(null);
  const { theme, resolvedTheme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let stars = [];
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 200 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.8 + 0.2,
        opacity: Math.random() * 0.8 + 0.2,
      }));
    };

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set star color based on theme
      const isDark = resolvedTheme === 'dark' || (!resolvedTheme && theme === 'dark');
      const starColor = isDark ? 'rgba(255, 255, 255, ' : 'rgba(0, 0, 0, ';
      
      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = starColor + star.opacity + ')';
        ctx.fill();
        
        // Add subtle mouse interaction
        const dx = mouseX - star.x;
        const dy = mouseY - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          star.x += dx * force * 0.01;
          star.y += dy * force * 0.01;
        }
      });

      // Animate stars
      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > canvas.height + 10) {
          star.y = -10;
          star.x = Math.random() * canvas.width;
        }
        
        // Slight horizontal drift
        star.x += Math.sin(Date.now() * 0.001 + star.y * 0.01) * 0.1;
        
        // Keep stars within bounds
        if (star.x < -10) star.x = canvas.width + 10;
        if (star.x > canvas.width + 10) star.x = -10;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Initialize
    resize();
    draw();

    // Event listeners
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [theme, resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full bg-transparent transition-opacity duration-500"
      style={{ pointerEvents: 'none' }}
    />
  );
}