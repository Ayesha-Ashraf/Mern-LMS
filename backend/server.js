const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const nodemailer = require('nodemailer');
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require('cors');
const path = require('path');




// import routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/userRoutes');
const courseTypeRoute = require('./routes/coursesTypeRoutes');
const courseRoute = require('./routes/coursesRoutes');

const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

//database connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

//MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
  limit: "5mb",
  extended: true
}));
app.use(cookieParser());
app.use(cors());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  // Your SMTP configuration here (e.g., host, port, secure, auth)
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "ayeshaashraf.bcs030@gmail.com",
    pass: "yuhbccnduausgqab",
  },
});

// Route to handle sending email
app.post('/api/send-email', async (req, res) => {
  const { email, firstName, lastName } = req.body;

  try {
      // Send email
      await transporter.sendMail({
          from: '"THE LEARNING HUB" <ayeshaashraf.bcs030@gmail.com>',
          to: email,
          subject: 'Latest Course Updates',
          html: `<p>Dear ${firstName} ${lastName},</p><p>Here are the latest updates regarding our courses..<br/>Last date to register the course is 15-May-2024...So Asap register te courses until the course limited seats full..</p>`
      });

      res.status(200).send('Email sent successfully!');
  } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Failed to send email. Please try again later.');
  }
});
//ROUTES MIDDLEWARE
// app.get('/', (req, res) => {
//     res.send("Hello from Node Js");
// })
app.use('/api', authRoutes);
app.use('/api', studentRoutes);
app.use('/api', courseTypeRoute);
app.use('/api', courseRoute);

__dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

// error middleware
app.use(errorHandler);

//port
const port = process.env.PORT || 9000

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});