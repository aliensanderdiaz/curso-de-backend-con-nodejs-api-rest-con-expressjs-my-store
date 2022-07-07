const routerApi = require('./routes/index.router')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));
app.use(express.json())

app.get("/", (req, res) =>{
  res.send("Hola mi server en Express");
});

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () =>{
  console.log("My port: " + port);
});
