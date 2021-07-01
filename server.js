const express = require("express");
const randomId = require("random-id");
const app = express(),
  bodyParser = require("body-parser"),
  fs = require("fs"),
  port = 3080;

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const customCss = fs.readFileSync(process.cwd() + "/swagger.css", "utf8");

app.use(bodyParser.json());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customCss })
);

/*
--------------- The function can also be used with the npm library.
Installation
npm i fibonacci-series --save

Usage
const fibonacci = require ('fibonacci-series');
const numberArray = fibonacci(5);
console.log (numberArray);
*/

app.post("/api/fibonacci", (req, res) => {
  try {
    console.log(req.body.fibonacci.n);
    var n = req.body.fibonacci.n;
    console.log(n);
    var fibonacci = function (n) {
      if (n <= 0) res.status(400).json("n cannot n<= 0");
      else if (n === 1) {
        return [0, 1];
      } else {
        var arr = fibonacci(n - 1);
        arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
        return arr;
      }
    };
    res.status(200).json(fibonacci(n));
  } catch (err) {
    res.status(400).json({ msg: err });
    console.log(err);
  }
});

app.post("/api/ackermann", (req, res) => {
  try {
    var n = req.body.ackermann.n;
    var m = req.body.ackermann.m;

    var ackermann = function (m, n) {
      if (m == 0) {
        return n + 1;
      } else if (m > 0 && n == 0) {
        return ackermann(m - 1, 1);
      } else if (m > 0 && n > 0) {
        return ackermann(m - 1, ackermann(m, n - 1));
      } else return n + 1;
    };

    res.status(200).json(ackermann(m, n));
  } catch (err) {
    res.status(400).json({ msg: err });
    console.log(err);
  }
});
app.post("/api/factorial", (req, res) => {
  try {
    var n = req.body.factorial.n;

    var factorial = function (n) {
      let answer = 1; // answer should be 1 for the multiplication in the next step
      if (n < 0) return "n cannot negative... ";
      else if (n == 0 || n == 1) {
        return answer;
      } else {
        for (var i = n; i >= 1; i--) {
          answer = answer * i;
        }
        return answer;
      }
    };

    res.status(200).json(factorial(n));
  } catch (err) {
    res.status(400).json({ msg: err });
    console.log(err);
  }
});

app.get("/", (req, res) => {
  res.send(`<h1>API Running on port ${port}</h1>`);
});

app.listen(port, () => {
  console.log(`Server listening on the port::::::${port}`);
});
