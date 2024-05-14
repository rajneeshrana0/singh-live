
require('dotenv').config();
// Import required modules
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

const partyRoutes = require('./router/partyRoutes');
const qualityRouter = require('./router/qualityRouter');
// Initialize express app
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware setup
app.use(cookieParser());
const secretKey = process.env.SECRET_KEY;
main();
app.use(express.json());



// CORS setup
const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN, // Use environment variable
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cors(corsOptions));

// Authentication middleware
function authenticateUser(req, res, next) {
  let token = req.cookies.token;

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

// Product, Store, Purchase, and Sales APIs
app.use("/api/product", authenticateUser, productRoute);
app.use("/api/store", authenticateUser, storeRoute);
app.use("/api/purchase", authenticateUser, purchaseRoute);
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
      res.json({ message: "Login successful" , data :user }  ) ;
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

// Logout endpoint
app.get("/api/logout", (req, res) => {
  // Clear the token cookie
  res.clearCookie("token");
  res.send("Logout successful");
});

// Registration endpoint
app.post("/api/register", (req, res) => {
  let registerUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    imageUrl: req.body.imageUrl,
    check: req.body.check
  });

  console.log(req.body.check)

  registerUser
    .save()
    .then((result) => {
      res.status(200).send(result);
      console.log("Signup Successful");
    })
    .catch((err) => console.log("Signup: ", err));
  });

// Test endpoint
app.get("/testget", async (req, res) => {
  const result = await Product.findOne({ _id: '6429979b2e5434138eda1564' });
  res.json(result);
});

// Quality Endpoint
app.use('/api/qualities', qualityRouter);

// Party Endpoint
app.use('/api/parties', partyRoutes);


// Start the server
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
