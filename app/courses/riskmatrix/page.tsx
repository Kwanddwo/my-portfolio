export default function RiskMatrix() {
  return (
    <svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
      <text x="400" y="30" className="title" text-anchor="middle">
        Risk Matrix (5x5) - Workshop Project
      </text>

      <text
        x="30"
        y="300"
        className="axis-label"
        text-anchor="middle"
        transform="rotate(-90 30 300)"
      >
        IMPACT
      </text>

      <text x="400" y="670" className="axis-label" text-anchor="middle">
        PROBABILITY
      </text>

      <rect x="100" y="80" width="120" height="100" className="medium" />
      <rect x="220" y="80" width="120" height="100" className="high" />
      <rect x="340" y="80" width="120" height="100" className="high" />
      <rect x="460" y="80" width="120" height="100" className="critical" />
      <rect x="580" y="80" width="120" height="100" className="critical" />

      <rect x="100" y="180" width="120" height="100" className="low" />
      <rect x="220" y="180" width="120" height="100" className="medium" />
      <rect x="340" y="180" width="120" height="100" className="high" />
      <rect x="460" y="180" width="120" height="100" className="high" />
      <rect x="580" y="180" width="120" height="100" className="critical" />

      <rect x="100" y="280" width="120" height="100" className="verylow" />
      <rect x="220" y="280" width="120" height="100" className="low" />
      <rect x="340" y="280" width="120" height="100" className="medium" />
      <rect x="460" y="280" width="120" height="100" className="medium" />
      <rect x="580" y="280" width="120" height="100" className="high" />

      <rect x="100" y="380" width="120" height="100" className="verylow" />
      <rect x="220" y="380" width="120" height="100" className="verylow" />
      <rect x="340" y="380" width="120" height="100" className="low" />
      <rect x="460" y="380" width="120" height="100" className="low" />
      <rect x="580" y="380" width="120" height="100" className="medium" />

      <rect x="100" y="480" width="120" height="100" className="verylow" />
      <rect x="220" y="480" width="120" height="100" className="verylow" />
      <rect x="340" y="480" width="120" height="100" className="verylow" />
      <rect x="460" y="480" width="120" height="100" className="verylow" />
      <rect x="580" y="480" width="120" height="100" className="low" />

      <line x1="100" y1="80" x2="700" y2="80" className="grid-line" />
      <line x1="100" y1="180" x2="700" y2="180" className="grid-line" />
      <line x1="100" y1="280" x2="700" y2="280" className="grid-line" />
      <line x1="100" y1="380" x2="700" y2="380" className="grid-line" />
      <line x1="100" y1="480" x2="700" y2="480" className="grid-line" />
      <line x1="100" y1="580" x2="700" y2="580" className="grid-line" />

      <line x1="100" y1="80" x2="100" y2="580" className="grid-line" />
      <line x1="220" y1="80" x2="220" y2="580" className="grid-line" />
      <line x1="340" y1="80" x2="340" y2="580" className="grid-line" />
      <line x1="460" y1="80" x2="460" y2="580" className="grid-line" />
      <line x1="580" y1="80" x2="580" y2="580" className="grid-line" />
      <line x1="700" y1="80" x2="700" y2="580" className="grid-line" />

      <text x="75" y="135" className="axis-label" text-anchor="end">
        5
      </text>
      <text x="75" y="235" className="axis-label" text-anchor="end">
        4
      </text>
      <text x="75" y="335" className="axis-label" text-anchor="end">
        3
      </text>
      <text x="75" y="435" className="axis-label" text-anchor="end">
        2
      </text>
      <text x="75" y="535" className="axis-label" text-anchor="end">
        1
      </text>

      <text x="160" y="605" className="axis-label" text-anchor="middle">
        1
      </text>
      <text x="280" y="605" className="axis-label" text-anchor="middle">
        2
      </text>
      <text x="400" y="605" className="axis-label" text-anchor="middle">
        3
      </text>
      <text x="520" y="605" className="axis-label" text-anchor="middle">
        4
      </text>
      <text x="640" y="605" className="axis-label" text-anchor="middle">
        5
      </text>

      <text x="400" y="125" className="cell-text">
        Instructor
      </text>
      <text x="400" y="140" className="cell-text">
        Absence
      </text>
      <text x="400" y="155" className="cell-text">
        (15)
      </text>

      <text x="400" y="225" className="cell-text">
        Low
      </text>
      <text x="400" y="240" className="cell-text">
        Attendance
      </text>
      <text x="400" y="255" className="cell-text">
        (12)
      </text>

      <text x="400" y="320" className="cell-text">
        Software
      </text>
      <text x="400" y="335" className="cell-text">
        Malfunction
      </text>
      <text x="400" y="350" className="cell-text">
        (9)
      </text>

      <text x="280" y="320" className="cell-text">
        Schedule
      </text>
      <text x="280" y="335" className="cell-text">
        Conflicts
      </text>
      <text x="280" y="350" className="cell-text">
        (9)
      </text>

      <text x="520" y="420" className="cell-text">
        Varying
      </text>
      <text x="520" y="435" className="cell-text">
        Skill Levels
      </text>
      <text x="520" y="450" className="cell-text">
        (8)
      </text>

      <text x="160" y="125" className="cell-text">
        Power
      </text>
      <text x="160" y="140" className="cell-text">
        Outages
      </text>
      <text x="160" y="155" className="cell-text">
        (5)
      </text>

      <text x="160" y="225" className="cell-text">
        Room
      </text>
      <text x="160" y="240" className="cell-text">
        Unavailable
      </text>
      <text x="160" y="255" className="cell-text">
        (4)
      </text>

      <text x="160" y="320" className="cell-text">
        Extreme
      </text>
      <text x="160" y="335" className="cell-text">
        Weather
      </text>
      <text x="160" y="350" className="cell-text">
        (4)
      </text>
    </svg>
  );
}
