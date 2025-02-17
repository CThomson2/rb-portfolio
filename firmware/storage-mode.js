const { SerialPort, ReadlineParser } = require("serialport");
const fs = require("fs");
const axios = require("axios");

// Configuration
// const API_ENDPOINT = "http://localhost:3000/api/barcodes/scan"; // Replace with your actual Next.js API endpoint

console.log("Starting serial port setup...");

// Set up the serial port
const port = new SerialPort({
  path: "/dev/tty.usbmodem__Q21", // Replace with your actual port
  baudRate: 9600,
});

console.log("Serial port created");

const parser = port.pipe(new ReadlineParser({ delimiter: "\r" }));

console.log("Parser created");

// Store scanned data in a variable
let lastScan = null;

// async function sendDataToAPI(data) {
//   try {
//     const response = await axios.post(API_ENDPOINT, {
//       barcode: data,
//       timestamp: new Date().toISOString(),
//     });
//     console.log("Successfully sent to API:", response.status);
//   } catch (error) {
//     console.error("Error sending to API:", API_ENDPOINT, error.message);
//   }
// }

console.log(`\n\n### SCANNER RANGE TEST ###\n\n`); // Log it to the console
parser.on("data", async (data) => {
  // console.log("Received raw data:", data);

  lastScan = data.trim(); // Store the scanned data
  //   console.log(`Scanned Data (trimmed): ${lastScan}`); // Log it to the console

  let message = "";

  // Check the ending of the lastScan string
  if (lastScan.endsWith("48")) {
    message = "Office - success";
  } else if (lastScan.endsWith("49")) {
    message = "Front door - success";
  } else if (lastScan.endsWith("50")) {
    message = "OS 'Bund' - success";
  } else if (lastScan.endsWith("51")) {
    message = "OS Main Lab - success";
  } else if (lastScan.endsWith("56")) {
    message = "OS CS2 Lab - success";
  } else if (lastScan.endsWith("57")) {
    message = "NS Gate - success";
  } else {
    message = lastScan;
  }

  // Append the scanned data and message to stored-data.txt with a newline
  fs.appendFile("stored-data.txt", `${message}\n\n`, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log(`${message}\n\n`);
    }
  });
});

// Handle errors
port.on("error", (err) => {
  console.error("Serial Port Error:", err);
});

// Log when port opens successfully
port.on("open", () => {
  console.log("Serial port opened successfully");
});

// Add more error handlers
parser.on("error", (err) => {
  console.error("Parser Error:", err);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
