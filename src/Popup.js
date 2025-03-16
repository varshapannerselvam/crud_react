import React, { useState } from "react";
import { Button } from "@mui/material";
import EditEmployeeDialog from "./EditEmployeeDialog";
const Popup=()=>{
const employeesData = [
  {
    id: "14",
    name: "Pooja",
    age: "1993-02-14",
    department: "Marketing",
    email: "pooja@gmail.com",
    phone: "9000000013",
    salary: "43000",
    position: "Marketing Executive",
    gender: "Female",
    address: "City 4",
    Joining: "2023-02-14",
    maritalStatus: "Married",
    emergencyContactName: "Arjun",
    emergencyContactPhone: "8000000013",
    workExperience: "4",
    employeeType: "Full-time",
    bloodGroup: "AB-",
    nationality: "Australian",
    skills: ["SEO", "Content Marketing"]
  }
];

const App = () => {
  const [employees, setEmployees] = useState(employeesData);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setDialogOpen(true);
  };

  const handleSave = (updatedEmployee) => {
    setEmployees((prev) => prev.map(emp => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
  };

  return (
    <div>
      {employees.map((employee) => (
        <div key={employee.id}>
          <p>{employee.name} - {employee.position}</p>
          <Button variant="contained" onClick={() => handleEdit(employee)}>Edit</Button>
        </div>
      ))}
      
      {selectedEmployee && (
        <EditEmployeeDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          employee={selectedEmployee}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
};
export default Popup;