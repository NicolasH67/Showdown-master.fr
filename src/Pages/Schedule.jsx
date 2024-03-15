import React from "react"
import fakeDATA from "./SCHEDULTEST.json"
import { useTable } from "react-table"
import '../Style/Pages/Schedule.css'

function Schedule() {
    const data = React.useMemo(() => fakeDATA, []); 
    const columns = React.useMemo(
        () => [
          {
            Header: "MNr",
            accessor: "key",
          },
          {
            Header: "Time",
            accessor: "time",
          },
          {
            Header: "Table",
            accessor: "table",
          },
          {
            Header: "Groups",
            accessor: "groups",
          },
          {
            Header: "Player One",
            accessor: "playerOne",
          },
          {
            Header: "Player Two",
            accessor: "playerTwo",
          },
          {
            Header: "Result",
            accessor: "result",
            Cell: ({ row }) => {
              const result = row.original.result[0];
              return (
                <>
                  {result.set1 ? ` ${result.set1}` : ""}
                  {result.set2 ? ` / ${result.set2}` : ""}
                  {result.set3 ? ` / ${result.set3}` : ""}
                  {result.set4 ? ` / ${result.set4}` : ""}
                  {result.set5 ? ` / ${result.set5}` : ""}
                </>
              );
            },
          },
          {
            Header: "Referee",
            accessor: "referee",
          },
        ],
        []
      );

      const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({columns, data}); 
      

    return <>
        <div className="containerTable">
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>

                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    </>
}

export default Schedule
