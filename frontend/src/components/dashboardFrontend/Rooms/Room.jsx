import room1 from "../../../assets/felipepelaquim-1qvUsVrKrMI-unsplash.jpg";
// import roo2 from "../../../assets/felipepelaquim-1qvUsVrKrMI-unsplash.jpg";

const Room = () => {
  return (
    <div className="ml-8">
      <img
        style={{
          boxShadow: "8px 8px 6px rgba(0, 0, 0, 0.7)",
        }}
        className="rounded-lg"
        src={room1}
        height={240}
        width={240}
        alt="Room"
      />
      {/* <img
        style={{
          boxShadow: "8px 8px 6px rgba(0, 0, 0, 0.7)",
        }}
        className="rounded-lg mt-3"
        src={roo2}
        height={240}
        width={240}
        alt="Room"
      /> */}
    </div>
  );
};

export default Room;
