const express = require("express");

const { ServerConfig, EmailConfig } = require("./config");
const apiRoutes = require("./routes");

const app = express();

// app.use() is going to register a middleware for all the upcoming routes that are mentioned below it.

// By default ExpressJS does not know how to read the req.body, we need to mention ExpressJS that in the incoming request, if there is a `req.body` read it like a JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// whenever we get a url that starts with /api will redirect all request to apiRoutes
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Server is up and running on PORT ${ServerConfig.PORT}`);
    try {
        const response = await EmailConfig.sendMail({
            from: ServerConfig.GMAIL_EMAIL,
            to: "arunrawatar404@gmail.com",
            subject: "Checking the service again",
            text: "Yes it is working"
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }

});

