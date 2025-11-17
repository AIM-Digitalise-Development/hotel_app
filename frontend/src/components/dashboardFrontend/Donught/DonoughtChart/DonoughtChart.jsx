import { gradientStops } from "../Calculation";

const DonoughtChart = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="relative rounded-full w-32 h-32 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 2xl:w-40 2xl:h-40"
        style={{
          background: `conic-gradient(${gradientStops})`,
        }}
      >
        <div className="absolute inset-0 m-auto w-16 h-16 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18 2xl:w-20 2xl:h-20 bg-[#6e797f] rounded-full"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg md:text-xl lg:text-2xl font-semibold text-white">
            02
          </span>
        </div>
      </div>
    </div>
  );
};

export default DonoughtChart;
