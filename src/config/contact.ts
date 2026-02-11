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
      label: "samer@alsamer-int.com",
      value: "samer@alsamer-int.com",
    },
    { label: "Haidar@alsamer-int.com", value: "Haidar@alsamer-int.com" },
    { label: "Hussain@alsamer-int.com", value: "Hussain@alsamer-int.com" },
    { label: "Aya@alsamer-int.com", value: "Aya@alsamer-int.com" },
  ],

  // List of phone numbers/WhatsApp shown in the contact section
  phones: [
    { label: "07738828882", value: "9647738828882" },
    { label: "07760300888", value: "9647760300888" },
    { label: "07905460036", value: "9647905460036" },
    { label: "07724000091", value: "9647724000091" },
  ],

  // Address (for labels)
  address:
    "Baghdad – Riyadh District – Near the Orthodox Swimming Pool, Block 908 – Alley 5 – Building 16",
};
