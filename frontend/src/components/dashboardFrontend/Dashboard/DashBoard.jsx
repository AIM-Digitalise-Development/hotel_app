import DonoughtChart from "../Donught/DonoughtChart/DonoughtChart";
import GraphChart from "../GraphChart/GraphChart";

const Dashboard = () => {
  return (
    <div
      className="bg-gradient-to-r from-[#88999f] to-[#697780] h-[12rem] w-[35rem] flex flex-col items-center rounded-2xl justify-center px-4 mt-3  border-l-2 border-white transform scale-95"
      style={{
        boxShadow: "9px 9px 9px rgba(0, 0, 0, 0.7)", // Slightly larger shadow
      }}
    >
      <div className="flex w-full justify-center gap-4">
        <DonoughtChart className="h-28 w-28" /> {/* Adjust chart sizes */}
        <GraphChart className="h-28 w-28" /> {/* Adjust chart sizes */}
      </div>
    </div>
  );
};

export default Dashboard;


