import PulsatingCard from "./pulsatingCard";

const LoadingGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <PulsatingCard />
      </div>
      <div>
        <PulsatingCard />
      </div>
      <div>
        <PulsatingCard />
      </div>
      <div>
        <PulsatingCard />
      </div>
      <div>
        <PulsatingCard />
      </div>
      <div>
        <PulsatingCard />
      </div>
      <div>
        <PulsatingCard />
      </div>
      <div>
        <PulsatingCard />
      </div>
    </div>
  );
};

export default LoadingGrid;
