/**
 * Hybrid Container Tracking API - Multi-Source with Intelligent Fallback
 * Attempts to fetch real data from multiple free APIs before falling back to simulation
 * Sources: Terminal49, findTEU, Shipsgo, Web Scraping
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { trackingNumber } = req.query;

  if (!trackingNumber) {
    return res.status(400).json({ error: "Tracking number required" });
  }

  try {
    // Source 1: Try Terminal49 (Free for 100 containers)
    let containerData = await tryTerminal49(trackingNumber);
    let source = "terminal49";

    // Source 2: Try findTEU (Free for 10/month)
    if (!containerData) {
      containerData = await tryFindTEU(trackingNumber);
      source = "findteu";
    }

    // Source 3: Try Shipsgo (Unlimited free)
    if (!containerData) {
      containerData = await tryShipsgo(trackingNumber);
      source = "shipsgo";
    }

    // Source 4: Web scraping from carrier websites
    if (!containerData) {
      containerData = await tryWebScraping(trackingNumber);
      source = "webscrape";
    }

    // If we got container data, enhance it with real GPS coordinates from AIS
    if (containerData) {
      const vesselName = containerData.vessel_name;

      if (vesselName && vesselName !== "N/A") {
        console.log(`🚢 Fetching real GPS for vessel: ${vesselName}`);

        // Try to get real vessel position from AIS
        const vesselPosition = await getVesselPositionFromAIS(vesselName);

        if (vesselPosition) {
          containerData.latitude = vesselPosition.lat;
          containerData.longitude = vesselPosition.lng;
          containerData.speed = vesselPosition.speed;
          containerData.course = vesselPosition.course;
          containerData.ais_updated = vesselPosition.timestamp;
          source += "+AIS"; // Indicate we have real GPS data
          console.log(
            `✅ Real GPS found: ${vesselPosition.lat}, ${vesselPosition.lng}`,
          );
        }
      }

      return res.status(200).json({ code: 200, data: [containerData], source });
    }

    // All sources failed - return empty to trigger simulation
    return res
      .status(200)
      .json({ code: 404, data: [], message: "No data found" });
  } catch (error) {
    console.error("Tracking API Error:", error);
    return res
      .status(200)
      .json({ code: 404, data: [], message: "No data found" });
  }
}

// Terminal49 API (Free - 100 containers)
async function tryTerminal49(trackingNumber) {
  try {
    // Terminal49 requires registration - using public endpoint for now
    const response = await fetch(
      `https://api.terminal49.com/v2/containers/${trackingNumber}`,
      {
        headers: { Accept: "application/json" },
        timeout: 3000,
      },
    );
    if (response.ok) {
      const data = await response.json();
      return normalizeData(data, "terminal49");
    }
  } catch (e) {
    console.log("Terminal49 failed:", e.message);
  }
  return null;
}

// findTEU API (Free - 10/month, no credit card)
async function tryFindTEU(trackingNumber) {
  try {
    const response = await fetch(
      `https://api.findteu.com/track/${trackingNumber}`,
      {
        headers: { Accept: "application/json" },
        timeout: 3000,
      },
    );
    if (response.ok) {
      const data = await response.json();
      return normalizeData(data, "findteu");
    }
  } catch (e) {
    console.log("findTEU failed:", e.message);
  }
  return null;
}

// Shipsgo API (Unlimited free)
async function tryShipsgo(trackingNumber) {
  try {
    const response = await fetch(
      `https://api.shipsgo.com/container/${trackingNumber}`,
      {
        headers: { Accept: "application/json" },
        timeout: 3000,
      },
    );
    if (response.ok) {
      const data = await response.json();
      return normalizeData(data, "shipsgo");
    }
  } catch (e) {
    console.log("Shipsgo failed:", e.message);
  }
  return null;
}

// Web scraping from carrier websites (MSC, Maersk, etc.)
async function tryWebScraping(trackingNumber) {
  try {
    // Detect carrier from container number prefix
    const carrier = detectCarrier(trackingNumber);
    if (!carrier) return null;

    // Simple fetch from carrier's public tracking page
    const url = getCarrierURL(carrier, trackingNumber);
    const response = await fetch(url, { timeout: 3000 });

    if (response.ok) {
      const html = await response.text();
      return parseCarrierHTML(html, carrier, trackingNumber);
    }
  } catch (e) {
    console.log("Web scraping failed:", e.message);
  }
  return null;
}

// Detect carrier from container number
function detectCarrier(containerNumber) {
  const prefix = containerNumber.substring(0, 4).toUpperCase();
  const carriers = {
    MSCU: "msc",
    MSNU: "msc",
    MAEU: "maersk",
    CMAU: "cma-cgm",
    HLCU: "hapag-lloyd",
    OOLU: "oocl",
  };
  return carriers[prefix] || null;
}

// Get carrier tracking URL
function getCarrierURL(carrier, containerNumber) {
  const urls = {
    msc: `https://www.msc.com/track-a-shipment?agencyPath=mwi&searchBy=container&searchValue=${containerNumber}`,
    maersk: `https://www.maersk.com/tracking/${containerNumber}`,
    "cma-cgm": `https://www.cma-cgm.com/ebusiness/tracking/search?container=${containerNumber}`,
  };
  return urls[carrier];
}

// Parse HTML from carrier website (basic extraction)
function parseCarrierHTML(html, carrier, containerNumber) {
  // This is a simplified version - in production, use a proper HTML parser
  // For now, return null to fall back to simulation
  return null;
}

// Normalize data from different sources to a common format
function normalizeData(data, source) {
  // Convert different API formats to TrackingMore-compatible format
  return {
    delivery_status: data.status || data.delivery_status || "In Transit",
    last_event: data.location || data.last_event || "At Sea",
    vessel_name: data.vessel || data.vessel_name || "N/A",
    scheduled_delivery_date: data.eta || data.scheduled_delivery_date || "N/A",
    origin_country_code: data.origin || "N/A",
    destination_country_code: data.destination || "N/A",
  };
}

// ============================================
// AIS (Automatic Identification System) Integration
// Get real-time GPS coordinates of vessels
// ============================================

async function getVesselPositionFromAIS(vesselName) {
  try {
    // Try VesselFinder API (Free tier available)
    const vesselFinderData = await tryVesselFinder(vesselName);
    if (vesselFinderData) return vesselFinderData;

    // Try AISHub (Free, no API key needed)
    const aisHubData = await tryAISHub(vesselName);
    if (aisHubData) return aisHubData;

    // Try MyShipTracking (Free)
    const myShipData = await tryMyShipTracking(vesselName);
    if (myShipData) return myShipData;

    return null;
  } catch (error) {
    console.error("AIS fetch error:", error);
    return null;
  }
}

// VesselFinder API (Free tier: 500k requests/month)
async function tryVesselFinder(vesselName) {
  try {
    const searchName = encodeURIComponent(vesselName);
    const response = await fetch(
      `https://www.vesselfinder.com/api/pub/vesseltrack?name=${searchName}`,
      { timeout: 3000 },
    );

    if (response.ok) {
      const data = await response.json();
      if (data && data.lat && data.lon) {
        return {
          lat: parseFloat(data.lat),
          lng: parseFloat(data.lon),
          speed: data.speed || 0,
          course: data.course || 0,
          timestamp: data.timestamp || new Date().toISOString(),
        };
      }
    }
  } catch (e) {
    console.log("VesselFinder failed:", e.message);
  }
  return null;
}

// AISHub (Free, open data)
async function tryAISHub(vesselName) {
  try {
    // AISHub provides free AIS data via their public feed
    const searchName = encodeURIComponent(vesselName);
    const response = await fetch(
      `http://data.aishub.net/ws.php?username=demo&format=1&output=json&compress=0&name=${searchName}`,
      { timeout: 3000 },
    );

    if (response.ok) {
      const data = await response.json();
      if (data && data[0] && data[0].LATITUDE && data[0].LONGITUDE) {
        return {
          lat: parseFloat(data[0].LATITUDE),
          lng: parseFloat(data[0].LONGITUDE),
          speed: parseFloat(data[0].SOG) || 0,
          course: parseFloat(data[0].COG) || 0,
          timestamp: data[0].TIME || new Date().toISOString(),
        };
      }
    }
  } catch (e) {
    console.log("AISHub failed:", e.message);
  }
  return null;
}

// MyShipTracking (Free)
async function tryMyShipTracking(vesselName) {
  try {
    const searchName = encodeURIComponent(vesselName);
    const response = await fetch(
      `https://www.myshiptracking.com/requests/vesselInfo.php?mmsi=&name=${searchName}`,
      { timeout: 3000 },
    );

    if (response.ok) {
      const data = await response.json();
      if (data && data.LAT && data.LON) {
        return {
          lat: parseFloat(data.LAT),
          lng: parseFloat(data.LON),
          speed: parseFloat(data.SPEED) || 0,
          course: parseFloat(data.COURSE) || 0,
          timestamp: data.TIMESTAMP || new Date().toISOString(),
        };
      }
    }
  } catch (e) {
    console.log("MyShipTracking failed:", e.message);
  }
  return null;
}
