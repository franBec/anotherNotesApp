import { FaHome } from "react-icons/fa";
import { useRouter } from "next/router";

const ErrorPage = ({ status, message }) => {
  const router = useRouter();

  const handleClick = () => {
    //hard refresh
    router
      .replace({
        pathname: "/",
      })
      .then(() => router.reload());
  };

  return (
    <div className="flex justify-center flex-col items-center h-full">
      <div>
        <p className="text-5xl font-bold">{status}</p>
      </div>
      <div>
        <p className="italic">{message}</p>
      </div>
      <div className="mt-10">
        <button
          className="border-2 drop-shadow-xl border-black"
          onClick={handleClick}
        >
          <div className="py-1 px-2  flex flex-row items-center">
            Go back home <FaHome className="ml-2" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
