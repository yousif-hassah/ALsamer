/**
 * 📧 Contact Configuration for Al-Samer Logistics
 * Centralized place to manage all contact emails and phone numbers.
 */

export const CONTACT_CONFIG = {
  // The main verified email in Web3Forms.
  // IMPORTANT: When you change this, you must also update the ACCESS_KEY in web3forms.ts
  primaryEmail: "controlcode11@gmail.com",

  // List of emails shown in the contact section
  recipients: [
    {
      label: "controlcode11@gmail.com",
      value: "controlcode11@gmail.com",
    },
    { label: "win224149@gmail.com", value: "win224149@gmail.com" },
    { label: "ccc@gmail.com", value: "ccc@gmail.com" },
  ],

  // List of phone numbers/WhatsApp shown in the contact section
  phones: [
    { label: "07738828882", value: "9647738828882" },
    { label: "07803302859", value: "9647803302859" },
    { label: "0773 333 333", value: "964773333333" },
    { label: "07809588519", value: "9647809588519" },
  ],

  // Address (for labels)
  address:
    "Baghdad – Riyadh District – Near the Orthodox Swimming Pool, Block 908 – Alley 5 – Building 16",
};
