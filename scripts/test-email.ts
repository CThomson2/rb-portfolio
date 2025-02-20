/**
 * Test script for verifying SMTP email configuration and sending test emails.
 *
 * Required environment variables:
 * - SMTP_HOST: SMTP server hostname
 *  i) Outlook: smtp-mail.outlook.com
 *  ii) Gmail: smtp.gmail.com
 * - SMTP_PORT: SMTP server port (defaults to 587 for TLS (recommended) or 465 for SSL)
 * - SMTP_USER: SMTP authentication username (generally the same as sender email address)
 * - SMTP_PASSWORD: SMTP authentication password (sender email password | App password for gmail)
 * - SMTP_FROM: Sender email address
 * - ORDER_NOTIFICATION_EMAIL: Recipient email address for test message (can be any email address and domain, including the sender's address)
 *
 * Usage:
 * ```
 * ts-node scripts/test-email.ts
 * ```
 */

import nodemailer from "nodemailer";

/**
 * Tests SMTP email configuration by:
 * 1. Creating a nodemailer transport with the configured settings
 * 2. Verifying the SMTP connection
 * 3. Sending a test email
 */
async function testEmail() {
  console.log("Creating test SMTP transporter...");

  // Initialize nodemailer transport with SMTP settings
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // Use STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    requireTLS: true,
    tls: {
      minVersion: "TLSv1.2", // Enforce minimum TLS version for security
    },
  });

  console.log("Testing SMTP connection...");

  try {
    // Verify SMTP connection
    await transporter.verify();
    console.log("SMTP connection successful!");

    // Send test email
    console.log("Attempting to send test email...");
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ORDER_NOTIFICATION_EMAIL,
      subject: "Test Email",
      text: "If you receive this email, the SMTP configuration is working correctly.",
    });

    console.log("Test email sent successfully!");
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Execute the test
testEmail();
