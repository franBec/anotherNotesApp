import { FaArchive } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";

const Actions = ({ id, isArchived, actions }) => {
  return (
    <div className="flex flex-row space-x-1 text-xl">
      <div>
        {isArchived ? (
          <button onClick={() => actions.handleArchiveNote(id, false)}>
            <FaUpload />
          </button>
        ) : (
          <button onClick={() => actions.handleArchiveNote(id, true)}>
            <FaArchive />
          </button>
        )}
      </div>
      <div>
        <button onClick={() => actions.handleEditNote(id)}>
          <FaPencilAlt />
        </button>
      </div>
      <div>
        <button onClick={() => actions.handleDeleteNote(id)}>
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default Actions;
