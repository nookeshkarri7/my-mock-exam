const express = require("express");
const app = express();
const cors = require("cors");
const sql = require("mssql");
console.log(sql.connect);
app.use(express.json());
app.use(cors());
app.listen(4000, console.log("server is running"));

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test",
});

app.get("/quiz_details/:quid", async (request, response) => {
  const { quid } = request.params;
  // const quizNo = parseInt(quid);
  console.log(quid);

  await connection.query(
    "call getquiz(" + quid + ")",
    async function (error, results) {
      if (error) response.send(error);
      response.send(JSON.stringify(results));
    }
  );
});

app.post("/quiz-attempt/submit-quiz/:quid", async (request, response) => {
  const { quid } = request.params;
  const { r_qids, score_individual, username } = request.body;
  console.log(quid);
  function add(accumulator, a) {
    return parseInt(accumulator) + parseInt(a);
  }
  await connection.query(
    `CALL storeAnswers(${quid},'${username}','${r_qids}',${score_individual.reduce(
      add,
      0
    )},'${score_individual}')`,
    async function (error, results) {
      if (error) response.send(error);
      response.send(JSON.stringify(results[0]));
    }
  );
});
