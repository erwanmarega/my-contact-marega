const express = require("express");
const bodyParser = require("body-parser");   
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./database/db");

const port = process.env.PORT || 3000;
const cors = require("cors");
const app = express();
const auth = require("./routes/routes");
const contactTable = require("./routes/contact_table");
const loginRoutes = require("./routes/loginRoutes");
const signupRoutes = require("./routes/signupRoutes");
const userRoutes = require("./routes/userRoutes");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", auth);
app.use("/api", contactTable);
app.use("/api", loginRoutes);
app.use ("/api", signupRoutes);
app.use("/api/user", userRoutes);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for the project",
    },
    servers: [
      {
        url: `http://localhost:${port}/api`,
      },
    ],
  },
  apis: ["./routes/contact_table.js", "./index.js" , "./routes/loginRoutes.js" , "./routes/signupRoutes.js"],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.listen(port, () => {
  console.log(` Application à l'écoute sur le port ${port}!`);
});


app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello Swagger!" });
});


/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Retourne un message de bienvenue
 *     tags: [Hello]
 *     responses:
 *       200:
 *         description: Message de bienvenue
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello Swagger!
 */
