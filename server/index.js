const express = require("express");
const app = express();


const database = require("./config/database");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const solarRoutes = require("./routes/solarRoutes");

dotenv.config();
const PORT = process.env.PORT || 3000;

//database connect
database.connect();
//middlewares
app.use(cookieParser());
app.use(express.json());

app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

app.use("/api/v1",solarRoutes);


//def route

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})
