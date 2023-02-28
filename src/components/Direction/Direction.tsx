import { FC } from "react";
import { IAirtableRecord, IDirectionFields } from "@/interfaces";

const Direction: FC<{
  isEditing?: boolean;
  direction: IAirtableRecord<IDirectionFields>;
}> = ({ isEditing, direction }) => (
  <div className="rounded-lg shadow-md bg-white p-3">
    <label>
      {!isEditing && <input type="checkbox" className="peer hidden" />}
      <div className="peer-checked:text-gray-300">
        {direction.fields.Direction}
      </div>
    </label>
  </div>
);

export default Direction;
