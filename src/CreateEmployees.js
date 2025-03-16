import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SiGooglenews } from "react-icons/si";
import { enqueueSnackbar } from 'notistack';
import { MdContactEmergency } from "react-icons/md";
import { MdAssignment } from "react-icons/md";
import { AiFillCheckSquare } from "react-icons/ai";



const CreateEmployees = ({ id }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");
  const [position, setPosition] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [Joining, setJoining] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [nationality, setNationality] = useState("");
  const [AltPhone, setAltPhone] = useState("");
  const [skills, setSkills] = useState([]);
  const [validation, setValidation] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = {
      id, name, age, department, email, phone, salary, position, gender, address, Joining,
      maritalStatus, emergencyContactName, AltPhone, emergencyContactPhone, workExperience, employeeType,
      bloodGroup, nationality, skills
    };

    console.log(employeeData);

    try {
      axios.post("http://localhost:3000/posts", employeeData);
      enqueueSnackbar("Employee Data Saved Successfully", {
        variant: "success",
        autoHideDuration: 10000,
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
      navigate("/");
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <div className='container'>
    <div className='form-container'>
      <h1>Add New Employee</h1>
      <form onSubmit={handleSubmit}>
      <h3>Personal Details <MdAssignment /></h3>
        <div className='forms-container'>
          <div>
            <label>Name :</label>
            <input type="text" className='input-container' value={name} onChange={e => setName(e.target.value)} onMouseDown={() => setValidation(true)} required />
            {id.length === 0 && validation && <h4 className='errorMsg'>Please Enter Your Name</h4>}</div>

          <div><label>Date of Birth:</label>
            <input type="date" className='input-container' min="1" value={age} onChange={e => setAge(e.target.value)} onMouseDown={() => setValidation(true)} required />
            {id.length === 0 && validation && <h4 className='errorMsg'>Please Enter Your Date of birth</h4>}</div>

          <div><label>Gender:</label>
            <select className='input-container' value={gender} onChange={e => setGender(e.target.value)} onMouseDown={() => setValidation(true)} required>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {id.length === 0 && validation && <h4 className='errorMsg'>Please select Your Gender</h4>}</div>
        </div>
        

        <div className='forms-container'>
        <div><label>Nationality:</label>
          <input type="text" className='input-container' value={nationality} onChange={e => setNationality(e.target.value)} onMouseDown={() => setValidation(true)} required />{id.length === 0 && validation && <h4 className='errorMsg'>Enter Your Nationality </h4>}</div>


        <div><label>Blood Group:</label>
          <input type="text" className='input-container' value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} maxLength={3} onMouseDown={() => setValidation(true)} required />

          {id.length === 0 && validation && <h4 className='errorMsg'>Enter Your Blood Group</h4>}
        </div>

        <div><label>Marital Status:</label>
          <select className='input-container' value={maritalStatus} onChange={e => setMaritalStatus(e.target.value)} onMouseDown={() => setValidation(true)} required>

            <option value="">Select</option>
            <option value="Single">Unmarried</option>
            <option value="Married">Married</option>
          </select>
          {id.length === 0 && validation && <h4 className='errorMsg'>Please select Your status</h4>}</div>
         </div>

        <h3>Contact Information <SiGooglenews /></h3>

        <div className='forms-container'>
        <div><label>Phone:</label>
          <input type="tel" className='input-container' pattern="[0-9]{10}" value={phone} onChange={e => setPhone(e.target.value)} onMouseDown={() => setValidation(true)} required />
          {id.length === 0 && validation && <h4 className='errorMsg'>Please Enter Your Phone number</h4>}</div>


        <div><label>Alternate PhoneNo:</label>
          <input type="tel" className='input-container' pattern="[0-9]{10}" value={phone} onChange={e => setAltPhone(e.target.value)} onMouseDown={() => setValidation(true)} required />
          {id.length === 0 && validation && <h4 className='errorMsg'>Please Enter Your Alternate Phone number</h4>}</div>
        <div><label>Email:</label>
          <input type="email" className='input-container' value={email} onChange={e => setEmail(e.target.value)} onMouseDown={() => setValidation(true)} required />
          {id.length === 0 && validation && <h4 className='errorMsg'>Please Enter Your Email</h4>}</div>

        <div><label>Address:</label>
          <textarea className='input-container' value={address} onChange={e => setAddress(e.target.value)} onMouseDown={() => setValidation(true)} required></textarea>
          {id.length === 0 && validation && <h4 className='errorMsg'>Please Enter Your Address</h4>}</div>
</div>


        <h3>Job Information <AiFillCheckSquare /> </h3>
        <div className='forms-container'>
          
        <div>
        <label>Department:</label>
          <input type="text"  className='input-container' value={department} onChange={e => setDepartment(e.target.value)} onMouseDown={() => setValidation(true)} required />
          {id.length === 0 && validation && <h4 className='errorMsg'>Please Enter Your Department</h4>}</div>


        <div><label>Position:</label>
          <input type="text" className='input-container' value={position} onChange={e => setPosition(e.target.value)} onMouseDown={() => setValidation(true)} required />
          {id.length === 0 && validation && <h4 className='errorMsg'>Please Enter Your Position</h4>}</div>


        <div><label>Salary:</label>
          <input type="number" className='input-container' min="0" pattern="[0-9]" value={salary} onChange={e => setSalary(e.target.value)} onMouseDown={() => setValidation(true)} required />
          {id.length === 0 && validation && <h4 className='errorMsg'>Please Enter Your Salary</h4>}</div></div>
          <div className='forms-container'>

        <div><label>Date of Joining:</label>
          <input type="date" className='input-container' value={Joining} onChange={e => setJoining(e.target.value)} onMouseDown={() => setValidation(true)} required />
          {id.length === 0 && validation && <h4 className='errorMsg'>Please Enter Your Date of Joining</h4>}</div>


        <div><label>Employee Type:</label>
          <select className='input-container' value={employeeType} onChange={e => setEmployeeType(e.target.value)} onMouseDown={() => setValidation(true)} required>
            <option value="">Select</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Intern">Intern</option>

          </select>
          {id.length === 0 && validation && <h4 className='errorMsg'>Select Your EmployeeType</h4>}</div>

        <div><label>Work Experience:</label>
          <input type="number" className='input-container' min="0" value={workExperience} onChange={e => setWorkExperience(e.target.value)} onMouseDown={() => setValidation(true)} required />
          {id.length === 0 && validation && <h4 className='errorMsg'>Please Enter Your Experience</h4>}</div>


        <div className='skills'><label>Skills:</label>
          <input type="text" className='input-container' value={skills} onChange={e => setSkills(e.target.value)} onMouseDown={() => setValidation(true)} required />
          {id.length === 0 && validation && <h4 className='errorMsg'>Please Enter Your Skills</h4>}</div></div>
         
         <h3>Emergency Contact <MdContactEmergency/></h3>
        <div className='forms-container'>
        <div><label>Emergency Contact:</label>
          <input type="text" placeholder="Name" value={emergencyContactName} onChange={e => setEmergencyContactName(e.target.value)} required />
          <input type="number" placeholder="Phone" pattern="[0-9]{10}" value={emergencyContactPhone} onChange={e => setEmergencyContactPhone(e.target.value)} required /></div></div>

        <div>
          <Link to='/' className="btn btn-back">Back</Link>
          <button type="submit" className='btn btn-save'>Save</button>

        </div>
      </form>
    </div>
    </div>
  );
}

export default CreateEmployees;