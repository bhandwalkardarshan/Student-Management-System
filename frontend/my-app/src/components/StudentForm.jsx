import React, { useState } from 'react';
import StudentTable from './StudentTable';
import PDFDownload from './PDFDownload';
import './styles/formStyles.css';

const StudentForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        gender: 'Male',
        qualification: 'BCA',
        img: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            img: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = new FormData();
        for (const key in formData) {
            postData.append(key, formData[key]);
        }

        try {
            const response = await fetch('http://localhost:9000/students', {
                method: 'POST',
                body: postData,
            });

            if (response.status === 201) {
                console.log('Student data submitted successfully');
                alert('Student data submitted successfully')
                // Handle success, e.g., show a success message or redirect
            }
        } catch (error) {
            console.error('Error submitting student data', error);
            // Handle error, e.g., display an error message
        }
    };

    return (
        <>
        <div className="student-form"> {/* Apply the CSS class */}
            <h1>Student Form</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* ... your form input fields ... */}
                <label>First Name:</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required /><br />

                <label>Last Name:</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required /><br />

                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required /><br />

                <label>Address:</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required /><br />

                <label>Gender:</label>
                <label><input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male</label>
                <label><input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female</label>
                <label><input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange} /> Other</label><br />

                <label>Qualification:</label>
                <label><input type="radio" name="qualification" value="BCA" checked={formData.qualification === 'BCA'} onChange={handleChange} /> BCA</label>
                <label><input type="radio" name="qualification" value="BCom" checked={formData.qualification === 'BCom'} onChange={handleChange} /> BCom</label>
                <label><input type="radio" name="qualification" value="BE" checked={formData.qualification === 'BE'} onChange={handleChange} /> BE</label><br />

                <label>Image:</label>
                <input type="file" name="img" onChange={handleFileChange} /><br />

                <button type="submit">Submit</button>
            </form>
        </div>
        <StudentTable />
        <PDFDownload />
        </>
    );
};

export default StudentForm;
