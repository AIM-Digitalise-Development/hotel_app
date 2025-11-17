import { backgroundGridLines, months } from "./GraphChartData";
import {
  data,
  maxValue,
  chartHeight,
  barWidth,
  barSpacing,
  chartWidth,
} from "./Constant";

const GraphChart = () => {
  return (
    <div className="w-full flex justify-center">
      <svg
        className="w-full"
        viewBox={`0 0 ${chartWidth + 100} ${chartHeight + 100}`}
      >
        {backgroundGridLines.map((_, index) => (
          <line
            key={index}
            x1="50"
            y1={50 + index * (chartHeight / 10)}
            x2={chartWidth + 50}
            y2={50 + index * (chartHeight / 10)}
            stroke="white"
            strokeWidth="0.5"
          />
        ))}

        {data.map((_, index) => (
          <line
            key={index}
            x1={50 + index * barSpacing + barWidth / 2}
            y1="50"
            x2={50 + index * barSpacing + barWidth / 2}
            y2={chartHeight + 50}
            stroke="white"
            strokeWidth="0.5"
          />
        ))}

        <line
          x1="50"
          y1="50"
          x2="50"
          y2={chartHeight + 50}
          stroke="white"
          strokeWidth="0.5"
        />
        <line
          x1="50"
          y1={chartHeight + 50}
          x2={chartWidth + 50}
          y2={chartHeight + 50}
          stroke="white"
          strokeWidth="0.5"
        />

        {backgroundGridLines.map((_, index) => (
          <text
            key={index}
            x="40"
            y={chartHeight + 50 - index * (chartHeight / 10)}
            textAnchor="end"
            fontSize="11"
            fill="white"
          >
            {index * 10}%
          </text>
        ))}

        {months.map((day, index) => (
          <text
            key={index}
            x={50 + index * (chartWidth / (months.length - 1))}
            y={chartHeight + 70}
            fontSize="11"
            fill="white"
          >
            {day.label}
          </text>
        ))}

        {data.map((value, index) => {
          const percentage = (value / maxValue) * 100;
          const barHeight = (percentage / 100) * chartHeight;
          const barX = 50 + index * (chartWidth / (data.length - 1));

          return (
            <g key={index}>
              <rect
                x={barX}
                y={chartHeight + 50 - barHeight}
                width={barWidth}
                height={barHeight}
                fill="white"
                rx={0}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default GraphChart;
