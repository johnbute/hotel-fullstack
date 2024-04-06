const express = require('express');
const app = express();
const port = 3001; // Ensure this is a different port from your React app
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express server is running');
});

const pool = require('./db');

app.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM your_table');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Inside Express.js server file (e.g., index.js)

app.post('/login/employee', async (req, res) => {
    const { employeeID, employeeSSN } = req.body;

    // Directly concatenating user input into an SQL query
    const queryString = `SELECT * FROM employees WHERE employee_id = '${employeeID}' AND ssn = '${employeeSSN}'`;

    try {
        const result = await pool.query(queryString);
        if (result.rows.length > 0) {
            // User found
            res.json({ loggedIn: true });
        } else {
            // User not found
            res.json({ loggedIn: false });
        }
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Server error');
    }
});
  
  app.post('/login/customer', async (req, res) => {
    const { email, password } = req.body;
    // Logic to validate customer credentials against the database
    if (validCredentials) {
      res.json({ loggedIn: true });
    } else {
      res.json({ loggedIn: false });
    }
  });
  

  app.get('/api/rooms', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM Rooms WHERE status = $1', ['Available']);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  
  // Simplified booking endpoint
  app.post('/book-room', async (req, res) => {
    const { start_date, checked_in, end_date, status, reservation_id } = req.body;
  
    try {
      const result = await pool.query('INSERT INTO Booking (start_date, checked_in, end_date, status, reservation_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [start_date, checked_in, end_date, status, reservation_id]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error booking room:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/hotel-chains', async (req, res) => {
    try {
        const hotelChains = await getHotelChainsFromDatabase(); // function to query your database
        res.json(hotelChains);
    } catch (error) {
        console.error("Failed to fetch hotel chains:", error);
        res.status(500).send("Error fetching hotel chains");
    }
});

// Function to get hotel chains from the database
const getHotelChainsFromDatabase = async () => {
    try {
        const result = await pool.query('SELECT * FROM hotel_chains'); // Adjust the table name as necessary
        return result.rows;
    } catch (error) {
        console.error("Failed to fetch hotel chains:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

module.exports = {
    getHotelChainsFromDatabase,
};

// Fetch all hotels
app.get('/api/hotels', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM hotels');
      res.json(result.rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });
  
  // Create a new hotel
  app.post('/api/hotels', async (req, res) => {
    const { name, emails, phone_numbers, address, rating } = req.body;
    try {
      const newHotel = await pool.query(
        'INSERT INTO hotels (name, emails, phone_numbers, address, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, emails, phone_numbers, address, rating]
      );
      res.json(newHotel.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });