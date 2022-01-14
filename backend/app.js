const express = require("express");
const app = express();
const cors = require("cors");
const { response, request } = require("express");
const sql = require("mssql");
app.use(express.json());
app.use(cors());
app.listen(4000, console.log("server is running"));


const connectDb=async () => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(
      "Server=localhost,3306;Database=test;User Id=root;Password=root;Encrypt=true"
    );
    const result = await sql.query`select 1`;
    console.log(result);
  } catch (err) {
    // ... error checks
  }
};
connectDb()
app.get("/", (request, response) => {
  response.send("moviesData");
});
