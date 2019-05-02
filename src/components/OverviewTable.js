import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const OverviewTable = props => {
  return (
    <table className="w-full text-center table-auto">
      <thead>
        <tr>
          <th className="p-2 md:px-10 text-left truncate">Menu Item</th>
          <th className="p-2 md:px-10 text-left truncate">Member</th>
          <th className="py-2 truncate">Quantity</th>
          <th className="py-2">&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {props.data.items.map(item => (
          <Fragment key={item.id}>
            <tr className="border-2 border-blue-light">
              <td className="text-left md:px-10 p-2 w-1/5">{item.item_name}</td>
              <td className="text-left md:px-10 p-2 w-1/2">
                {item.users.map(user => user.name).join(", ")}
              </td>
              <td className="py-2">{item.users.length}</td>
              <td className="p-2">
                <button
                  type="button"
                  title="Delete Item"
                  className="text-black disabled:text-grey hover:text-grey-dark transition"
                  onClick={() => props.handleDelete(item.id)}
                  disabled={props.disabled}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-2" colSpan={4} />
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default OverviewTable;
