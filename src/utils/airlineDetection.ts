// Airline detection and tracking URL mapping
export interface AirlineInfo {
  name: string;
  code: string;
  trackingUrl: string;
  logo?: string;
}

export const AIRLINES: Record<string, AirlineInfo> = {
  // Major Airlines (IATA codes)
  AA: {
    name: "American Airlines",
    code: "AA",
    trackingUrl: "https://www.aa.com/reservation/flightTracking",
  },
  DL: {
    name: "Delta Air Lines",
    code: "DL",
    trackingUrl: "https://www.delta.com/flight-status",
  },
  UA: {
    name: "United Airlines",
    code: "UA",
    trackingUrl: "https://www.united.com/en/us/flight-status",
  },
  BA: {
    name: "British Airways",
    code: "BA",
    trackingUrl: "https://www.britishairways.com/travel/flight-tracker",
  },
  AF: {
    name: "Air France",
    code: "AF",
    trackingUrl: "https://www.airfrance.com/flight-status",
  },
  LH: {
    name: "Lufthansa",
    code: "LH",
    trackingUrl: "https://www.lufthansa.com/flight-status",
  },
  EK: {
    name: "Emirates",
    code: "EK",
    trackingUrl:
      "https://www.emirates.com/english/manage-booking/flight-status.aspx",
  },
  QR: {
    name: "Qatar Airways",
    code: "QR",
    trackingUrl: "https://www.qatarairways.com/en/flight-status.html",
  },
  EY: {
    name: "Etihad Airways",
    code: "EY",
    trackingUrl: "https://www.etihad.com/en/manage/flight-status",
  },
  SV: {
    name: "Saudia",
    code: "SV",
    trackingUrl: "https://www.saudia.com/flight-status",
  },
  MS: {
    name: "EgyptAir",
    code: "MS",
    trackingUrl: "https://www.egyptair.com/en/fly/flight-status",
  },
  TK: {
    name: "Turkish Airlines",
    code: "TK",
    trackingUrl:
      "https://www.turkishairlines.com/en-int/flights/flight-status/",
  },
  SQ: {
    name: "Singapore Airlines",
    code: "SQ",
    trackingUrl:
      "https://www.singaporeair.com/en_UK/plan-and-book/flight-status/",
  },
  CX: {
    name: "Cathay Pacific",
    code: "CX",
    trackingUrl:
      "https://www.cathaypacific.com/cx/en_US/travel-information/flying-with-us/flight-status.html",
  },
  NH: {
    name: "All Nippon Airways (ANA)",
    code: "NH",
    trackingUrl: "https://www.ana.co.jp/en/us/flight-status/",
  },
  JL: {
    name: "Japan Airlines (JAL)",
    code: "JL",
    trackingUrl: "https://www.jal.co.jp/en/flight-status/",
  },
  KE: {
    name: "Korean Air",
    code: "KE",
    trackingUrl:
      "https://www.koreanair.com/global/en/booking/flight-status.html",
  },
  OZ: {
    name: "Asiana Airlines",
    code: "OZ",
    trackingUrl: "https://flyasiana.com/C/US/EN/contents/flight-status",
  },
  CA: {
    name: "Air China",
    code: "CA",
    trackingUrl:
      "https://www.airchina.us/US/GB/info/flight-info/flight-status/",
  },
  MU: {
    name: "China Eastern",
    code: "MU",
    trackingUrl: "https://us.ceair.com/en/flight-status/",
  },
  CZ: {
    name: "China Southern",
    code: "CZ",
    trackingUrl:
      "https://www.csair.com/en/tourguide/flight_service/flight_status/",
  },
  QF: {
    name: "Qantas",
    code: "QF",
    trackingUrl: "https://www.qantas.com/us/en/flight-status.html",
  },
  NZ: {
    name: "Air New Zealand",
    code: "NZ",
    trackingUrl: "https://www.airnewzealand.com/flight-status",
  },
  AC: {
    name: "Air Canada",
    code: "AC",
    trackingUrl:
      "https://www.aircanada.com/ca/en/aco/home/book/flight-status.html",
  },
  LX: {
    name: "Swiss International Air Lines",
    code: "LX",
    trackingUrl:
      "https://www.swiss.com/us/en/prepare/flight-information/flight-status",
  },
  OS: {
    name: "Austrian Airlines",
    code: "OS",
    trackingUrl: "https://www.austrian.com/us/en/flight-status",
  },
  AZ: {
    name: "ITA Airways",
    code: "AZ",
    trackingUrl: "https://www.ita-airways.com/en_us/fly-ita/flight-status.html",
  },
  KL: {
    name: "KLM Royal Dutch Airlines",
    code: "KL",
    trackingUrl:
      "https://www.klm.com/information/flight-information/flight-status",
  },
  IB: {
    name: "Iberia",
    code: "IB",
    trackingUrl: "https://www.iberia.com/us/flight-status/",
  },
  AY: {
    name: "Finnair",
    code: "AY",
    trackingUrl: "https://www.finnair.com/en/flight-status",
  },
  SK: {
    name: "SAS Scandinavian Airlines",
    code: "SK",
    trackingUrl: "https://www.flysas.com/en/flight-status/",
  },
  TP: {
    name: "TAP Air Portugal",
    code: "TP",
    trackingUrl: "https://www.flytap.com/en-us/flight-status",
  },
  RJ: {
    name: "Royal Jordanian",
    code: "RJ",
    trackingUrl: "https://www.rj.com/en/info-and-tips/flight-status",
  },
  ME: {
    name: "Middle East Airlines",
    code: "ME",
    trackingUrl: "https://www.mea.com.lb/english/flight-status",
  },
  GF: {
    name: "Gulf Air",
    code: "GF",
    trackingUrl: "https://www.gulfair.com/flight-status",
  },
  WY: {
    name: "Oman Air",
    code: "WY",
    trackingUrl: "https://www.omanair.com/en/flight-status",
  },
  KU: {
    name: "Kuwait Airways",
    code: "KU",
    trackingUrl: "https://www.kuwaitairways.com/en/flight-status",
  },
  FZ: {
    name: "flydubai",
    code: "FZ",
    trackingUrl: "https://www.flydubai.com/en/plan/flight-status/",
  },
  XY: {
    name: "flynas",
    code: "XY",
    trackingUrl: "https://www.flynas.com/en/flight-status",
  },
  AT: {
    name: "Royal Air Maroc",
    code: "AT",
    trackingUrl: "https://www.royalairmaroc.com/int-en/flight-status",
  },
  UX: {
    name: "Air Europa",
    code: "UX",
    trackingUrl: "https://www.aireuropa.com/en/flights/flight-status",
  },
  VY: {
    name: "Vueling",
    code: "VY",
    trackingUrl:
      "https://www.vueling.com/en/vueling-services/prepare-your-trip/flight-status",
  },
  FR: {
    name: "Ryanair",
    code: "FR",
    trackingUrl: "https://www.ryanair.com/gb/en/check-in/flight-tracker",
  },
  U2: {
    name: "easyJet",
    code: "U2",
    trackingUrl: "https://www.easyjet.com/en/flight-tracker",
  },
  W6: {
    name: "Wizz Air",
    code: "W6",
    trackingUrl:
      "https://wizzair.com/en-gb/information-and-services/wizz-services/flight-status",
  },
};

/**
 * Detect airline from flight number
 * Flight numbers typically follow format: AA1234 (2-3 letter code + numbers)
 */
export function detectAirline(flightNumber: string): AirlineInfo | null {
  if (!flightNumber || flightNumber.length < 3) {
    return null;
  }

  // Extract airline code (first 2-3 letters)
  const match = flightNumber.match(/^([A-Z]{2,3})/i);
  if (!match) return null;

  const code = match[1].toUpperCase();

  // Return known airline if found
  if (AIRLINES[code]) {
    return AIRLINES[code];
  }

  // Fallback: Create a generic airline entry for unknown codes
  return {
    name: `${code} Airlines`,
    code: code,
    trackingUrl: `https://www.flightstats.com/v2/flight-tracker/${flightNumber}`,
  };
}

/**
 * Get tracking URL for a specific flight
 */
export function getAirlineTrackingUrl(flightNumber: string): string | null {
  const airline = detectAirline(flightNumber);
  if (!airline) return null;

  return airline.trackingUrl;
}
