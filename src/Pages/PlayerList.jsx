import React from "react";
import { useTable } from "react-table";
import playerData from "./PLAYERLIST.json"

function PlayerTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Key",
        accessor: "key",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "City",
        accessor: "city",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: playerData });

  return <>
    <div className="containerTable">
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  </>
}

function App() {
  return (
    <div>
      <h1>Player List</h1>
      <PlayerTable />
    </div>
  );
}

export default App;
