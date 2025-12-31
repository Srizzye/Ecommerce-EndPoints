const express = require("express");
const app = express();
const helmet = require("helmet");
const dotenv = require("dotenv");
const connectDb = require("./Database/ConnectDB");
const { AuthenticateToken } = require("./Controllers/auth.js");
const AuthRoutes = require("./Routes/AuthRoutes.js");
const HomeRoutes = require("./Routes/HomeRoutes.js");
const UserRoutes = require("./Routes/UserRoutes.js");
const ProductRoutes = require("./Routes/ProductRoutes.js");
const cookies_parser = require("cookie-parser");
const addProducts = require("./addProduct.js");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
dotenv.config();
const PORT = process.env.PORT;
const swaggerDocument = YAML.load("./swagger.yaml");

app.use(express.json());
app.use(cookies_parser());
app.use(helmet());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

connectDb();

app.listen(PORT, () => console.log("Server Listening", PORT));
// addProducts();
app.use("/auth", AuthRoutes);
app.use("/user", AuthenticateToken, UserRoutes);
app.use("/home", AuthenticateToken, HomeRoutes);
app.use("/product", AuthenticateToken, ProductRoutes);
