// Carrier detection and tracking URL mapping
export interface CarrierInfo {
  name: string;
  code: string;
  trackingUrl: string;
  logo?: string;
}

export const CARRIERS: Record<string, CarrierInfo> = {
  // Major Container Lines
  MAEU: {
    name: "Maersk Line",
    code: "MAEU",
    trackingUrl: "https://www.maersk.com/tracking/",
  },
  MSCU: {
    name: "Mediterranean Shipping Company (MSC)",
    code: "MSCU",
    trackingUrl: "https://www.msc.com/track-a-shipment",
  },
  MSBU: {
    name: "MSC",
    code: "MSBU",
    trackingUrl: "https://www.msc.com/track-a-shipment",
  },
  MSNU: {
    name: "MSC",
    code: "MSNU",
    trackingUrl: "https://www.msc.com/track-a-shipment",
  },
  CMAU: {
    name: "CMA CGM",
    code: "CMAU",
    trackingUrl: "https://www.cma-cgm.com/ebusiness/tracking/",
  },
  HLCU: {
    name: "Hapag-Lloyd",
    code: "HLCU",
    trackingUrl:
      "https://www.hapag-lloyd.com/en/online-business/track/track-by-container.html?container=",
  },
  OOLU: {
    name: "OOCL",
    code: "OOLU",
    trackingUrl:
      "https://www.oocl.com/eng/ourservices/eservices/cargotracking/Pages/cargotracking.aspx",
  },
  CXCU: {
    name: "COSCO Shipping",
    code: "CXCU",
    trackingUrl: "https://elines.coscoshipping.com/ebusiness/cargoTracking",
  },
  COSU: {
    name: "COSCO Shipping",
    code: "COSU",
    trackingUrl: "https://elines.coscoshipping.com/ebusiness/cargoTracking",
  },
  EGLV: {
    name: "Evergreen Line",
    code: "EGLV",
    trackingUrl: "https://www.shipmentlink.com/servlet/TDB1_CargoTracking.do",
  },
  EGHU: {
    name: "Evergreen Line",
    code: "EGHU",
    trackingUrl: "https://www.shipmentlink.com/servlet/TDB1_CargoTracking.do",
  },
  YMLU: {
    name: "Yang Ming",
    code: "YMLU",
    trackingUrl:
      "https://www.yangming.com/e-service/track_trace/track_trace_cargo_tracking.aspx",
  },
  ONEY: {
    name: "Ocean Network Express (ONE)",
    code: "ONEY",
    trackingUrl: "https://ecomm.one-line.com/ecom/CUP_HOM_3301.do",
  },
  ZIMU: {
    name: "ZIM",
    code: "ZIMU",
    trackingUrl: "https://www.zim.com/tools/track-a-shipment",
  },
  HDMU: {
    name: "Hyundai Merchant Marine (HMM)",
    code: "HDMU",
    trackingUrl: "https://www.hmm21.com/e-service/track/trackDetail.do",
  },
  PCIU: {
    name: "Pacific International Lines (PIL)",
    code: "PCIU",
    trackingUrl: "https://www.pilship.com/en--/120.html",
  },
  WHLC: {
    name: "Wan Hai Lines",
    code: "WHLC",
    trackingUrl: "https://www.wanhai.com/views/cargoTrack/CargoTrack.xhtml",
  },
  SEAU: {
    name: "SeaLand",
    code: "SEAU",
    trackingUrl: "https://www.sealandmaersk.com/tracking/",
  },
  APLU: {
    name: "APL",
    code: "APLU",
    trackingUrl: "https://www.apl.com/ebusiness/tracking",
  },
  APZU: {
    name: "APL",
    code: "APZU",
    trackingUrl: "https://www.apl.com/ebusiness/tracking",
  },
  MOLU: {
    name: "Mitsui O.S.K. Lines (MOL)",
    code: "MOLU",
    trackingUrl: "https://www.molpower.com/apps/tracking",
  },
  NYKU: {
    name: "NYK Line",
    code: "NYKU",
    trackingUrl: "https://www2.nykline.com/eservice/tracking/",
  },
  KKLU: {
    name: "K Line",
    code: "KKLU",
    trackingUrl: "https://www.kline.com/en/service/cargo-tracking",
  },
  TEMU: {
    name: "Turkon Line",
    code: "TEMU",
    trackingUrl: "https://www.turkon.com/en/cargo-tracking",
  },
  ARKU: {
    name: "Arkas Line",
    code: "ARKU",
    trackingUrl: "https://www.arkasline.com.tr/cargo-tracking",
  },
  UASC: {
    name: "UASC",
    code: "UASC",
    trackingUrl:
      "https://www.hapag-lloyd.com/en/online-business/track/track-by-container.html?container=",
  },
  SAFM: {
    name: "Safmarine",
    code: "SAFM",
    trackingUrl: "https://www.safmarine.com/tracking/",
  },
  TCLU: {
    name: "Transcontainer",
    code: "TCLU",
    trackingUrl: "https://www.trcont.com/en/services/tracking/",
  },
  SUDU: {
    name: "Hamburg Süd",
    code: "SUDU",
    trackingUrl:
      "https://www.hamburgsud-line.com/liner/en/liner_services/ecommerce/track_trace/index.html",
  },
  ACLU: {
    name: "Atlantic Container Line",
    code: "ACLU",
    trackingUrl: "https://www.aclcargo.com/tools/cargo-tracking/",
  },
  GESU: {
    name: "Gold Star Line",
    code: "GESU",
    trackingUrl: "https://www.goldstarline.com/tracking",
  },
  TTNU: {
    name: "Triton Container",
    code: "TTNU",
    trackingUrl: "https://www.triton-container.com/",
  },
  TRIU: {
    name: "Triton Container",
    code: "TRIU",
    trackingUrl: "https://www.triton-container.com/",
  },
  TEXU: {
    name: "Textainer",
    code: "TEXU",
    trackingUrl: "https://www.textainer.com/",
  },
  CAIU: {
    name: "CAI International",
    code: "CAIU",
    trackingUrl: "https://www.caplogistics.com/",
  },
  GLDU: {
    name: "Beacon Intermodal Leasing",
    code: "GLDU",
    trackingUrl: "https://www.beaconintermodal.com/",
  },
  BEAU: {
    name: "Beacon Intermodal Leasing",
    code: "BEAU",
    trackingUrl: "https://www.beaconintermodal.com/",
  },
  FCIU: {
    name: "Florens Container",
    code: "FCIU",
    trackingUrl: "https://www.florens.com/",
  },
  UNIU: {
    name: "Unifeeder",
    code: "UNIU",
    trackingUrl: "https://www.unifeeder.com/tracking",
  },
  BMOU: {
    name: "Blue Anchor Line",
    code: "BMOU",
    trackingUrl: "https://www.blueanchorline.com/",
  },
  SMLU: {
    name: "Samskip",
    code: "SMLU",
    trackingUrl: "https://www.samskip.com/track-trace/",
  },
  CRXU: {
    name: "Crowley Maritime",
    code: "CRXU",
    trackingUrl:
      "https://www.crowley.com/services/shipping-logistics/cargo-tracking/",
  },
  TOLU: {
    name: "Tote Maritime",
    code: "TOLU",
    trackingUrl: "https://www.totemaritime.com/track-shipment/",
  },
  MSKU: {
    name: "Matson",
    code: "MSKU",
    trackingUrl: "https://www.matson.com/shipment-tracking.html",
  },
  PONU: {
    name: "Pasha Hawaii",
    code: "PONU",
    trackingUrl: "https://www.pashahawaii.com/track/",
  },
  SEGU: {
    name: "SeaCube Container Leasing",
    code: "SEGU",
    trackingUrl: "https://www.seacubecontainers.com/",
  },
  DRYU: {
    name: "Dry Van",
    code: "DRYU",
    trackingUrl: "https://www.searates.com/container/tracking/",
  },
  INBU: {
    name: "InBev Container",
    code: "INBU",
    trackingUrl: "https://www.searates.com/container/tracking/",
  },
};

/**
 * Detect carrier from container number
 * Container numbers follow ISO 6346 format: AAAA1234567
 * First 4 letters identify the owner/carrier
 */
export function detectCarrier(containerNumber: string): CarrierInfo | null {
  if (!containerNumber || containerNumber.length < 4) {
    return null;
  }

  const prefix = containerNumber.substring(0, 4).toUpperCase();

  // Return known carrier if found
  if (CARRIERS[prefix]) {
    return CARRIERS[prefix];
  }

  // Fallback: Create a generic carrier entry for unknown prefixes
  return {
    name: `${prefix} Carrier`,
    code: prefix,
    trackingUrl: `https://www.searates.com/container/tracking/?container=${containerNumber}`,
  };
}

/**
 * Get tracking URL for a specific container
 */
export function getCarrierTrackingUrl(containerNumber: string): string | null {
  const carrier = detectCarrier(containerNumber);
  if (!carrier) return null;

  // Some carriers support direct container number in URL
  if (
    carrier.code === "HLCU" ||
    carrier.code === "MAEU" ||
    carrier.code === "SEAU" ||
    carrier.code === "SAFM" ||
    carrier.code === "UASC" ||
    carrier.code === "APZU" ||
    carrier.code === "APLU"
  ) {
    return carrier.trackingUrl + containerNumber;
  }

  return carrier.trackingUrl;
}
