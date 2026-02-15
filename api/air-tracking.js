/**
 * Air Cargo Tracking API - Multi-Source with Real Flight Data
 * Attempts to fetch real flight data from multiple free APIs
 * Sources: OpenSky Network, AviationStack, FlightLabs
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
    // Try to get air cargo data from multiple sources
    let airData = null;
    let source = "unknown";

    // Source 0: Try ShipResolve (New primary source)
    airData = await tryShipResolve(trackingNumber);
    if (airData) {
      source = "shipresolve";
    }

    // Source 1: Try AviationStack (Free - 100/month)
    if (!airData) {
      airData = await tryAviationStack(trackingNumber);
      if (airData) {
        source = "aviationstack";
      }
    }

    // Source 2: Try FlightLabs (Free)
    if (!airData) {
      airData = await tryFlightLabs(trackingNumber);
      if (airData) source = "flightlabs";
    }

    // Source 3: Try OpenSky Network (Free - 4000/day)
    if (!airData) {
      airData = await tryOpenSky(trackingNumber);
      if (airData) source = "opensky";
    }

    // If we got flight data, enhance it with real GPS from flight tracking
    if (airData) {
      const flightNumber = airData.flight_number;

      if (flightNumber && flightNumber !== "N/A") {
        console.log(`✈️ Fetching real GPS for flight: ${flightNumber}`);

        // Get real-time flight position
        const flightPosition = await getFlightPosition(flightNumber);

        if (flightPosition) {
          airData.latitude = flightPosition.lat;
          airData.longitude = flightPosition.lng;
          airData.altitude = flightPosition.altitude;
          airData.speed = flightPosition.speed;
          airData.heading = flightPosition.heading;
          airData.is_real_gps = true;
          source += "+GPS";
          console.log(
            `✅ Real flight GPS: ${flightPosition.lat}, ${flightPosition.lng}`,
          );
        } else {
          // Fallback to deterministic simulated coordinate based on tracking number
          const hash = trackingNumber
            .split("")
            .reduce((acc, char) => acc + char.charCodeAt(0), 0);
          airData.latitude = 30 + (hash % 15);
          airData.longitude = 30 + (hash % 20);
          airData.is_estimate = true;
        }
      } else {
        // No flight number found - randomized estimate
        const hash = trackingNumber
          .split("")
          .reduce((acc, char) => acc + char.charCodeAt(0), 0);
        airData.latitude = 25 + (hash % 20);
        airData.longitude = 35 + (hash % 25);
        airData.is_estimate = true;
      }

      return res.status(200).json({ code: 200, data: [airData], source });
    }

    // All sources failed - return empty to trigger simulation
    return res
      .status(200)
      .json({ code: 404, data: [], message: "No data found" });
  } catch (error) {
    console.error("Air Tracking API Error:", error);
    return res
      .status(200)
      .json({ code: 404, data: [], message: "No data found" });
  }
}

// ShipResolve API Integration
async function tryShipResolve(trackingNumber) {
  try {
    const apiKey =
      process.env.VITE_SHIPRESOLVE_API_KEY || process.env.SHIPRESOLVE_API_KEY;
    if (!apiKey) {
      console.log("ShipResolve API Key missing");
      return null;
    }

    const response = await fetch(
      `https://api.shipresolve.com/v1/trackings/${trackingNumber}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json",
        },
        timeout: 4000,
      },
    );

    if (response.ok) {
      const result = await response.json();
      const data = result.data || result;

      // Check if it's air cargo (AWB format)
      return {
        delivery_status: data.status_description || data.status || "In Transit",
        last_event:
          data.last_event_description || data.location || "Processing",
        flight_number: data.flight_number || data.vessel || trackingNumber,
        scheduled_delivery_date: data.expected_delivery || data.eta || "N/A",
        origin_country_code: data.origin_country || "N/A",
        destination_country_code: data.destination_country || "N/A",
        latitude: data.lat || null,
        longitude: data.lng || null,
      };
    } else if (response.status === 404) {
      // Auto-create tracking on ShipResolve
      await fetch(`https://api.shipresolve.com/v1/trackings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tracking_number: trackingNumber,
        }),
        timeout: 4000,
      });
    }
  } catch (e) {
    console.log("ShipResolve Air failed:", e.message);
  }
  return null;
}

// ============================================
// Air Cargo Tracking Sources
// ============================================

// AviationStack API (Free - 100 requests/month)
async function tryAviationStack(awbNumber) {
  try {
    const apiKey = process.env.AVIATIONSTACK_API_KEY || "demo";
    const response = await fetch(
      `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${awbNumber}`,
      { timeout: 3000 },
    );

    if (response.ok) {
      const data = await response.json();
      if (data.data && data.data[0]) {
        const flight = data.data[0];
        return {
          delivery_status: flight.flight_status || "In Transit",
          last_event: flight.departure?.airport || "In Air",
          flight_number: flight.flight?.iata || awbNumber,
          scheduled_delivery_date: flight.arrival?.scheduled || "N/A",
          origin_country_code: flight.departure?.iata || "N/A",
          destination_country_code: flight.arrival?.iata || "N/A",
        };
      }
    }
  } catch (e) {
    console.log("AviationStack failed:", e.message);
  }
  return null;
}

// FlightLabs API (Free)
async function tryFlightLabs(awbNumber) {
  try {
    const apiKey = process.env.FLIGHTLABS_API_KEY || "demo";
    const response = await fetch(
      `http://api.goflightlabs.com/flights?access_key=${apiKey}&flight_iata=${awbNumber}`,
      { timeout: 3000 },
    );

    if (response.ok) {
      const data = await response.json();
      if (data.data && data.data[0]) {
        const flight = data.data[0];
        return {
          delivery_status: flight.status || "In Transit",
          last_event: flight.departure_airport || "In Air",
          flight_number: flight.flight_iata || awbNumber,
          scheduled_delivery_date: flight.arrival_time || "N/A",
          origin_country_code: flight.departure_iata || "N/A",
          destination_country_code: flight.arrival_iata || "N/A",
        };
      }
    }
  } catch (e) {
    console.log("FlightLabs failed:", e.message);
  }
  return null;
}

// OpenSky Network API (Free - 4000/day)
async function tryOpenSky(flightNumber) {
  try {
    // OpenSky uses ICAO24 or callsign, try with flight number
    const response = await fetch(
      `https://opensky-network.org/api/states/all?icao24=${flightNumber}`,
      { timeout: 3000 },
    );

    if (response.ok) {
      const data = await response.json();
      if (data.states && data.states[0]) {
        const state = data.states[0];
        return {
          delivery_status: "In Transit",
          last_event: "In Air",
          flight_number: state[1] || flightNumber,
          scheduled_delivery_date: "N/A",
          origin_country_code: state[2] || "N/A",
          destination_country_code: "N/A",
          latitude: state[6],
          longitude: state[5],
          altitude: state[7],
        };
      }
    }
  } catch (e) {
    console.log("OpenSky failed:", e.message);
  }
  return null;
}

// ============================================
// Real-time Flight Position Tracking
// ============================================

async function getFlightPosition(flightNumber) {
  try {
    // Try OpenSky Network first (most reliable for real-time positions)
    const openSkyPos = await getOpenSkyPosition(flightNumber);
    if (openSkyPos) return openSkyPos;

    // Try AviationStack
    const aviationStackPos = await getAviationStackPosition(flightNumber);
    if (aviationStackPos) return aviationStackPos;

    return null;
  } catch (error) {
    console.error("Flight position error:", error);
    return null;
  }
}

// OpenSky Network - Real-time aircraft positions
async function getOpenSkyPosition(flightNumber) {
  try {
    const response = await fetch(`https://opensky-network.org/api/states/all`, {
      timeout: 3000,
    });

    if (response.ok) {
      const data = await response.json();
      if (data.states) {
        // Search for matching flight number in callsign
        const flight = data.states.find(
          (s) =>
            s[1] &&
            s[1].trim().toUpperCase().includes(flightNumber.toUpperCase()),
        );

        if (flight) {
          return {
            lat: flight[6],
            lng: flight[5],
            altitude: flight[7],
            speed: flight[9],
            heading: flight[10],
          };
        }
      }
    }
  } catch (e) {
    console.log("OpenSky position failed:", e.message);
  }
  return null;
}

// AviationStack - Flight position
async function getAviationStackPosition(flightNumber) {
  try {
    const apiKey = process.env.AVIATIONSTACK_API_KEY || "demo";
    const response = await fetch(
      `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightNumber}`,
      { timeout: 3000 },
    );

    if (response.ok) {
      const data = await response.json();
      if (data.data && data.data[0] && data.data[0].live) {
        const live = data.data[0].live;
        return {
          lat: live.latitude,
          lng: live.longitude,
          altitude: live.altitude,
          speed: live.speed_horizontal,
          heading: live.direction,
        };
      }
    }
  } catch (e) {
    console.log("AviationStack position failed:", e.message);
  }
  return null;
}
