import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(10);

  const getDisplayedEmployees = () => {
    const startIndex = (currentPage - 1) * employeesPerPage;
    const endIndex = startIndex + employeesPerPage;
    return employeeData.slice(startIndex, endIndex);
  };
  const handlePageChange = (direction) => {
    console.log(direction);
    if (direction === "previous" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (
      direction === "next" &&
      employeeData.length > currentPage * employeesPerPage
    ) {
      setCurrentPage(currentPage + 1);
    }
  };
  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => res.json())
      .then((data) => setEmployeeData(data))
      .catch((err) => console.log("failed to fetch data"));
  }, [employeeData]);
  return (
    <div className="App">
      <h1>Employee Data</h1>
      <div className="wrapper">
        <table>
          <tr className="header">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
          {getDisplayedEmployees().map((emp) => (
            <>
              <tr className="table__row" key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
              </tr>
              <tr className="table__line">
                <td colSpan="100%"></td>
              </tr>
            </>
          ))}
        </table>
        <div className="end__line"></div>
        <div className="pagination__wrapper">
          <div className="pagination">
            <button
              className="previous"
              disabled={currentPage === 1}
              onClick={() => handlePageChange("previous")}
            >
              Previous
            </button>
            <div className="page__number">{currentPage}</div>
            <button
              className="next"
              disabled={
                currentPage ===
                Math.ceil(employeeData.length / employeesPerPage)
              }
              onClick={() => handlePageChange("next")}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
