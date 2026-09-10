import { useEffect, useRef } from "react";

const nodes = [
  [135, 92, "violet", "Python"],
  [195, 70, "violet", "SQL"],
  [245, 118, "violet", "JavaScript"],
  [170, 165, "violet", "React"],
  [265, 165, "violet", "Flutter"],
  [215, 225, "pink", "FastAPI"],
  [335, 92, "cyan", "MongoDB"],
  [405, 70, "cyan", "MySQL"],
  [455, 138, "cyan", "Tableau"],
  [382, 195, "cyan", "Power BI"],
  [490, 225, "cyan", "Firebase"],
  [555, 118, "pink", "Communication"],
  [535, 195, "pink", "Problem Solving"],
  [405, 285, "pink", "Adaptability"],
  [335, 285, "pink", "ChatGPT"],
  [270, 335, "violet", "GitHub"],
  [365, 365, "violet", "Postman"],
  [475, 405, "violet", "VS Code"]
];

export default function Constellation() {
  const pathRef = useRef(null);
  const trainRef = useRef(null);

  const pathD = nodes.map((n, i) => `${i === 0 ? "M" : "L"} ${n[0]} ${n[1]}`).join(" ");

  useEffect(() => {
    const path = pathRef.current;
    const train = trainRef.current;
    if (!path || !train) return;

    const pts = nodes.map((n) => ({ x: n[0], y: n[1] }));

    const segLengths = [];
    let total = 0;
    for (let i = 0; i < pts.length - 1; i++) {
      const dx = pts[i + 1].x - pts[i].x;
      const dy = pts[i + 1].y - pts[i].y;
      const len = Math.hypot(dx, dy);
      segLengths.push(len);
      total += len;
    }

    function setTrainAtPoint(pt, angle = 0) {
      train.setAttribute("transform", `translate(${pt.x - 14}, ${pt.y - 10}) rotate(${angle})`);
    }

    let cancelled = false;

    async function animateLoop() {
      const segDurationBase = 700;
      const dwell = 480;

      while (!cancelled) {
        for (let i = 0; i < pts.length - 1; i++) {
          const start = pts[i];
          const end = pts[i + 1];
          const segLen = segLengths[i] || 1;
          const duration = segDurationBase * (segLen / (total / (pts.length - 1)));

          const startTime = performance.now();
          await new Promise((resolve) => {
            function step(now) {
              if (cancelled) return resolve();
              const t = Math.min(1, (now - startTime) / duration);
              const x = start.x + (end.x - start.x) * t;
              const y = start.y + (end.y - start.y) * t;
              const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);
              setTrainAtPoint({ x, y }, angle);
              if (t < 1) requestAnimationFrame(step);
              else resolve();
            }
            requestAnimationFrame(step);
          });

          await new Promise((r) => setTimeout(r, dwell));
        }

        const last = pts[pts.length - 1];
        const first = pts[0];
        const duration = segDurationBase * 1.6;
        const startTime = performance.now();
        await new Promise((resolve) => {
          function step(now) {
            if (cancelled) return resolve();
            const t = Math.min(1, (now - startTime) / duration);
            const x = last.x + (first.x - last.x) * t;
            const y = last.y + (first.y - last.y) * t;
            const angle = Math.atan2(first.y - last.y, first.x - last.x) * (180 / Math.PI);
            setTrainAtPoint({ x, y }, angle);
            if (t < 1) requestAnimationFrame(step);
            else resolve();
          }
          requestAnimationFrame(step);
        });

        await new Promise((r) => setTimeout(r, dwell));
      }
    }

    animateLoop();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="constellation-wrap" aria-label="Skills Journey - train stops">
      <svg className="constellation" viewBox="0 0 700 470" role="img">
        <title>Skills Journey - train stops</title>

        <path ref={pathRef} d={pathD} fill="none" stroke="transparent" strokeWidth={2} id="trainPath" />

        <g className="constellation-lines">
          {nodes.slice(0, nodes.length - 1).map((_, i) => {
            const [x1, y1] = nodes[i];
            const [x2, y2] = nodes[i + 1];
            return <line key={`${i}-${i + 1}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>

        <g className="stops">
          {nodes.map(([x, y, color, label], idx) => (
            <g key={label} className={`stop ${color}`} data-index={idx}>
              <circle className="stop-ring" cx={x} cy={y} r="14" />
              <circle className="stop-core" cx={x} cy={y} r="6" />
              <text className="stop-label" x={x + 16} y={y + 4}>
                {label}
              </text>
            </g>
          ))}
        </g>

        <g ref={trainRef} className="train" aria-hidden="true">
          <rect className="train-body" x={0} y={0} width={28} height={14} rx={3} ry={3} />
          <circle className="train-wheel" cx={7} cy={16} r={3} />
          <circle className="train-wheel" cx={21} cy={16} r={3} />
        </g>
      </svg>
    </div>
  );
}
