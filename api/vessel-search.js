// ============================================
// Find Real Vessel from Carrier
// Searches AIS for actual vessels from a specific shipping line
// ============================================

async function findRealVesselFromCarrier(carrier) {
  try {
    // Carrier-specific vessel name patterns for searching AIS
    const carrierPatterns = {
      msc: ["MSC", "MEDITERRANEAN"],
      maersk: ["MAERSK", "MAERSK LINE"],
      "cma-cgm": ["CMA CGM", "CMA"],
      "hapag-lloyd": ["HAPAG", "LLOYD"],
      oocl: ["OOCL"],
      evergreen: ["EVERGREEN", "EVER"],
      cosco: ["COSCO"],
      "yang-ming": ["YANG MING", "YM"],
    };

    const patterns = carrierPatterns[carrier];
    if (!patterns) return null;

    // Try to find vessels from this carrier in AIS
    for (const pattern of patterns) {
      const vessel = await searchAISForCarrierVessel(pattern);
      if (vessel) return vessel;
    }

    return null;
  } catch (error) {
    console.error("Find vessel error:", error);
    return null;
  }
}

// Search AIS databases for vessels matching carrier pattern
async function searchAISForCarrierVessel(pattern) {
  try {
    // Try VesselFinder search
    const vesselFinderResult = await searchVesselFinderByPattern(pattern);
    if (vesselFinderResult) return vesselFinderResult;

    // Try AISHub search
    const aisHubResult = await searchAISHubByPattern(pattern);
    if (aisHubResult) return aisHubResult;

    // Try MyShipTracking search
    const myShipResult = await searchMyShipTrackingByPattern(pattern);
    if (myShipResult) return myShipResult;

    return null;
  } catch (error) {
    console.error("AIS search error:", error);
    return null;
  }
}

// VesselFinder search by pattern
async function searchVesselFinderByPattern(pattern) {
  try {
    const searchPattern = encodeURIComponent(pattern);
    const response = await fetch(
      `https://www.vesselfinder.com/api/pub/vesselsearch?name=${searchPattern}`,
      { timeout: 3000 },
    );

    if (response.ok) {
      const data = await response.json();
      if (data && data.vessels && data.vessels.length > 0) {
        // Return first active vessel found
        const vessel = data.vessels[0];
        return {
          name: vessel.name || vessel.SHIPNAME,
          mmsi: vessel.mmsi || vessel.MMSI,
        };
      }
    }
  } catch (e) {
    console.log("VesselFinder search failed:", e.message);
  }
  return null;
}

// AISHub search by pattern
async function searchAISHubByPattern(pattern) {
  try {
    // AISHub doesn't have direct search, but we can try common vessel names
    const commonVessels = [
      `${pattern} EUROPA`,
      `${pattern} ASIA`,
      `${pattern} AFRICA`,
      `${pattern} AMERICA`,
      `${pattern} PACIFIC`,
      `${pattern} ATLANTIC`,
    ];

    for (const vesselName of commonVessels) {
      const searchName = encodeURIComponent(vesselName);
      const response = await fetch(
        `http://data.aishub.net/ws.php?username=demo&format=1&output=json&compress=0&name=${searchName}`,
        { timeout: 3000 },
      );

      if (response.ok) {
        const data = await response.json();
        if (data && data[0] && data[0].NAME) {
          return {
            name: data[0].NAME,
            mmsi: data[0].MMSI,
          };
        }
      }
    }
  } catch (e) {
    console.log("AISHub search failed:", e.message);
  }
  return null;
}

// MyShipTracking search by pattern
async function searchMyShipTrackingByPattern(pattern) {
  try {
    const searchPattern = encodeURIComponent(pattern);
    const response = await fetch(
      `https://www.myshiptracking.com/requests/vesselInfo.php?name=${searchPattern}`,
      { timeout: 3000 },
    );

    if (response.ok) {
      const data = await response.json();
      if (data && data.SHIPNAME) {
        return {
          name: data.SHIPNAME,
          mmsi: data.MMSI,
        };
      }
    }
  } catch (e) {
    console.log("MyShipTracking search failed:", e.message);
  }
  return null;
}
