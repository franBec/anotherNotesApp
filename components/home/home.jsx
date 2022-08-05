import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { faArchive } from "@fortawesome/free-solid-svg-icons";

import { useUsername } from "../../zustand/sessionStore";

import HomeCard from "./homeCard";

const Home = () => {
  const username = useUsername((state) => state.username);

  return (
    <>
      <p className="text-center font-bold text-3xl">Hello {username}!</p>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-8 place-content-center">
          <HomeCard
            icon={faStickyNote}
            link="/myNotes"
            title="Go to My Notes"
          />
          <HomeCard
            icon={faArchive}
            link="/archivedNotes"
            title="Go to Archived Notes"
          />
        </div>
      </div>
      <p className="text-center italic">
        You can logout from the top right corner
      </p>
    </>
  );
};

export default Home;
