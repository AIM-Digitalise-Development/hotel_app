const Achievements = () => {
  const growth =
    "https://imgs.search.brave.com/os2hZ1rFCen9_vZsUCbwB-NcS-oqeZWEXTnBI_C2h2Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQw/MDkzMjkyMy9waG90/by9jcnlzdGFsLXN0/YXItc2hhcGUtdHJv/cGh5LWFnYWluc3Qt/Ymx1ZS1iYWNrZ3Jv/dW5kLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz0tRGFIOWpP/WHVZTFJMaXBEUXFH/Q1lFeExoZ1cwVGdN/Qk9NeEZQQWdmYjFF/PQ";
  return (
    <div
      className="h-40 w-56 bg-gradient-to-r from-[#9fa9aa] to-[#7c8895] rounded-lg border-l border-t border-white p-3"
      style={{
        boxShadow: "8px 8px 8px rgb(0,0,0,0.7)",
      }}
    >
      <div className="flex justify-between w-full">
        <div className="h-32 w-1/2 border-r-2">
          <div className="grid grid-cols-2 p-2 gap-2">
            <div className="h-8 w-8 bg-cover object-cover">
              <img
                height="100%"
                width="100%"
                src={growth}
                alt="Growth"
                className="object-cover"
              />
            </div>
            <div className="h-8 w-8 bg-cover object-cover">
              <img
                height="100%"
                width="100%"
                src={growth}
                alt="Growth"
                className="object-cover"
              />
            </div>
            <div className="h-8 w-8 bg-cover object-cover">
              <img
                height="100%"
                width="100%"
                src={growth}
                alt="Growth"
                className="object-cover"
              />
            </div>
            <div className="h-8 w-8 bg-cover object-cover">
              <img
                height="100%"
                width="100%"
                src={growth}
                alt="Growth"
                className="object-cover"
              />
            </div>
            <div className="h-8 w-8 bg-cover object-cover">
              <img
                height="100%"
                width="100%"
                src={growth}
                alt="Growth"
                className="object-cover"
              />
            </div>
            <div className="h-8 w-8 bg-cover object-cover">
              <img
                height="100%"
                width="100%"
                src={growth}
                alt="Growth"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="h-full w-0 border-r-2 "></div>

        <div className="h-32 w-1/2">
          <div className="grid grid-cols-2 p-2 gap-2">
            <div className="h-8 w-8 bg-cover object-cover">
              <img
                height="100%"
                width="100%"
                src={growth}
                alt="Growth"
                className="object-cover"
              />
            </div>
            <div className="h-8 w-8 bg-cover object-cover">
              <img
                height="100%"
                width="100%"
                src={growth}
                alt="Growth"
                className="object-cover"
              />
            </div>
            <div className="h-8 w-8 bg-cover object-cover">
              <img
                height="100%"
                width="100%"
                src={growth}
                alt="Growth"
                className="object-cover"
              />
            </div>
            <div className="h-8 w-8 bg-cover object-cover">
              <img
                height="100%"
                width="100%"
                src={growth}
                alt="Growth"
                className="object-cover"
              />
            </div>
            <div className="h-8 w-8 bg-cover object-cover">
              <img
                height="100%"
                width="100%"
                src={growth}
                alt="Growth"
                className="object-cover"
              />
            </div>
            <div className="h-8 w-8 bg-cover object-cover">
              <img
                height="100%"
                width="100%"
                src={growth}
                alt="Growth"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
