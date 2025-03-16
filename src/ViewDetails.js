import React from 'react';

const ViewDetails = ({ employeeData }) => {
  return (
    <div className='View-container'>
      <h1>Employee Details</h1>
      {employeeData && (
        <table className='details-table'>
          <tbody>
            {/* <tr><td><strong>ID</strong></td><td>{employeeData.id}</td></tr> */}
            <tr><td><strong>Name</strong></td><td>{employeeData.name}</td></tr>
            <tr><td><strong>Age</strong></td><td>{employeeData.age}</td></tr>
            <tr><td><strong>Department</strong></td><td>{employeeData.department}</td></tr>
            <tr><td><strong>Email</strong></td><td>{employeeData.email}</td></tr>
            <tr><td><strong>Phone</strong></td><td>{employeeData.phone}</td></tr>
            <tr><td><strong>Salary</strong></td><td>{employeeData.salary}</td></tr>
            <tr><td><strong>Gender</strong></td><td>{employeeData.gender}</td></tr>
            <tr><td><strong>Joining Date</strong></td><td>{employeeData.Joining}</td></tr>
            <tr><td><strong>Employee Type</strong></td><td>{employeeData.employeeType}</td></tr>
            <tr><td><strong>Nationality</strong></td><td>{employeeData.nationality}</td></tr>
            <tr><td><strong>Skills</strong></td><td>{employeeData.skills}</td></tr>
            <tr><td><strong>Marital Status</strong></td><td>{employeeData.maritalStatus}</td></tr>
            <tr><td><strong>Position</strong></td><td>{employeeData.position}</td></tr>
            <tr><td><strong>Blood Group</strong></td><td>{employeeData.bloodGroup}</td></tr>
            <tr><td><strong>Work Experience</strong></td><td>{employeeData.workExperience}</td></tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewDetails;
