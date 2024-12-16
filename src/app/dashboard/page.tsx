"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./dashboard.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

interface Department {
  _id: string;
  departmentName: string;
  subDepartments: string[];
}

const Dashboard = () => {
  const [sampleData, setData] = useState<Department[]>([]);
  const [loader, setLoader] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const getAllDept = async () => {
    try {
      setLoader(true);
      const response = await axios.get("https://assignmentnestjs.onrender.com/departments");
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      alert("Error fetching data" + error);
    } finally {
      setLoader(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      console.log(`Deleting department with ID: ${id}`);
      const response = await axios.delete(`http://localhost:4000/departments/${id}`);
      console.log('Delete response:', response);

      if (response.status === 200) {
          const updatedData = sampleData.filter((dept) => dept._id !== id);
          setData(updatedData);
      }
    } catch {
      alert("Error deleting department");
    }
  };

  useEffect(() => {
    getAllDept();
  }, []);

  // Pagination states
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate which data to show on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sampleData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(sampleData.length / itemsPerPage);

  // Handle modal open
  const handleView = (department: Department) => {
    setSelectedDepartment(department); // Set the selected department
    setShowModal(true); // Show the modal
  };

  // Handle modal close
  const handleClose = () => {
    setShowModal(false);
    setSelectedDepartment(null); // Reset selected department
  };

  // Variable q representing the threshold number of subdepartments
  const q = 3;

  return (
    <div className="p-5">
      <Link href="/form">Create Department</Link>
      <div className="table-body">
        {loader ? (
          <span className="loader"></span>
        ) : (
          <Table border={1}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Department Name</th>
                <th>Sub Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((row, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{row.departmentName}</td>
                  <td>
                    {row.subDepartments.length < q
                      ? "None"
                      : row.subDepartments
                          .slice(0, 2)
                          .join(", ")}{" "}
                    {row.subDepartments.length > 2 && " ..."}
                  </td>
                  <td style={{ display: "flex", alignItems:"center", justifyContent:"center", gap:10 }}>
                    <Link
                      href={{
                        pathname: "/editForm",
                        query: { id: row._id },
                      }}
                      className="actionButton">
                      <AiFillEdit color="green" />
                    </Link>

                    <button onClick={() => handleDelete(row._id)} className="actionsButton">
                      <MdOutlineDelete color="red" />
                    </button>
                    <button
                      className="actionsButton"
                      onClick={() => handleView(row)} // Pass the row to handleView
                    >
                      <FaRegEye color="blue" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <MdKeyboardArrowLeft color="black" size={20} />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <MdKeyboardArrowRight color="black" size={20} />
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Department Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDepartment && (
            <>
              <h5>Department Name: {selectedDepartment.departmentName}</h5>
              <h6>Sub Departments:</h6>
              <ul>
                {selectedDepartment.subDepartments.length > 0 ? (
                  selectedDepartment.subDepartments.map((subDept, idx) => (
                    <li key={idx}>{subDept}</li>
                  ))
                ) : (
                  <li>No Sub Departments</li>
                )}
              </ul>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
