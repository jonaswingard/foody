import { IAirtableRecord, IDirectionFields } from "@/interfaces";
import React, { FC } from "react";

const Direction: FC<{
  isEditing: boolean;
  direction: IAirtableRecord<IDirectionFields>;
}> = ({ isEditing, direction }) => {
  return (
    <div className="rounded-lg shadow-md bg-white p-3">
      <label>
        {!isEditing && <input type="checkbox" className="peer hidden" />}
        <div className="peer-checked:text-gray-300">
          {direction.fields.Direction}
        </div>
      </label>
    </div>
  );
};

export default Direction;
