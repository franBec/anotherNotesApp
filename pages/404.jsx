import Link from "next/link";
import { FaHome } from "react-icons/fa";

const FourOFour = () => {
  return (
    <div className="flex justify-center flex-col items-center h-full">
      <div>
        <p className="text-5xl font-bold">404</p>
      </div>
      <div>
        <p className="italic">Page not found</p>
      </div>
      <div className="mt-10">
        <button className="border-2 drop-shadow-xl border-black">
          <Link href="/">
            <a>
              <div className="py-1 px-2  flex flex-row items-center">
                Go back home <FaHome className="ml-2" />
              </div>
            </a>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default FourOFour;
