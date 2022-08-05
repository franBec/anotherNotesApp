import { FaStickyNote } from "react-icons/fa";

import Info from "./info";
import Actions from "./actions";

const Card = ({ data, actions }) => {
  return (
    <div className="flex border-2 p-2 border-black rounded-md">
      <div className="flex-none">
        <FaStickyNote className="text-6xl" />
      </div>
      <div className="grow ml-2 overflow-hidden">
        <Info data={data} />
      </div>
      <div className="flex items-end">
        <div>
          <Actions isArchived={data.archived} id={data.id} actions={actions} />
        </div>
      </div>
    </div>
  );
};

export default Card;
