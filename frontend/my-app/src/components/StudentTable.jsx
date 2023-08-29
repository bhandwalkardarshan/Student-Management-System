import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/tableStyles.css';

const StudentTable = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:9000/students'); // Replace with your API endpoint
            if (response.ok) {
                const data = await response.json();
                setStudents(data);
                // alert("student data")
            }
        } catch (error) {
            console.log('Error fetching student data', error);
            
        }
    };

    const handleDelete = async (studentId) => {
        try {
            const response = await fetch(`http://localhost:9000/students/${studentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Student deleted successfully');
                alert('Student deleted successfully');
                // Update the students list after deletion
                fetchData();
            }
        } catch (error) {
            console.log('Error deleting student', error);
        }
    };

    const handleUpdate = async (studentId) => {
        
        try {
            navigate(`/edit/${studentId}`);
        } catch (error) {
            console.log('Error in updating student', error);
        }
    };

    return (
        <div id="content">
            <h2>Student Data</h2>
            <table className="student-table"> 
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Gender</th>
                        <th>Qualification</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.email}</td>
                            <td>{student.address}</td>
                            <td>{student.gender}</td>
                            <td>{student.qualification}</td>
                            <td>
                                <button onClick={() => handleDelete(student._id)}>Delete</button>
                                <button onClick={() => handleUpdate(student._id)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentTable;
