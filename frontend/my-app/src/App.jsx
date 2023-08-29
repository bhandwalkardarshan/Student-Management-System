import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import StudentForm from './components/StudentForm';
import EditStudentForm from './components/EditStudentForm';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<StudentForm />} />
          <Route path="/edit/:id" element={<EditStudentForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
