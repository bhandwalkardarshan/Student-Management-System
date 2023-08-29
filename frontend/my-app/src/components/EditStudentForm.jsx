import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditStudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    gender: '',
    qualification: '',
    img: null,
  });
//   const [image, setImage] = useState(null);

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleUpdateImage = async () => {
//     const formData = new FormData();
//     formData.append('image', image);

//     try {
//       const response = await fetch(`http://localhost:9000/students/${id}/image`, {
//         method: 'PUT',
//         body: formData,
//       });

//       if (response.ok) {
//         console.log('Image updated successfully');
//         // Handle any additional actions after image update
//       }
//     } catch (error) {
//       console.error('Error updating image:', error);
//     }
//   };

  useEffect(() => {
    // Fetch student data based on the ID from your backend
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/students/${id}`); // Adjust the endpoint
        const data = await response.json();
        setFormData(data); // Assuming data is an object with the same field names
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(`http://localhost:9000/students/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Error updating student:', error);
        }
    // Navigate back to the student list page after successful update
    navigate('/');
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData((prevData) => ({
//       ...prevData,
//       img: file,
//     }));
//   };

  return (
    <div>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <br />

        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <br />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <br />

        <label>Gender:</label>
        <label>
        <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === 'Male'}
            onChange={handleChange}
        />
        Male
        </label>
        <label>
        <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === 'Female'}
            onChange={handleChange}
        />
        Female
        </label>
        <label>
        <input
            type="radio"
            name="gender"
            value="Other"
            checked={formData.gender === 'Other'}
            onChange={handleChange}
        />
        Other
        </label>
        <br />
        <label>Qualification:</label>
        <label>
        <input
            type="radio"
            name="qualification"
            value="BCA"
            checked={formData.qualification === 'BCA'}
            onChange={handleChange}
        />
        BCA
        </label>
        <label>
        <input
            type="radio"
            name="qualification"
            value="BCom"
            checked={formData.qualification === 'BCom'}
            onChange={handleChange}
        />
        BCom
        </label>
        <label>
        <input
            type="radio"
            name="qualification"
            value="BE"
            checked={formData.qualification === 'BE'}
            onChange={handleChange}
        />
        BE
        </label>

        <br />

        {/* <label>Image:</label>
        <input type="file" name="img" onChange={handleImageChange} />
        <br /> */}

        <button type="submit" >Update Student</button>
      </form>
    </div>
  );
};

export default EditStudentForm;
