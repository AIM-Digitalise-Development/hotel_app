const Card = (props) => {
  const { children, ...rest } = props;
  return (
    <div
      {...rest}
      className="rounded-2xl xl:w-[70%] lg:w-[70%] md:w-[70%] sm:w-[70%] 2xl:w-[75%] m-4"
      style={{
        boxShadow: "10px 10px 8px rgba(0, 0, 0, 0.7)",
      }}
    >
      {children}
    </div>
  );
};

export default Card;
