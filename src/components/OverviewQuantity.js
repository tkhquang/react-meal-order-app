import React from "react";

const OverviewQuantity = props => {
  const list = props.items ? props.items : [];
  return (
    <table className="table-auto w-full p-4 default-border">
      <tbody>
        {list
          .filter(item => item.users)
          .map(item => (
            <tr key={item.item_name}>
              <td className="p-2 md:px-10 text-left">{item.item_name}</td>
              <td className="p-2 md:px-10 text-left">{item.users.length}</td>
            </tr>
          ))}
      </tbody>
      <tfoot className="font-bold">
        <tr>
          <td className="p-2 md:px-10 text-left">Total:</td>
          <td className="p-2 md:px-10 text-left">
            {list
              .filter(item => item.users)
              .reduce((a, b) => b.users && a + b.users.length, 0)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default OverviewQuantity;
