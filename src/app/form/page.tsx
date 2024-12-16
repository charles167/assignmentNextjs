"use client"
import { useState } from 'react';
import "./form.css"
const DepartmentForm = () => {
  // States to hold the form inputs
  const [departmentName, setDepartmentName] = useState('');
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<string[]>([]);
  const [loader , setLoader] = useState(false)
  // Mock subDepartments list (you can replace it with dynamic data from your backend)
  const subDepartments = [
    'HR',
    'Engineering',
    'Marketing',
    'Finance',
    'Sales',
  ];

  // Handle the change in departmentName input
  const handleDepartmentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartmentName(e.target.value);
  };

  // Handle the change in selected subDepartments
  const handleSubDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedSubDepartments(selectedOptions);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (departmentName.length < 2) {
      alert("Department name must be greater than 2 characters.");
      return;
    }
  
    // Data to be sent to the backend
    const departmentData = {
      departmentName,
      subDepartments: selectedSubDepartments,
    };
  
    try {
        setLoader(true)
      const response = await fetch('https://assignmentnestjs.onrender.com/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(departmentData),
      });
  
      if (response.ok) {
        alert("Department created successfully!");
        // Reset form fields
        setDepartmentName('');
        setSelectedSubDepartments([]);
      } else {
        alert("Error creating department");
      }
    } catch (error) {
      alert("Error sending data");
      console.error(error);
    }finally{
        setLoader(false)
    }
  };
  

  return (
    <div className='content-body'>
    <form className='form' onSubmit={handleSubmit}>
    <div className="header">Create Department</div>
      <div>
        <label htmlFor="departmentName">Department Name:</label>
        <input
          type="text"
          id="departmentName"
          name="departmentName"
          className='input'
          value={departmentName}
          onChange={handleDepartmentNameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="subDepartments">Select SubDepartments:</label>
        <select
          id="subDepartments"
          name="subDepartments"
          multiple
          value={selectedSubDepartments}
          onChange={handleSubDepartmentChange}
        >
          {subDepartments.map((subDepartment) => (
            <option key={subDepartment} value={subDepartment}>
              {subDepartment}
            </option>
          ))}
        </select>
      </div>
{loader ?  <button type="submit" disabled>{loader ? "Loading....." : "Submit"}</button> : <button type="submit" >{loader ? "Loading....." : "Submit"}</button>}
     
    </form>
    </div>
  );
};

export default DepartmentForm;
