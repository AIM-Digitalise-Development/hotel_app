const AreaChart = () => {
  return (
    <div
      className="relative h-40 w-64 bg-gradient-to-r from-[#829098] to-[#6f7b84] rounded-lg ml-4 p-4"
      style={{
        boxShadow: "8px 8px 6px rgb(0,0,0,0.7)",
      }}
    >
      <div className="relative h-full w-full bg-[#77848b] rounded-lg p-5">
        <div className="absolute inset-0 grid grid-rows-5 grid-cols-6">
          {[...Array(30)].map((_, index) => (
            <div
              key={index}
              className="border border-gray-300 border-opacity-20"
            ></div>
          ))}
        </div>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 240 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="graphBackground"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#bcf6f9" />
              <stop offset="100%" stopColor="#73bad7" />
            </linearGradient>
          </defs>
          <path
            d="M0,100
                     L40,70
                     L80,80
                     L120,40
                     L160,50
                     L200,10
                     L240,10
                     L240,100 Z"
            fill="url(#graphBackground)"
            stroke="none"
          />
          <path
            d="M0,100
                     L40,70
                     L80,80
                     L120,40
                     L160,50
                     L200,10
                     L240,10"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
          />

          {[ 
            { x: 40, y: 70 }, 
            { x: 120, y: 40 }, 
            { x: 160, y: 50 }, 
            { x: 200, y: 10 },
          ].map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#ffffff"
              stroke="#6f7b84"
              strokeWidth="2"
            />
          ))}

          {/* The horizontal line is removed */}
          {/* <line
            x1="0"
            y1="100"
            x2="240"
            y2="100"
            stroke="#ffffff"
            strokeWidth="2"
          /> */}

          <line
            x1="0"
            y1="0"
            x2="0"
            y2="100"
            stroke="#ffffff"
            strokeWidth="2"
          />
        </svg>

        <div className="absolute left-2 top-0 h-full flex flex-col justify-between text-gray-300">
          {["100", "75", "50", "25", "0"].map((label, index) => (
            <span key={index} className="text-xs">
              {label}
            </span>
          ))}
        </div>

        <div className="absolute bottom-2 left-6 right-6 flex justify-between text-gray-300">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((label, index) => (
            <span key={index} className="text-xs">
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AreaChart;
