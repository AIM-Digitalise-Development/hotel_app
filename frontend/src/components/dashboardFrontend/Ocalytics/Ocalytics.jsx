import {
  barSpacing,
  barWidth,
  chartHeight,
  chartWidth,
  data,
  maxValue,
} from "./OcalyticsConstant";
import { backgroundGridLines, months } from "./OcalyticData";

const Ocalytics = () => {
  return (
    <div
      className="h-48 w-80 bg-gradient-to-r from-[#dbdedc] to-[#bec2c1] rounded-lg p-3"
      style={{
        boxShadow: "10px 10px 8px rgb(0,0,0,0.7)",
      }}
    >
      <h4 className="font-mono text-2xl">Ocatytic</h4>
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
              stroke="black"
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
              stroke="black"
              strokeWidth="0.5"
            />
          ))}

          <line
            x1="50"
            y1="50"
            x2="50"
            y2={chartHeight + 50}
            stroke="grey"
            strokeWidth="0.5"
          />
          <line
            x1="50"
            y1={chartHeight + 50}
            x2={chartWidth + 50}
            y2={chartHeight + 50}
            stroke="grey"
            strokeWidth="0.5"
          />

          {backgroundGridLines.map((_, index) => (
            <text
              key={index}
              x="40"
              y={chartHeight + 50 - index * (chartHeight / 10)}
              textAnchor="end"
              fontSize="10"
              fill="black"
            >
              {index * 10}%
            </text>
          ))}

          {months.map((day, index) => (
            <text
              key={index}
              x={50 + index * (chartWidth / (months.length - 1))}
              y={chartHeight + 70}
              fontSize="10"
              fill="black"
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
                  fill="#799cb3"
                  rx={0}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default Ocalytics;
