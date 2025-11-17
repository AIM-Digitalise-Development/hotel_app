const Calendar2 = () => {
  return (
    <div
      className="w-44 h-36 bg-gradient-to-r from-[#838b90] to-[#606672] rounded-xl ml-4 text-center mt-4"
      style={{
        boxShadow: "8px 8px 6px rgb(0,0,0,0.6)",
      }}
    >
      <div className="text-white text-lg">Calendar</div>
      <div className="flex font-mono text-base">
        <div className="h-7 w-12 border border-black bg-[#afd4e3] text-white">
          Sun
        </div>
        <div className="h-7 w-12 border border-black bg-[#afd4e3] text-white">
          Mon
        </div>
        <div className="h-7 w-12 border border-black bg-[#afd4e3] text-white">
          Tue
        </div>
        <div className="h-7 w-12 border border-black bg-[#afd4e3] text-white">
          Wed
        </div>
      </div>
      <div className="flex justify-center font-mono text-base">
        <div className="h-7 w-12 border border-black bg-[#e1e5e4]">1</div>
        <div className="h-7 w-12 border border-black bg-[#e1e5e4]">2</div>
        <div className="h-7 w-12 border border-black bg-[#e1e5e4]">3</div>
        <div className="h-7 w-12 border border-black bg-[#e1e5e4]">4</div>
      </div>
      <div className="flex justify-center font-mono text-base">
        <div className="h-7 w-12 border border-black bg-[#e1e5e4]">5</div>
        <div className="h-7 w-12 border border-black bg-[#e1e5e4]">6</div>
        <div className="h-7 w-12 border border-black bg-[#e1e5e4]">7</div>
        <div className="h-7 w-12 border border-black bg-[#e1e5e4]">8</div>
      </div>
      <div className="flex justify-center font-mono text-base">
        <div className="h-7 w-12 border border-black bg-[#e1e5e4]">9</div>
        <div className="h-7 w-12 border border-black bg-[#e1e5e4]">10</div>
        <div className="h-7 w-12 border border-black bg-[#e1e5e4]">11</div>
        <div className="h-7 w-12 border border-black bg-[#e1e5e4]">12</div>
      </div>
      <div className="flex justify-center font-mono text-base">
        <div className="h-7 w-12 border border-black bg-[#e1e5e4]">13</div>
        <div className="h-7 w-12 border border-black bg-[#e1e5e4]">14</div>
        <div className="h-7 w-12 border border-black bg-[#e1e5e4]">15</div>
        <div className="h-7 w-12 border border-black bg-[#e1e5e4]">16</div>
      </div>
    </div>
  );
};

export default Calendar2;
