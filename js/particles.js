(function () {
  const container = document.getElementById("particles");
  if (!container) return;
  const canvas = container.querySelector("canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const circles = [];

  const settings = {
    quantity: 100,
    staticity: 50,
    ease: 50,
  };

  const canvasSize = { w: 0, h: 0 };
  const mouse = { x: 0, y: 0 };

  function resizeCanvas() {
    circles.length = 0;
    canvasSize.w = container.offsetWidth;
    canvasSize.h = container.offsetHeight;
    canvas.width = Math.floor(canvasSize.w * dpr);
    canvas.height = Math.floor(canvasSize.h * dpr);
    canvas.style.width = `${canvasSize.w}px`;
    canvas.style.height = `${canvasSize.h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawParticles();
  }

  function onMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - canvasSize.w / 2;
    const y = e.clientY - rect.top - canvasSize.h / 2;
    const inside =
      x < canvasSize.w / 2 &&
      x > -canvasSize.w / 2 &&
      y < canvasSize.h / 2 &&
      y > -canvasSize.h / 2;
    if (inside) {
      mouse.x = x;
      mouse.y = y;
    }
  }

  function clear() {
    ctx.clearRect(0, 0, canvasSize.w, canvasSize.h);
  }

  function circleParams() {
    const x = Math.floor(Math.random() * canvasSize.w);
    const y = Math.floor(Math.random() * canvasSize.h);
    return {
      x,
      y,
      translateX: 0,
      translateY: 0,
      size: Math.floor(Math.random() * 2) + 0.1,
      alpha: 0,
      targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      magnetism: 0.1 + Math.random() * 4,
    };
  }

  function drawCircle(circle, update = false) {
    const { x, y, translateX, translateY, size, alpha } = circle;
    ctx.translate(translateX, translateY);
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();
    // reset transform (keep dpr scale)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (!update) {
      circles.push(circle);
    }
  }

  function drawParticles() {
    clear();
    for (let i = 0; i < settings.quantity; i++) {
      drawCircle(circleParams());
    }
  }

  function remap(value, start1, end1, start2, end2) {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  }

  function animate() {
    clear();
    for (let i = circles.length - 1; i >= 0; i--) {
      const circle = circles[i];
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(remap(closestEdge, 0, 20, 0, 1).toFixed(2));
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha;
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }

      circle.x += circle.dx;
      circle.y += circle.dy;

      circle.translateX +=
        (mouse.x / (settings.staticity / circle.magnetism) - circle.translateX) /
        settings.ease;
      circle.translateY +=
        (mouse.y / (settings.staticity / circle.magnetism) - circle.translateY) /
        settings.ease;

      const outOfBounds =
        circle.x < -circle.size ||
        circle.x > canvasSize.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.h + circle.size;

      if (outOfBounds) {
        circles.splice(i, 1);
        drawCircle(circleParams());
      } else {
        drawCircle(
          {
            ...circle,
            x: circle.x,
            y: circle.y,
            translateX: circle.translateX,
            translateY: circle.translateY,
            alpha: circle.alpha,
          },
          true
        );
      }
    }
    window.requestAnimationFrame(animate);
  }

  const START_DELAY = 500; // شروع نرم‌تر هماهنگ با delayهای صفحه

  // init با تأخیر
  setTimeout(() => {
    resizeCanvas();
    animate();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", onMouseMove);
  }, START_DELAY);

  // حذف اجرای فوری قبلی
  // resizeCanvas();
  // animate();
  // window.addEventListener("resize", resizeCanvas);
  // window.addEventListener("mousemove", onMouseMove);
})();