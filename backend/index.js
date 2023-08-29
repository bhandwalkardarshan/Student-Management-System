const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const studentRoutes = require('./routes/student.routes');
require('dotenv').config();

const app = express();
const port = 9000 || process.env.PORT;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors()); // Use the cors middleware

app.use(express.json());

app.use('/students', studentRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
