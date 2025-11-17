import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import HotelLook from "../../../assets/HotelLook.jpg";
import Divider from "../Divider/Divider";
import CardFooter from "../Card/CardFooter";
import PrimaryBtn from "../Btn/PrimaryBtn";
import wifi from "../../../assets/wifi.png";
import breakfast from "../../../assets/breakfast.png";
import standDardRoom from "../../../assets/room.png";
import suite from "../../../assets/suite.png";
import pool from "../../../assets/swimming.png";
import hotel from "../../../assets/hotel.png";

const Booking = () => {
  return (
    <div className="flex justify-center transform scale-97">
      <Card>
        <header>
          <CardHeader title="Bookings" leftImage={hotel} rightImage={hotel} />
        </header>
        <main>
          <CardBody>
            <div className="relative">
              <img
                src={HotelLook}
                alt="Hotel"
                className="w-full h-24 object-cover" // Reduce height
              />
              <div className="absolute top-1 left-1/2 -translate-x-1/2 text-white text-xs font-bold">
                {/* Reduced font size */}
                <p>Your Perfect Stay, Just a Click Away!</p>
              </div>
            </div>
            <div className="flex">
              <div className="p-2">
                {/* Reduced padding */}
                <div className="font-bold mb-1 text-xs">Basic</div>
                {/* Smaller font */}
                <ul className="list-none text-gray-700 text-[10px]">
                  {/* Tiny font */}
                  <li className="flex items-center mb-1 text-left">
                    <img src={wifi} alt="Wi-Fi" className="w-3 h-3 ml-1" />
                    Free Wi-Fi
                  </li>
                  <li className="flex items-center mb-1 text-left">
                    <img src={breakfast} alt="Breakfast" className="w-3 h-3 ml-1" />
                    Complimentary Breakfast
                  </li>
                  <li className="flex items-center mb-1 text-left">
                    <img src={standDardRoom} alt="Standard Room" className="w-3 h-3 ml-1" />
                    Standard Room
                  </li>
                </ul>
              </div>
              <Divider />
              <div className="p-2">
                {/* Reduced padding */}
                <div className="font-bold mb-1 text-xs">Premium</div>
                {/* Smaller font */}
                <ul className="list-none text-gray-700 text-[10px]">
                  {/* Tiny font */}
                  <li className="flex items-center mb-1 text-left">
                    <img src={wifi} alt="Wi-Fi" className="w-3 h-3 mr-1" />
                    Free Wi-Fi
                  </li>
                  <li className="flex items-center mb-1 text-left">
                    <img src={breakfast} alt="Breakfast" className="w-3 h-3 mr-1" />
                    Continental Breakfast
                  </li>
                  <li className="flex items-center mb-1 text-left">
                    <img src={suite} alt="Suite Room" className="w-3 h-3 mr-1" />
                    Suite Room
                  </li>
                  <li className="flex items-center mb-1 text-left">
                    <img src={pool} alt="Pool & Gym" className="w-3 h-3 mr-1" />
                    Access to Pool & Gym
                  </li>
                </ul>
              </div>
            </div>
          </CardBody>
          <footer>
            <CardFooter>
              <div className="flex justify-between">
                <PrimaryBtn className="text-xs px-2 py-1">Sign Up</PrimaryBtn> {/* Smaller button */}
                <PrimaryBtn className="text-xs px-2 py-1">Login</PrimaryBtn> {/* Smaller button */}
              </div>
            </CardFooter>
          </footer>
        </main>
      </Card>
    </div>
  );
};

export default Booking;
