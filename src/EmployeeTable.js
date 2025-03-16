import React, { useEffect, useState } from 'react';
import axios from "axios";
import { CiRead } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { IoCheckbox } from "react-icons/io5";
import ViewDetails from './ViewDetails';
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { enqueueSnackbar } from 'notistack';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import EditEmployees from "./EditEmployees";
import * as XLSX from 'xlsx';


const EmployeeTable = ({ setId }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const [popSelect, setPopSelect] = useState(null)

  const [success, setSuccess] = useState(false)

  const EmployeeGet = () => {
    axios.get("http://localhost:3000/posts")
      .then((res) => {

        let result = res.data
        let gen_id = parseInt(result[result.length - 1].id) + 1
        setId(gen_id.toString())
        setData(result.reverse())
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    EmployeeGet()
  }, [])

  const DisplayDetails = (id) => {
    const employee = data.find(emp => emp.id === id);
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };
  console.log("select", selectedEmployee)
  const EditDetails = (data) => {
    // const employee = data.find(emp => emp.id === id);
    setSelectedEmployee(data);
    setIsEditModalOpen(true);
    // navigate('/employee/Edit/' + id);
  };
  useEffect(() => {
    if (showPopup || isModalOpen || showPopup1 || isEditModalOpen) {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.position = "fixed";
      document.documentElement.style.width = "100%";
    } else {
      document.documentElement.style.overflow = "auto";
      document.documentElement.style.position = "static";
    }

    return () => {
      document.documentElement.style.overflow = "auto";
      document.documentElement.style.position = "static";
    }
  }, [showPopup, isModalOpen, showPopup1, isEditModalOpen]);

  const handleCheckBox = () => {
    if (isChecked.length === data.length) {
      setIsChecked([]);
    } else {
      setIsChecked(data.map((emp) => emp.id));
    }
  };

  const handleCheckboxChange = (id) => {
    setIsChecked((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id])
  }

  const handleDelete = () => {
    console.log("Date:", isChecked)
    Promise.all(
      isChecked.map((id) => fetch("http://localhost:3000/posts/" + id,
        { method: 'DELETE' })
      ))
      .then((res) => {
        enqueueSnackbar("Data removed successfully", {
          variant: "success",
          autoHideDuration: 10000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
        window.location.reload();
      })
      .catch((err) => console.error(err));
  }

  const handleRemove = (id) => {
    setPopSelect(id)
    setShowPopup(true)
  }

  const handleOkClick = (id) => {
    if (popSelect) {
      fetch("http://localhost:3000/posts/" + popSelect,
        { method: 'DELETE' })
        .then((res) => {
          enqueueSnackbar("Data removed successfully", {
            variant: "success",
            autoHideDuration: 5000,
            anchorOrigin: { vertical: "top", horizontal: "center" },
          });
          setShowPopup(false)
          setPopSelect(null)
          window.location.reload();
        })
        .catch((err) => console.error(err))
    }
  }

  const handleCancelClick = () => {
    setShowPopup(false)
    setPopSelect(null)
  }

  useEffect(() => {
    if (success) {
      setIsEditModalOpen(false)
      EmployeeGet()
    }
  }, [success])

  const handleexcel = () => {
    if (isChecked.length === 0) {
      alert("Please select at least one user to download.");
      return;
    }

    const selectedData = data.filter((user) => isChecked.includes(user.id));
    const ws = XLSX.utils.json_to_sheet(selectedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");

    let fileName = "Users.xlsx";

    if (isChecked.length === 1) {
      const selectedUser = data.find(user => user.id === isChecked[0]);
      if (selectedUser) {
        fileName = `${selectedUser.name}.xlsx`;
      }
    }

    XLSX.writeFile(wb, fileName);
  };

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = data.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(data.length / recordsPerPage);
  console.log(data.length / recordsPerPage)

  return (
    <div>
      <div>
        <h1>Employees Records</h1>
      </div>
      <div className='edited'>
        <div className="button-container">
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon
                onClick={() => {
                  if (isChecked.length) {
                    setShowPopup1(true);
                  } else {
                    setShowPopup2(true);
                  }
                }}
                sx={{ color: "red" }}
                fontSize="large"
              />
            </IconButton>
          </Tooltip>

          <button
            className='btn-download'
            style={{ backgroundColor: "green", color: "white", padding: "8px 12px", borderRadius: "5px", border: "none" }}
            onClick={handleexcel}
          >
            Download
          </button>

          <Tooltip title="Add">
            <Link to="/employee/create" className='add'>
              <AddToPhotosIcon style={{ color: "blue" }} />
            </Link>
          </Tooltip>
        </div>

      </div>

      <div>
        <div className='emp-table'>
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={isChecked.length === data.length && data.length > 0}
                    onChange={handleCheckBox}
                  />
                </th>
                <th>S.No</th>
                <th>Name</th>
                <th>Date Of Birth</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Salary</th>
                <th>Department</th>
                <th>Gender</th>
                <th>Date of Joining</th>
                <th>Employee Type</th>
                <th>Skills</th>
                <th>maritalStatus </th>
                <th>emergencyContactName</th>
                <th>emergencyContactPhone</th>
                <th>workExperience</th>
                <th>bloodGroup</th>
                <th>nationality</th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={isChecked.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.salary}</td>
                  <td>{item.department}</td>
                  <td>{item.gender}</td>
                  <td>{item.Joining}</td>
                  <td>{item.employeeType}</td>
                  <td>{item.skills}</td>
                  <td>{item.maritalStatus} </td>
                  <td>{item.emergencyContactName}</td>
                  <td>{item.emergencyContactPhone}</td>
                  <td>{item.workExperience}</td>
                  <td>{item.bloodGroup}</td>
                  <td>{item.nationality}</td>

                  <td>
                    <div onClick={() => DisplayDetails(item.id)} className='eye'><CiRead /></div></td>
                  <td><div onClick={() => EditDetails(item)} className='edit'><FaEdit /></div></td>
                  <td><div onClick={() => handleRemove(item.id)} className='delete'><MdDelete /> </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {
          showPopup && (
            <div className="popup">
              <div className="popup-content">
                <p>Are you sure you want to delete Employee Data?</p>
                <button onClick={handleOkClick}>Ok</button>
                <button onClick={handleCancelClick}>cancel</button>
              </div>
            </div>
          )
        }
        {
          showPopup1 && (
            <div className="popup">
              <div className="popup-content">
                <p>Are you sure you want to delete selected employee data?</p>
                <button onClick={handleDelete}>Ok</button>
                <button onClick={() => setShowPopup1(false)}>cancel</button>
              </div>
            </div>
          )
        }

        {
          showPopup2 && (
            <div className="popup">
              <div className="popup-content">
                <p>Please check atleast one employee!</p>
                <button onClick={() => setShowPopup2(false)}>Ok</button>
                <button onClick={() => setShowPopup2(false)}>cancel</button>
              </div>
            </div>
          )
        }

        <div className="pagination">
          <button className='btn btn-prev' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            <FaArrowAltCircleLeft />
          </button>
          <span> Page {currentPage} of {totalPages} </span>
          <button className='btn btn-next' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            <FaArrowAltCircleRight />
          </button>
        </div>
      </div>


      <Dialog
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
      >
        <div className="modal-overlay">
          <div className="modal">
            <ViewDetails employeeData={selectedEmployee} />
            <button className="btn btn-close" onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      </Dialog>

      <Dialog
        onClose={() => setIsEditModalOpen(false)}
        open={isEditModalOpen}
      >
        <div className="modal-overlay">
          <div className="modal">
            <EditEmployees employeeData={selectedEmployee} setSuccess={setSuccess} />
            <button className="btn btn-close" onClick={() => setIsEditModalOpen(false)}>Close</button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default EmployeeTable;
