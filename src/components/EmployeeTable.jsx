import React, { useEffect, useState } from "react";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const recordsPerPage = 10;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        alert("failed to fetch data");
        setError(err);
      }
    };

    fetchData();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(employees.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = employees.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div style={{ padding: "20px" }}>
      {error ? (
        <p style={{ color: "red" }}>Error loading data.</p>
      ) : (
        <>
          <table border="1" cellPadding="10" cellSpacing="0" width="100%">
            <thead style={{ backgroundColor: "#f0f0f0" }}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              gap: "10px",
            }}
          >
            <button onClick={handlePrev} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeTable;
