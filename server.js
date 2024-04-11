require('dotenv').config()
const express = require('express')
const cors = require("cors");
require("./dB/config");
const app = express()
app.use(express.json());
const port = process.env.MONGO_PORT
const Passwords = require("./dB/Passwords");

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  app.options('*', cors(corsOptions));
  
  app.use(cors(corsOptions));
  
  
  app.use(cors());

// Add Password
app.post("/addpassword", async (req, res) => {
    let product = new Passwords(req.body);
    const result = await product.save();
    res.send(result);
  });

// Get all passwords
app.get('/getallpasswords', async(req, res) => {
  const passwords = await Passwords.find();
  if (passwords.length > 0) res.send(passwords);
  else res.send({ result: "No product found" });
});

// Delete all passwords
app.delete("/deletepassword/:id", async (req, res) => {
    const passwordDeleted = await Passwords.deleteOne({ _id: req.params.id });
    res.send(passwordDeleted);
  });

app.listen(port, () => {
    console.log(`Backend app listening on port ${port}`)
})