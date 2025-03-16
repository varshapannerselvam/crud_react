import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { enqueueSnackbar } from "notistack";

const EditStudent = ({employeeData, setSuccess}) => {
  console.log('employeeDatasss', employeeData);

  const [data, setData] = useState({
    name: employeeData.name,
    age: employeeData.age,
    department: employeeData.department,
    email: employeeData.email,
    phone: employeeData.phone,
    salary: employeeData.salary,
    position: employeeData.position,
    gender: employeeData.gender,
    address: employeeData.address,
    Joining: employeeData.Joining,
    maritalStatus: employeeData.maritalStatus,
    emergencyContactName: employeeData.emergencyContactName,
    emergencyContactPhone: employeeData.emergencyContactPhone,
    workExperience: employeeData.workExperience,
    employeeType: employeeData.employeeType,
    bloodGroup: employeeData.bloodGroup,
    nationality: employeeData.nationality,
    skills: employeeData.skills,
    AltNo:employeeData.AltNo,
  });
  console.log(data);

  useEffect(() => {
    if (employeeData.id) {
      axios.get(`http://localhost:3000/posts/${employeeData.id}`)
        .then((res) => {
          setData(res.data)
          console.log("result", res.data)
        })

        .catch((err) => console.error("Fetch Error:", err));
    }
  }, [employeeData.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:3000/posts/${employeeData.id}`, data)
      .then(() => {
        enqueueSnackbar("Updated Successfully", {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });

        console.log(data);
        setSuccess(true)
      })
      .catch((err) => {
        console.error("Update Error:", err);
      });
  };

  const handleInputChange = (e, value) => {
    setData({ ...data, [value]: e.target.value });
  };

  return (
    <div className='form-container'>
      <h1>Edit Employee Details</h1>
      <form onSubmit={handleSubmit}>
        <div className='forms-container'>
          <div>
            <label>Name:</label>
            <input type="text"
              className='input-container'
              value={data.name}
              onChange={(e) => handleInputChange(e, "name")}
              required />
          </div>

          <div>
            <label>Date of Birth:</label>
            <input type="date"
              className='input-container'
              min="1"
              value={data.age}
              onChange={(e) => handleInputChange(e, "age")}
              required />
          </div>

          <div>
            <label>Gender:</label>
            <select className='input-container'
              value={data.gender}
              onChange={(e) => handleInputChange(e, "gender")}
              required>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          </div>

          <div className='forms-container'>
          <div>
            <label>Nationality:</label>
            <input type="text"
              className='input-container'
              value={data.nationality}
              onChange={(e) => handleInputChange(e, "nationality")}
              required />
          </div>

          <div>
            <label>Blood Group:</label>
            <input
              type="text"
              className="input-container"
              value={data.bloodGroup}
              onChange={(e) => {
                const inputValue = e.target.value.toUpperCase();
                const bloodGroupPattern = /^(A|B|O|AB)[+-]?$/;

                if (bloodGroupPattern.test(inputValue) || inputValue === "") {
                  setData({ ...data, bloodGroup: inputValue });
                }
              }}
              maxLength={3}
              required
            />

          </div>
          <div>
            <label>Marital Status:</label>
            <select className='input-container'
              value={data.maritalStatus}
              onChange={(e) => handleInputChange(e, "maritalStatus")}
              required>
              <option value="">Select</option>
              <option value="Unmarried">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>
          </div>
          
          <h4>Contact Information </h4>
          
          <div className='forms-container'>
          <div>
            <label>Phone:</label>
            <input type="tel"
              className='input-container'
              pattern="[0-9]{10}"
              value={data.phone}
              onChange={(e) => handleInputChange(e, "phone")}
              required />
          </div>
          <div>
          <label>Alternate PhoneNo:</label>
          <input type="tel" className='input-container' 
          pattern="[0-9]{10}" value={data.AltNo} 
          onChange={e => handleInputChange(e,"AltNo")}
          required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email"
              className='input-container'
              value={data.email}
              onChange={(e) => handleInputChange(e, "email")}
              required />
          </div>
        
        </div>
          <h4>Job Information </h4>
           <div className='forms-container'>
                    
           <div>
            <label>Department:</label>
            <input type="text"
              className='input-container'
              value={data.department}
              onChange={(e) => handleInputChange(e, "department")}
              required />
          </div>

        <div>
            <label>Position:</label>
            <input type="text"
              className='input-container'
              value={data.position}
              onChange={(e) => handleInputChange(e, "position")}
              required />
          </div>

         

          <div>
            <label>Salary:</label>
            <input type="number"
              className='input-container'
              min="0"
              value={data.salary}
              onChange={(e) => handleInputChange(e, "salary")}
              required />
          </div>
          <div>
            <label>Date of Joining:</label>
            <input type="date"
              className='input-container'
              value={data.Joining}
              onChange={(e) => handleInputChange(e, "Joining")}
              required />
          </div>
          </div>
          <div className='forms-container'>
          <div>
            <label>Employee Type:</label>
            <select className='input-container'
              value={data.employeeType}
              onChange={(e) => handleInputChange(e, "employeeType")}
              required>
              <option value="">Select</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Intern">Intern</option>
            </select>
          </div>
          <div>
            <label>Work Experience:</label>
            <input type="number"
              className='input-container'
              min="0"
              value={data.workExperience}
              onChange={(e) => handleInputChange(e, "workExperience")}
              required />
          </div>
          <div>
            <label>Skills:</label>
            <input type="text"
              className='input-container'
              value={data.skills}
              onChange={(e) => handleInputChange(e, "skills")}
              required />
          </div>
        </div>

        {/* <div className='forms-container'>
          <div>
            <label>Emergency Contact:</label>
            <input type="text"
              placeholder="Name"
              value={data.emergencyContactName}
              onChange={(e) => handleInputChange(e, "emergencyContactName")}
              required />
            <input type="tel"
              placeholder="Phone"
              pattern="[0-9]{10}"
              value={data.emergencyContactPhone}
              onChange={(e) => handleInputChange(e, "emergencyContactPhone")}
              required />
          </div>
        </div> */}

          <div>
            <button type="submit" onClick={handleSubmit} className='btn btn-save'>Update</button>
          </div>
    </form>
</div>
  );
};

export default EditStudent;
