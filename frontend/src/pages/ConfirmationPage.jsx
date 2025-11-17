import "react";
import BookingDetails from "../components/BookingRoom/BookingDetails";
import { useLocation } from "react-router-dom";

function ConfirmationPage() {
  const location = useLocation();
  const { selectedRooms, totalAmount } = location.state || { selectedRooms: [], totalAmount: 0 };

  return (
    <div className="">
      <BookingDetails selectedRooms={selectedRooms} totalAmount={totalAmount} />
    </div>
  );
}

export default ConfirmationPage;