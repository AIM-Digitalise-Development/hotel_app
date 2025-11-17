const CardHeader = (props) => {
  return (
    <div className="bg-gradient-to-r from-[#E6E9E5] to-[#DEDED6] px-4 py-2 rounded-t-2xl text-center text-4xl font-semibold">
      <div className="flex justify-between items-center space-x-4">
        <img
          src={props?.leftImage}
          alt="Left Icon"
          className="w-5 h-5  object-contain"
        />
        <span>{props?.title}</span>
        <img
          src={props?.rightImage}
          alt="Right Icon"
          className="w-5 h-5 object-contain"
        />
      </div>
    </div>
  );
};

export default CardHeader;
