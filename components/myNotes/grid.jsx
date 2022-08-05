import Card from "./card";

const Grid = ({ data, actions }) => {
  const renderContent = () => {
    if (!data?.length) {
      return <h2>There are no notes</h2>;
    }
    return (
      <div className="grid grid-cols-2 gap-4">
        {data.map((it, i) => (
          <div key={i}>
            <Card data={it} actions={actions} />
          </div>
        ))}
      </div>
    );
  };

  return <>{renderContent()}</>;
};

export default Grid;
