import { AiFillFileAdd } from "react-icons/ai";
import { FaArchive } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";

import Link from "next/link";

const Navbar = ({ archived, handleCreateNote }) => {
  const renderButtonsMyNotes = () => {
    return (
      <>
        <div>
          <p className="text-3xl font-bold">My Notes</p>
        </div>
        <div>
          <button
            onClick={handleCreateNote}
            className="border-2 drop-shadow-xl border-black py-1 px-2 flex flex-row items-center"
          >
            Create note <AiFillFileAdd className="ml-2" />
          </button>
        </div>
        <div>
          <button className="border-2 drop-shadow-xl border-black">
            <Link href="/archivedNotes">
              <a>
                <div className="py-1 px-2 flex flex-row items-center">
                  Go to Archived Notes <FaArchive className="ml-2" />
                </div>
              </a>
            </Link>
          </button>
        </div>
      </>
    );
  };

  const renderButtonsArchivedNotes = () => {
    return (
      <>
        <div>
          <p className="text-3xl font-bold">Archived Notes</p>
        </div>
        <div>
          <button className="border-2 drop-shadow-xl border-black ">
            <Link href="/myNotes">
              <a>
                <div className="py-1 px-2 flex flex-row items-center">
                  Go to My Notes
                  <FaGreaterThan className="ml-2" />
                </div>
              </a>
            </Link>
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-row space-x-5 items-center">
      {archived ? renderButtonsArchivedNotes() : renderButtonsMyNotes()}
    </div>
  );
};

export default Navbar;
