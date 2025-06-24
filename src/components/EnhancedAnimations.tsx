import { useEffect, useRef } from "react";

const EnhancedAnimations = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Floating geometric shapes animation
    const createFloatingShapes = () => {
      const shapes = [];
      const shapeCount = 8;

      for (let i = 0; i < shapeCount; i++) {
        const shape = document.createElement("div");
        shape.className = "floating-shape";

        // Random shape type
        const shapeTypes = ["circle", "square", "triangle"];
        const shapeType =
          shapeTypes[Math.floor(Math.random() * shapeTypes.length)];

        // Base styles
        const size = Math.random() * 20 + 10;
        shape.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: linear-gradient(45deg, rgba(240, 186, 85, 0.1), rgba(213, 175, 83, 0.3));
          border: 1px solid rgba(240, 186, 85, 0.2);
          backdrop-filter: blur(5px);
          pointer-events: none;
          z-index: 1;
          animation: float-${i} ${15 + Math.random() * 10}s infinite linear;
        `;

        // Shape-specific styles
        if (shapeType === "circle") {
          shape.style.borderRadius = "50%";
        } else if (shapeType === "triangle") {
          shape.style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
        }

        // Random position
        shape.style.left = Math.random() * 100 + "%";
        shape.style.top = Math.random() * 100 + "%";

        container.appendChild(shape);
        shapes.push(shape);

        // Add keyframe animation
        const keyframes = `
          @keyframes float-${i} {
            0% {
              transform: translateY(0px) translateX(0px) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
              opacity: 0;
            }
          }
        `;

        // Inject keyframes
        const style = document.createElement("style");
        style.textContent = keyframes;
        document.head.appendChild(style);
      }

      return shapes;
    };

    const shapes = createFloatingShapes();

    // Cleanup function
    return () => {
      shapes.forEach((shape) => shape.remove());
    };
  }, []);

  useEffect(() => {
    // Add glowing orbs that follow mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const orb = document.createElement("div");
      orb.className = "mouse-orb";
      orb.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, rgba(240, 186, 85, 0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        left: ${e.clientX - 2}px;
        top: ${e.clientY - 2}px;
        animation: orbFade 2s ease-out forwards;
      `;

      document.body.appendChild(orb);

      // Remove orb after animation
      setTimeout(() => orb.remove(), 2000);
    };

    // Add CSS for orb animation
    const orbStyle = document.createElement("style");
    orbStyle.textContent = `
      @keyframes orbFade {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        100% {
          transform: scale(20);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(orbStyle);

    // Throttle mouse events for performance
    let timeout: NodeJS.Timeout;
    const throttledMouseMove = (e: MouseEvent) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => handleMouseMove(e), 100);
    };

    document.addEventListener("mousemove", throttledMouseMove);

    return () => {
      document.removeEventListener("mousemove", throttledMouseMove);
      orbStyle.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(240, 186, 85, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(213, 175, 83, 0.05) 0%, transparent 50%)
        `,
      }}
    />
  );
};

export default EnhancedAnimations;
