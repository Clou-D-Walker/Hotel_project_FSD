import nodemailer from "nodemailer";

// Create a transporter for sending emails (using Gmail in this example)
const transporter = nodemailer.createTransport({
    service: "gmail", // Change this if you're using a different service
    auth: {
        user: "helpcustomer569@gmail.com", // Your email
        pass: "senq zamd wpjq cwbj",  // Your email password or app password (if using Gmail)
    },
});

// Function to send email notification
const sendEmailNotification = async (workerEmail, roomId,desc) => {
    const mailOptions = {
        from: "helpcustomer569@gmail.com", // Sender address
        to: workerEmail, // Receiver address
        subject: "Room Assignment Notification", // Email subject
        text: `Hello, You have been assigned to clean room with ID: ${roomId} : ${desc}. Please complete the task as soon as possible.`, // Email content
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export default sendEmailNotification;
