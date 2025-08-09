// top: requires
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

// create app
const app = express();

// middlewares (place these BEFORE your routes)
app.use(cors());                // for now allow all origins (testing)
app.use(express.json());        // if you accept JSON in requests

const PORT = process.env.PORT || 3000;

// routes
app.get("/products", async (req, res) => {
  try {
    const response = await axios.get("https://qikink.com/api/v1/products", {
      headers: {
        Authorization: `Token ${process.env.QIKINK_API_KEY}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
