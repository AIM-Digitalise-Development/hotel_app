const Ios = () => {
  return (
    <div
      className="w-24 h-44 rounded-2xl bg-gradient-to-b from-[#e3e8e7] to-[#ccd2d6] border-4 border-black relative"
      style={{
        boxShadow: "10px 10px 8px rgb(0,0,0,0.7)",
      }}
    >
      <div
        className="absolute  left-1/2 transform -translate-x-1/2"
        style={{
          width: "60px",
          height: "10px",
          clipPath: "polygon(0 0, 100% 0, 80% 100%, 20% 100%)",
          backgroundColor: "black",
        }}
      ></div>
    </div>
  );
};

export default Ios;
