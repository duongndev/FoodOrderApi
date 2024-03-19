const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require("./src/config/database");
const {errorHandler, notFound} = require("./src/middlewares/errorHandler");

require("dotenv").config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));
app.use(cors());
app.use(express.json());


// connect to mongodb
connectDB();

// routes
const authRoute = require("./src/router/authRouter");
const userRoute = require("./src/router/userRouter");
const categoryRoute = require("./src/router/categoryRouter");
const productRoute = require("./src/router/productRouter");
const cartRoute = require("./src/router/cartRouter");
const orderRoute = require("./src/router/orderRouter");
const paymentRoute = require("./src/router/paymentRouter");

const api = '/api/v1';

app.use("/", (req, res) => {
  res.json( {
    status: "success",
    message: "Server is running"
  })
})

app.use(`${api}/auth`, authRoute);
app.use(`${api}/users`, userRoute);
app.use(`${api}/categories`, categoryRoute);
app.use(`${api}/products`, productRoute);
app.use(`${api}/cart`, cartRoute);
app.use(`${api}/order`, orderRoute);
app.use(`${api}/payment`, paymentRoute);




// middlewares
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server started....' + port);
});
