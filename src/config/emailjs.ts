// EmailJS Configuration
// Get these values from https://www.emailjs.com/
// After creating a free account:
// 1. Create an Email Service (Gmail, Outlook, etc.)
// 2. Create an Email Template
// 3. Get your Public Key from Account page

// Option 1: Use environment variables (Recommended for production)
// Create a .env file and add your keys there
// Option 2: Replace the values below directly (for testing)

export const EMAILJS_CONFIG = {
  // Your EmailJS Public Key (from Account page)
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY_HERE",

  // Your EmailJS Service ID (from Email Services page)
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID_HERE",

  // Your EmailJS Template ID (from Email Templates page)
  TEMPLATE_ID:
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID_HERE",
};

// Template variables that will be sent:
// {{from_name}} - Sender's name
// {{from_email}} - Sender's email
// {{to_email}} - Recipient email
// {{message}} - The message content
