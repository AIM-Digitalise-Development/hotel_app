const CardFooter = (props) => {
  const { children } = props;
  return (
    <div className="bg-gradient-to-r from-[#e5e6e4] to-[#d7d8d4] p-4 rounded-b-2xl text-center">
      {children}
    </div>
  );
};

export default CardFooter;
