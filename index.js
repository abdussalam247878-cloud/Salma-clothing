const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/products", async (req, res) => {
  try {
    const response = await axios.get("https://qikink.com/api/v1/product/", {
      headers: {
        "Authorization": `Token ${process.env.QIKINK_API_KEY}`,
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});