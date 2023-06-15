const { TicketRepository } = require("../repositories");
const { Mailer } = require("../config");

const ticketRepository = new TicketRepository();

async function sendEmail(mailFrom, mailTo, subject, text) {
    try {
        const response = await Mailer.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: subject,
            text: text
        });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createTicket(data) {
    try {
        const ticket = await ticketRepository.create(data);
        return ticket
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getPendingEmails() {
    try {
        const response = await ticketRepository.getPendingTickets();
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    sendEmail,
    createTicket,
    getPendingEmails
}