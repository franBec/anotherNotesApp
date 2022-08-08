import { FaStickyNote } from "react-icons/fa";

const PulsatingCard = () => {
  return (
    <>
      <div className="border-2 border-black shadow rounded-md p-2 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          {/* <div className="rounded-full bg-slate-700 h-10 w-10"></div> */}
          <FaStickyNote className="text-6xl" />
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-black rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-black rounded col-span-2"></div>
                <div className="h-2 bg-black rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-black rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PulsatingCard;
