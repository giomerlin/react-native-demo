const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/api/questions", (req, res) => {
  res.json({
    questions: [
      {
        id: "q1",
        text: "This is the first question",
        subtitle: "This is the subtitle",
        answers: [
          { id: 1, text: "Option 1" },
          { id: 2, text: "Option 2" },
          { id: 3, text: "Option 3" },
        ],
      },
      {
        id: "q2",
        text: "This is the second question",
        subtitle: "This is other subtitle",
        answers: [
          { id: 1, text: "Answer 1" },
          { id: 2, text: "Anwer 2" },
          { id: 3, text: "Answer 3" },
        ],
      },
      {
        id: "q3",
        text: "This is the third question",
        subtitle: "This is another subtitle",
        answers: [
          { id: 1, text: "Option 1" },
          { id: 2, text: "Option 3" },
        ],
      },
    ],
  });
  res.end();
});

app.post("/api/answers", (req, res) => {
  const r = Math.random();
  let status = 200;
  if (r < 0.4) {
    status = 500;
  }
  res.sendStatus(status);

  console.log("Request", req.body, `status: ${status}`);
  res.end();
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
