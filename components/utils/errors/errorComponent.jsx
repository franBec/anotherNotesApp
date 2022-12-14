const ErrorComponent = ({ message }) => {
  return (
    <div className="bg-red-500 bg-opacity-80 text-white p-4">
      <p className="font-bold text-xl">Error: something went wrong...</p>
      <p>Description: {message}</p>
    </div>
  );
};

export default ErrorComponent;
