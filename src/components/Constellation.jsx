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

const lines = [
  [0, 1],
  [0, 3],
  [1, 2],
  [2, 4],
  [3, 4],
  [3, 5],
  [4, 5],
  [6, 7],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 13],
  [11, 12],
  [12, 10],
  [13, 14],
  [14, 16],
  [15, 16],
  [16, 17],
  [5, 14],
  [10, 16]
];

export default function Constellation() {
  return (
    <div className="constellation-wrap" aria-label="Animated skills constellation">
      <svg className="constellation" viewBox="0 0 700 470" role="img">
        <title>Skills shown as connected glowing nodes</title>
        <g className="constellation-lines">
          {lines.map(([from, to]) => {
            const [x1, y1] = nodes[from];
            const [x2, y2] = nodes[to];
            return (
              <line
                key={`${from}-${to}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
              />
            );
          })}
        </g>

        {nodes.map(([x, y, color, label], index) => (
          <g
            key={label}
            className={`star-node ${color}`}
            style={{ "--delay": `${index * 0.12}s` }}
          >
            <circle className="star-glow" cx={x} cy={y} r="15" />
            <circle className="star-core" cx={x} cy={y} r="7" />
            <text x={x + 13} y={y - 10}>
              {label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
