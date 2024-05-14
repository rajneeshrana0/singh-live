const express = require("express");
const { main } = require("./models/index");
const productRoute = require("./router/product");
const storeRoute = require("./router/store");
const purchaseRoute = require("./router/purchase");
const salesRoute = require("./router/sales");
const accountRoute = require("./router/accountout");
const cors = require("cors");
const User = require("./models/users");
const Product = require("./models/Product");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 4000;
app.use(cookieParser());
const secretKey = "check";
main();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend origin
  credentials: true, // Allow cookies to be sent with the request
};
app.use(cors(corsOptions));

function authenticateUser(req, res, next) {
  let token = req.cookies.token;

  // Check if token is present in headers (for Postman testing)
  if (!token && req.headers.authorization) {
    token = req.headers.authorization;
    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7);
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token expired or invalid" });
    }

    req.user = decoded;
    next();
  });
}

// Products API
app.use("/api/product", authenticateUser, productRoute);

// Store API
app.use("/api/store", authenticateUser, storeRoute);

// Purchase API
app.use("/api/purchase", authenticateUser, purchaseRoute);

// Sales API
app.use("/api/sales", authenticateUser, salesRoute);

//account api 
app.use("/api/account", authenticateUser, accountRoute);

// ------------- Signin --------------
let userAuthCheck = {};;
app.post("/api/login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log("USER: ", user);
    if (user) {
      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });
      res.cookie("token", token, { httpOnly: true, sameSite: "strict", secure: true });
      res.json({ message: "Login successful" });
      userAuthCheck = user;
    } else {
      res.status(401).send("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Getting User Details of login user
app.get("/api/login", (req, res) => {
  if (Object.keys(userAuthCheck).length !== 0) {
    res.send(userAuthCheck);
  } else {
    res.status(401).send("No user logged in");
  }
});

app.get("/api/logout", (req, res) => {
  // Clear the token cookie
  res.clearCookie("token");
  res.send("Logout successful");
});

// ------------------------------------

// Registration API
app.post("/api/register", (req, res) => {
  let registerUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    imageUrl: req.body.imageUrl,
  });

  registerUser
    .save()
    .then((result) => {
      res.status(200).send(result);
      alert("Signup Successful");
    })
    .catch((err) => console.log("Signup: ", err));
  console.log("request: ", req.body);
});

app.get("/testget", async (req, res) => {
  const result = await Product.findOne({ _id: '6429979b2e5434138eda1564' })
  res.json(result)
});

// Here we are listening to the server
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
