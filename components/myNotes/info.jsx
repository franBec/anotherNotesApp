const Info = ({ data }) => {
  return (
    <div className="overflow-hidden">
      <p className="font-bold truncate ">{data.title ?? "Untitled"}</p>
      <p>
        <span className="font-medium">Last edited:</span>{" "}
        {data.modified?.split("T")[0] ?? "-"}
      </p>
    </div>
  );
};

export default Info;
