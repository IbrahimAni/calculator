const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/calculate", (req, res) => {
  const { num1, num2, operation } = req.body;

  if (typeof num1 !== "number" || typeof num2 !== "number") {
    return res.status(400).send("Inputs must be numbers.");
  }

  let result;
  switch (operation) {
    case "add":
      result = num1 + num2;
      break;
    case "subtract":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    case "divide":
      result = num1 / num2;
      break;
    default:
      return res.status(400).send("Invalid operation.");
  }

  res.send({ result });
});

app.listen(port, () => {
    console.log(`Calculator app listening at http://localhost:${port}`);
});
