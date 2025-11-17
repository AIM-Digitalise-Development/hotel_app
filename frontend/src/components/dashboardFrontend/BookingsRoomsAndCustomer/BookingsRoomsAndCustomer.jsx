const BookingsRoomsAndCustomer = () => {
  return (
    <div
      className="w-[35rem] h-[10.5rem] border bg-gradient-to-r from-[#e5ebeb] to-[#cfd5d2] rounded-xl p-4 font-mono text-3xl"
      style={{
        boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.7)",
      }}
    >
      <div className="flex justify-between items-center">
        <h5 className="text-center w-1/3">BOOKINGS</h5>
        <h5 className="text-center w-1/3">ROOM</h5>
        <h5 className="text-center w-1/3">CUSTOMERS</h5>
      </div>
      <div className="flex justify-between mt-4">
        {[0, 1, 2, 3, 4].map((number) => (
          <div
            key={number}
            className="h-18 w-18 rounded-full bg-[#b4b7b8] flex justify-center items-center relative"
            style={{
              boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.7)",
            }}
          >
            <div className="h-12 w-12 rounded-full border-r-2 border-white bg-[#5c839b] flex justify-center items-center text-white text-base">
              {number}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsRoomsAndCustomer;
