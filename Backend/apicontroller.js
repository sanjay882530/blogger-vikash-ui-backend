import express from "express";
import mysql from "mysql2";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
// Enable CORS for all origins
const allowedOrigins = [
  "https://blogger-vikash-ui-backend.vercel.app",
  "https://vikashblog.up.railway.app",
  "http:localhost:5173",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
dotenv.config();

// Middleware
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || "mysql.railway.internal",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "jEHnNFEATIXFmlIdZLMGhkJWYQvikcMf",
  database: process.env.DB_NAME || "railway",
});

const promisePool = pool.promise();

// Signup route
app.post("/api/signup", async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (rows.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const [erows] = await promisePool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (erows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = await getNextUserId();

    await promisePool.query(
      "INSERT INTO users (id,username, password,email,role) VALUES (?, ?, ?, ?, ?)",
      [id, username, hashedPassword, email, "Blogger"]
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const user = rows[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET, // Fixed here
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api", async (req, res) => {
  try {
    res.json({ statusCode: "1", message: "hello world" });
    console.log("hello world");
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/checkEmail", async (req, res) => {
  const { email } = req.body;
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (rows.length === 0) {
      return res.status(200).json({ message: "success" });
    } else {
      return res.status(400).json({ message: "Email allready exit!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/api/getUserId", async (req, res) => {
  const { username } = req.body;
  try {
    const [rows] = await promisePool.query(
      "SELECT id FROM users WHERE username = ?",
      [username]
    );
    if (rows.length > 0) {
      const userid = rows[0].id;
      return res.status(200).json({ user_id: userid, message: "success" });
    } else {
      return res.status(404).json({ message: "User not found!" }); // Changed the message to "User not found"
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/checkUserName", async (req, res) => {
  const { username } = req.body;
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (rows.length === 0) {
      return res.status(200).json({ message: "success" });
    } else {
      return res.status(400).json({ message: "username allready exit!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/addBlog", async (req, res) => {
  const { title, description, full_description, author, image_url, user_id } =
    req.body;
  try {
    const blogId = Math.floor(Math.random() * 1000) + 1;
    const [result] = await promisePool.query(
      "INSERT INTO blog (id,title, description, full_description, author, image_url, user_id) VALUES (?,?, ?, ?, ?, ?, ?)",
      [blogId, title, description, full_description, author, image_url, user_id]
    );

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "Blog added successfully" });
    } else {
      return res.status(400).json({ message: "Error in adding blog" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});
app.post("/api/getBlogs", async (req, res) => {
  const { user_id } = req.body;
  console.log(user_id);

  try {
    // Fetch all blogs if no user_id is provided, otherwise filter by user_id
    let query = "SELECT * FROM blog";
    let params = [];

    if (user_id) {
      query += " WHERE user_id = ?";
      params.push(user_id);
    }

    const [rows] = await promisePool.query(query, params);

    if (rows.length > 0) {
      return res.status(200).json({ blogs: rows, message: "success" });
    } else {
      return res.status(404).json({ message: "No blogs found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
app.get("/api/getBlogById/:id", async (req, res) => {
  const { id } = req.params; // Extract the id from the URL
  console.log(`Blog ID: ${id}`);

  try {
    // Query to fetch blog by ID
    const query = "SELECT * FROM blog WHERE id = ?";
    const [rows] = await promisePool.query(query, [id]);

    // Check if the blog was found
    if (rows.length > 0) {
      return res.status(200).json({ blogs: rows, message: "success" });
    } else {
      return res
        .status(404)
        .json({ message: "No blog found with the given ID" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/forgotPassword", async (req, res) => {
  const { username } = req.body();
});

// Initialize counter table
async function initializeCounterTable() {
  const connection = pool.getConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS user_id_counter (
        id INT NOT NULL AUTO_INCREMENT,
        last_id INT NOT NULL DEFAULT 0,
        PRIMARY KEY (id)
      )
    `);

    await connection.query(`
      INSERT INTO user_id_counter (id, last_id)
      SELECT 1, 0
      WHERE NOT EXISTS (SELECT * FROM user_id_counter)
    `);
  } finally {
    connection.release();
  }
}

// Function to get the next user ID
async function getNextUserId() {
  const connection = await pool.getConnection(); // Fixed with 'await'
  try {
    await connection.beginTransaction();
    const [rows] = await connection.query(
      "UPDATE user_id_counter SET last_id = last_id + 1 WHERE id = 1"
    );
    if (rows.affectedRows === 0) {
      throw new Error("Failed to update user ID counter");
    }

    const [result] = await connection.query(
      "SELECT last_id FROM user_id_counter WHERE id = 1"
    );
    const newUserId = result[0].last_id;
    await connection.commit();
    return newUserId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

// Initialize counter table on app start
initializeCounterTable().catch(console.error);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
