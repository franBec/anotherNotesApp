import LoadingCard from "./loadingCard";

const LoadingGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <LoadingCard />
      </div>
      <div>
        <LoadingCard />
      </div>
      <div>
        <LoadingCard />
      </div>
      <div>
        <LoadingCard />
      </div>
      <div>
        <LoadingCard />
      </div>
      <div>
        <LoadingCard />
      </div>
      <div>
        <LoadingCard />
      </div>
      <div>
        <LoadingCard />
      </div>
    </div>
  );
};

export default LoadingGrid;
