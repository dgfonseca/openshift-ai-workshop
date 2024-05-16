import React, { useState,useRef,useCallback,useMemo,useEffect  } from 'react';
import { executeModel } from '../api/api';
import '../style/App.css'; // Import CSS file for styling
import pc from '../images/pc.png';
import router from '../images/router.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTable, useFilters, useSortBy, usePagination } from "react-table";

function CustomList({data2,onChange}) {

    const [data,setData]=useState(data2)

  

  const columns = useMemo(()=>[
    {
    Header: "Connections",
    columns:[
        {
            Header: "Duration",
            accessor: "dur"
        },
        {
            Header: "Proto",
            accessor: "proto"
        },
        {
            Header: "Service",
            accessor: "service"
        },
        {
            Header: "State",
            accessor: "state"
        },
        {
            Header: "Spkts",
            accessor: "spkts"
        },
        {
            Header: "Dpkts",
            accessor: "dpkts"
        },
        {
            Header: "Sbytes",
            accessor: "sbytes"
        },
        {
            Header: "Dbytes",
            accessor: "dbytes"
        },
        {
            Header: "Sttl",
            accessor: "sttl"
        },
        {
            Header: "Dttl",
            accessor: "dttl"
        },
        {
            Header: "Smean",
            accessor: "smean"
        },
        {
            Header: "Dmean",
            accessor: "dmean"
        },
        {
            Header: "Response Body Len",
            accessor: "response_body_len"
        },
        {
          Header: "Classification",
          accessor: "label"
        }
    ],
}],[]);

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    page, // rows for the table based on the data passed
    prepareRow,
    setFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({
    columns,
    data
  },useFilters, useSortBy,usePagination);

  useEffect(() => {

  }, []);

  return (
    <Container>
          <div className="space"></div>
          <Row>
            <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                        <tr>
                            {headerGroup.headers.map(column => 
                            {
                                return <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}</th>
                            })}
                        </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {
                        page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr className="itemRow" {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                if(cell.column.Header==='Classification'){
                                    if(cell.value==1){
                                        return <td>Attack</td>
                                    }
                                    else{
                                        return <td>Normal</td>
                                    }
                                }
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                            </tr>
                        );
                        })}
                    </tbody>
                </table>
                <div>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>{" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>{" "}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {">>"}
            </button>{" "}
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <span>
              | Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const pageNumber = e.target.value
                    ? Number(e.target.value) - 1
                    : 0;
                  gotoPage(pageNumber);
                }}
                style={{ width: "50px" }}
              />
            </span>{" "}
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
                </div>
          </Row>
        </Container>
  );
}

export default CustomList;