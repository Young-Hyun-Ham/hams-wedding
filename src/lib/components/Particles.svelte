<!-- src/lib/components/Particles.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  export let density = 1; // 1=기본, 0.8=조금 덜, 1.2=조금 더
  export let respectReducedMotion = false; // 기본: 무시(=보이게)

  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;

  let raf = 0;
  let w = 0, h = 0, dpr = 1;

  type P = {
    x: number; y: number;
    vx: number; vy: number;
    r: number; rot: number; vr: number;
    type: "petal" | "heart";
    alpha: number;
  };
  let ps: P[] = [];

  function rand(a: number, b: number) { return a + Math.random() * (b - a); }

  function resize() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    if (rect.width < 2 || rect.height < 2) {
      requestAnimationFrame(resize);
      return;
    }
    
    w = Math.max(1, Math.floor(rect.width));
    h = Math.max(1, Math.floor(rect.height));
    dpr = Math.min(2, window.devicePixelRatio || 1);

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // 개수: 화면 크기 기반(너무 무거워지지 않게 상한)
    const base = Math.floor((w * h) / 24000); // 대략 면적당 개수
    const count = Math.max(16, Math.min(56, Math.floor(base * density)));
    ps = new Array(count).fill(0).map(() => spawn(true));
  }

  function spawn(initial = false): P {
    const fromTop = initial ? Math.random() < 0.7 : true;
    const x = rand(0, w);
    const y = fromTop ? rand(-h * 0.2, h) : rand(-40, -10);

    const t: P["type"] = Math.random() < 0.75 ? "petal" : "heart";

    return {
      x,
      y,
      vx: rand(-0.18, 0.18),
      vy: rand(0.35, 0.85),
      r: t === "petal" ? rand(5, 10) : rand(5.5, 9.5),
      rot: rand(0, Math.PI * 2),
      vr: rand(-0.015, 0.015),
      type: t,
      alpha: t === "petal" ? rand(0.25, 0.55) : rand(0.18, 0.42),
    };
  }

  function drawPetal(p: P) {
    if (!ctx) return;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);

    // petal shape (simple bezier)
    const r = p.r;
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.bezierCurveTo(r, -r, r * 1.1, r * 0.2, 0, r);
    ctx.bezierCurveTo(-r * 1.1, r * 0.2, -r, -r, 0, -r);
    ctx.closePath();

    // rose-gold-ish fill (theme-aware via alpha only; 색은 고정 부드럽게)
    ctx.fillStyle = `rgba(242, 198, 207, ${p.alpha})`;
    ctx.fill();

    // tiny highlight
    ctx.strokeStyle = `rgba(255,255,255, ${p.alpha * 0.35})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();
  }

  function drawHeart(p: P) {
    if (!ctx) return;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);

    const s = p.r * 0.95;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.6);
    ctx.bezierCurveTo(s * 1.2, -s * 0.2, s * 0.8, -s * 1.35, 0, -s * 0.75);
    ctx.bezierCurveTo(-s * 0.8, -s * 1.35, -s * 1.2, -s * 0.2, 0, s * 0.6);
    ctx.closePath();

    ctx.fillStyle = `rgba(216, 167, 177, ${p.alpha})`;
    ctx.fill();

    ctx.restore();
  }

  function tick() {
    // ctx가 아직 없으면 다시 얻어오고, 다음 프레임 예약은 유지
    if (!ctx) {
      ctx = canvas?.getContext("2d");
      raf = requestAnimationFrame(tick);
      return;
    }

    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];

      p.x += p.vx + Math.sin((p.y + i * 17) * 0.01) * 0.10;
      p.y += p.vy;
      p.rot += p.vr;

      if (p.type === "petal") drawPetal(p);
      else drawHeart(p);

      if (p.y > h + 30 || p.x < -40 || p.x > w + 40) {
        ps[i] = spawn(false);
        ps[i].y = rand(-40, -10);
      }
    }

    raf = requestAnimationFrame(tick);
  }

  onMount(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (respectReducedMotion && reduceMotion) return;

    resize();
    // 레이아웃 확정 후 한 번 더(간헐적 0-size 방지)
    requestAnimationFrame(resize);

    raf = requestAnimationFrame(tick);

    const onResize = () => resize();
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVis);

    // cleanup은 onMount에서 return
    return () => {
      cancelAnimationFrame(raf);
      raf = 0;
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  });
</script>

<canvas bind:this={canvas} class="fx" aria-hidden="true" />

<style>
  .fx{
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 1;
    filter: none;
  }
</style>
