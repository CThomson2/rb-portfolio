const { SerialPort, ReadlineParser } = require("serialport");
const fs = require("fs");
const axios = require("axios");

// Configuration
const API_ENDPOINT = "http://localhost:3000/api/barcodes/scan"; // Replace with your actual Next.js API endpoint

console.log("Starting serial port setup...");

// Set up the serial port
const port = new SerialPort({
  path: "/dev/tty.usbserial-240", // Replace with your actual port
  baudRate: 9600,
});

console.log("Serial port created");

const parser = port.pipe(new ReadlineParser({ delimiter: "\r" }));

console.log("Parser created");

// Store scanned data in a variable
let lastScan = null;

async function sendDataToAPI(data) {
  try {
    const response = await axios.post(API_ENDPOINT, {
      barcode: data,
      timestamp: new Date().toISOString(),
    });
    console.log("Successfully sent to API:", response.status);
  } catch (error) {
    console.error("Error sending to API:", API_ENDPOINT, error.message);
  }
}

parser.on("data", async (data) => {
  // console.log("Received raw data:", data);

  lastScan = data.trim(); // Store the scanned data
  console.log(`Scanned Data (trimmed): ${lastScan}`); // Log it to the console

  // Send to API
  //   await sendDataToAPI(lastScan);

  // Append the scanned data to output.txt with a newline
  fs.appendFile("caldic.txt", lastScan + "\n", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Successfully wrote to file");
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
