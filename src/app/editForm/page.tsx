"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "../form/form.css";

const EditForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // States to hold the form inputs
  const [departmentName, setDepartmentName] = useState("");
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<string[]>([]);
  const [loader, setLoader] = useState(false);
  const subDepartments = ["HR", "Engineering", "Marketing", "Finance", "Sales"];
  const [loader2, setLoader2] = useState(false);

  // Fetch existing department data
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        setLoader2(true);
        const response = await fetch(`https://assignmentnestjs.onrender.com/departments/${id}`);
        if (response.ok) {
          const data = await response.json();
          setDepartmentName(data.departmentName);
          setSelectedSubDepartments(data.subDepartments);
        } else {
          alert("Failed to fetch department details.");
        }
      } catch (error) {
        console.error("Error fetching department:", error);
      } finally {
        setLoader2(false);
      }
    };

    if (id) {
      fetchDepartment();
    }
  }, [id]);

  // Handle the change in inputs
  const handleDepartmentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartmentName(e.target.value);
  };

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

    const departmentData = {
      departmentName,
      subDepartments: selectedSubDepartments,
    };

    try {
      setLoader(true);
      const response = await fetch(`https://assignmentnestjs.onrender.com/departments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(departmentData),
      });

      if (response.ok) {
        alert("Department updated successfully!");
        router.push("/dashboard");
      } else {
        alert("Error updating department");
      }
    } catch (error) {
      console.error("Error updating department:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="content-body">
      <form className="form" onSubmit={handleSubmit}>
        <div className="header">Edit Department</div>
        <div>
          <label htmlFor="departmentName">Department Name:</label>
          <input
            type="text"
            id="departmentName"
            className="input"
            value={loader2 ? "loading...." : departmentName}
            onChange={handleDepartmentNameChange}
            required
          />
        </div>

        <div>
          <label htmlFor="subDepartments">Select SubDepartments:</label>
          <select
            id="subDepartments"
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

        <button type="submit" disabled={loader}>
          {loader ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EditForm;
