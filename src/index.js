const express = require("express");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");

const app = express();

// whenever we get a url that starts with /api will redirect all request to apiRoutes
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Server is up and running on PORT ${ServerConfig.PORT}`);
});

