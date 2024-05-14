import logo from '../images/logo.svg';
import '../style/App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMemo, useState,useEffect,useCallback } from 'react';
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import data2 from '../data/clients.json';
import { executeModel } from '../api/api';
import * as d3 from 'd3';
import Scatterplot from './Scatterplot';





function App() {


  const [show, setShow]=useState();

  const [data,setData]=useState(data2)

  const handleChangePredict = useCallback((newValue) => {
    setData(newValue);
  },[data]);


  const predict = async (pdata) =>{
    try{
      const result = await executeModel({clients:pdata});
      setShow("Predict")
      setData(result.data["clients"])
    }catch(e){
      console.log(e)
    }
  };

  const columns = useMemo(()=>[
    {
    Header: "Clients",
    columns:[
        {
            Header: "Id",
            accessor: "CustomerID"
        },
        {
            Header: "Name",
            accessor: "Nombre"
        },
        {
            Header: "Gender",
            accessor: "Gender"
        },
        {
            Header: "Age",
            accessor: "Age"
        },
        {
            Header: "Annual Income (Thousand Dollars)",
            accessor: "Annual_Income"
        },
        {
            Header: "Spending Score",
            accessor: "Spending_Score_(1-100)"
        },
        {
          Header: "Cluster",
          accessor: "Cluster"
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

  function showPredict(){
    if(show==="Predict"){
      return <Scatterplot data={data} onChange={handleChangePredict}/>
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="#">Retail Market</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Products</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className="container mt-5">
        <h1 className="text-center mb-4">Welcome to Retail Market</h1>
        <p className="lead text-center mb-5">Your one-stop shop for all your retail needs!</p>
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
          <div className="space"></div>

          <Row className="justify-content-md-center">
              <button type="button" className="btn btn-dark" onClick={()=>predict(data)}>Process</button>
          </Row>
          <div className="space"></div>
          <Row className="justify-content-md-center">
            {showPredict()}
          </Row>
        </Container>
      </main>
      <footer className="footer mt-auto py-3 bg-light">
        <div className="container text-center">
          <span className="text-muted">© 2024 Retail Market. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
