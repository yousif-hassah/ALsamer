// Airline detection and tracking URL mapping
export interface AirlineInfo {
  name: string;
  code: string;
  trackingUrl: string;
  logo?: string;
}

export const AIRLINES: Record<string, AirlineInfo> = {
  // Major Airlines with Cargo Divisions (IATA codes)
  // Note: These are AIR CARGO tracking URLs, not passenger flight tracking

  // Middle East & Gulf Carriers
  EK: {
    name: "Emirates SkyCargo",
    code: "EK",
    trackingUrl: "https://www.skycargo.com/english/track-shipment/",
  },
  QR: {
    name: "Qatar Airways Cargo",
    code: "QR",
    trackingUrl: "https://cargo.qatarairways.com/track-shipment",
  },
  EY: {
    name: "Etihad Cargo",
    code: "EY",
    trackingUrl: "https://www.etihadcargo.com/en/track-shipment/",
  },
  SV: {
    name: "Saudia Cargo",
    code: "SV",
    trackingUrl: "https://www.saudiacargo.com/track-shipment",
  },
  MS: {
    name: "EgyptAir Cargo",
    code: "MS",
    trackingUrl: "https://cargo.egyptair.com/track",
  },
  TK: {
    name: "Turkish Cargo",
    code: "TK",
    trackingUrl: "https://cargo.turkishairlines.com/en/track-shipment",
  },
  RJ: {
    name: "Royal Jordanian Cargo",
    code: "RJ",
    trackingUrl: "https://cargo.rj.com/track",
  },
  ME: {
    name: "MEA Cargo",
    code: "ME",
    trackingUrl: "https://www.mea.com.lb/english/cargo/track-shipment",
  },
  GF: {
    name: "Gulf Air Cargo",
    code: "GF",
    trackingUrl: "https://www.gulfair.com/cargo/track-shipment",
  },
  WY: {
    name: "Oman Air Cargo",
    code: "WY",
    trackingUrl: "https://www.omanair.com/en/cargo/track-shipment",
  },
  KU: {
    name: "Kuwait Airways Cargo",
    code: "KU",
    trackingUrl: "https://www.kuwaitairways.com/en/cargo/track",
  },

  // US Carriers
  AA: {
    name: "American Airlines Cargo",
    code: "AA",
    trackingUrl: "https://www.aacargo.com/track-shipment.html",
  },
  DL: {
    name: "Delta Cargo",
    code: "DL",
    trackingUrl: "https://www.deltacargo.com/track-shipment",
  },
  UA: {
    name: "United Cargo",
    code: "UA",
    trackingUrl: "https://www.unitedcargo.com/track-shipment",
  },

  // European Carriers
  BA: {
    name: "British Airways World Cargo",
    code: "BA",
    trackingUrl: "https://www.iagcargo.com/en/track-shipment",
  },
  AF: {
    name: "Air France KLM Cargo",
    code: "AF",
    trackingUrl: "https://www.afklcargo.com/WW/en/common/tools/track_trace.jsp",
  },
  LH: {
    name: "Lufthansa Cargo",
    code: "LH",
    trackingUrl: "https://www.lufthansa-cargo.com/track-shipment",
  },
  LX: {
    name: "Swiss WorldCargo",
    code: "LX",
    trackingUrl: "https://www.swissworldcargo.com/track-shipment",
  },
  KL: {
    name: "Air France KLM Cargo",
    code: "KL",
    trackingUrl: "https://www.afklcargo.com/WW/en/common/tools/track_trace.jsp",
  },
  IB: {
    name: "Iberia Cargo",
    code: "IB",
    trackingUrl: "https://www.iagcargo.com/en/track-shipment",
  },
  AY: {
    name: "Finnair Cargo",
    code: "AY",
    trackingUrl: "https://www.finnaircargo.com/track-shipment",
  },
  SK: {
    name: "SAS Cargo",
    code: "SK",
    trackingUrl: "https://www.sascargo.com/track-shipment",
  },

  // Asian Carriers
  SQ: {
    name: "Singapore Airlines Cargo",
    code: "SQ",
    trackingUrl: "https://www.siacargo.com/track-shipment",
  },
  CX: {
    name: "Cathay Pacific Cargo",
    code: "CX",
    trackingUrl: "https://www.cathaypacificcargo.com/track-shipment",
  },
  NH: {
    name: "ANA Cargo",
    code: "NH",
    trackingUrl: "https://www.anacargo.jp/en/track-shipment/",
  },
  JL: {
    name: "JAL Cargo",
    code: "JL",
    trackingUrl: "https://www.jal.com/en/jalcargo/track/",
  },
  KE: {
    name: "Korean Air Cargo",
    code: "KE",
    trackingUrl: "https://cargo.koreanair.com/track-shipment",
  },
  OZ: {
    name: "Asiana Cargo",
    code: "OZ",
    trackingUrl: "https://cargo.flyasiana.com/track",
  },
  CA: {
    name: "Air China Cargo",
    code: "CA",
    trackingUrl: "https://www.airchina.us/cargo/track-shipment",
  },
  MU: {
    name: "China Eastern Cargo",
    code: "MU",
    trackingUrl: "https://cargo.ceair.com/track",
  },
  CZ: {
    name: "China Southern Cargo",
    code: "CZ",
    trackingUrl: "https://www.cscargo.com/track-shipment",
  },

  // Oceania
  QF: {
    name: "Qantas Freight",
    code: "QF",
    trackingUrl: "https://www.qantasfreight.com/track-shipment",
  },
  NZ: {
    name: "Air New Zealand Cargo",
    code: "NZ",
    trackingUrl: "https://www.airnzcargo.co.nz/track-shipment",
  },

  // Other Major Carriers
  AC: {
    name: "Air Canada Cargo",
    code: "AC",
    trackingUrl: "https://www.aircanadacargo.com/track-shipment",
  },
  AI: {
    name: "Air India Cargo",
    code: "AI",
    trackingUrl: "https://www.airindia.com/cargo/track-shipment.html",
  },

  // Dedicated Cargo Airlines
  "5X": {
    name: "UPS Airlines",
    code: "5X",
    trackingUrl: "https://www.ups.com/track",
  },
  FX: {
    name: "FedEx Express",
    code: "FX",
    trackingUrl: "https://www.fedex.com/en/tracking.html",
  },
  "7L": {
    name: "Silk Way West Airlines",
    code: "7L",
    trackingUrl: "https://www.silkwaywest.com/track-shipment",
  },
  CV: {
    name: "Cargolux",
    code: "CV",
    trackingUrl: "https://www.cargolux.com/track-shipment",
  },
  CK: {
    name: "Kalitta Air",
    code: "CK",
    trackingUrl: "https://www.kalittaair.com/track-shipment",
  },

  // Latin America
  LA: {
    name: "LATAM Cargo",
    code: "LA",
    trackingUrl: "https://www.latamcargo.com/en/track-shipment",
  },
  AM: {
    name: "Aeromexico Cargo",
    code: "AM",
    trackingUrl: "https://cargo.aeromexico.com/track",
  },

  // Africa
  SA: {
    name: "South African Airways Cargo",
    code: "SA",
    trackingUrl: "https://www.flysaa.com/cargo/track-shipment",
  },
  ET: {
    name: "Ethiopian Cargo",
    code: "ET",
    trackingUrl: "https://cargo.ethiopianairlines.com/track",
  },
  AT: {
    name: "Royal Air Maroc Cargo",
    code: "AT",
    trackingUrl: "https://www.royalairmaroc.com/cargo/track-shipment",
  },
};

/**
 * Detect airline from flight number or AWB prefix
 * Flight numbers typically follow format: AA1234 (2-3 letter code + numbers)
 * AWB prefix: 3-digit airline code (e.g., 176 for Emirates)
 */
export function detectAirline(flightNumber: string): AirlineInfo | null {
  if (!flightNumber || flightNumber.length < 2) {
    return null;
  }

  // Try to extract airline code (first 2-3 letters for flight numbers)
  const match = flightNumber.match(/^([A-Z]{2,3})/i);
  if (match) {
    const code = match[1].toUpperCase();

    // Return known airline if found
    if (AIRLINES[code]) {
      return AIRLINES[code];
    }
  }

  // Fallback: Create a generic airline entry for unknown codes
  // Use Track-Trace.com which supports 200+ airlines
  const genericCode = flightNumber.substring(0, 2).toUpperCase();
  return {
    name: `${genericCode} Cargo`,
    code: genericCode,
    trackingUrl: `https://www.track-trace.com/aircargo`,
  };
}

/**
 * Get tracking URL for a specific flight/AWB
 */
export function getAirlineTrackingUrl(flightNumber: string): string | null {
  const airline = detectAirline(flightNumber);
  if (!airline) return null;

  return airline.trackingUrl;
}
