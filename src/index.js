const express = require("express");
const amqplib = require("amqplib");
const { EmailService } = require("./services")

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");

async function connectQueue() {
    try {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = connection.createChannel();
        (await channel).assertQueue("notification-queue");
        (await channel).consume("notification-queue", async (data) => {
            console.log(`${Buffer.from(data.content)}`);
            const obj = JSON.parse(`${Buffer.from(data.content)}`);
            await EmailService.sendEmail("supercell27march@gmail.com", obj.recipientEmail, obj.subject, obj.text);
            (await channel).ack(data);
        });
    } catch (error) {
        console.log(error);
    }
}


const app = express();

// app.use() is going to register a middleware for all the upcoming routes that are mentioned below it.

// By default ExpressJS does not know how to read the req.body, we need to mention ExpressJS that in the incoming request, if there is a `req.body` read it like a JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// whenever we get a url that starts with /api will redirect all request to apiRoutes
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Server is up and running on PORT ${ServerConfig.PORT}`);
    await connectQueue();
    console.log("Queue connected");
});

