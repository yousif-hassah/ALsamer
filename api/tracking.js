/**
 * Vercel Serverless Function - TrackingMore API Proxy
 * This function acts as a secure intermediary between the client and TrackingMore API
 * to resolve CORS issues and protect the API key.
 */

export default async function handler(req, res) {
  // Enable CORS for your domain
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { action, trackingNumber, courierCode } = req.query;
  const apiKey = process.env.VITE_TRACKINGMORE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    // Step 1: Create/Register tracking (if action is 'create')
    if (action === "create") {
      const createResponse = await fetch(
        "https://api.trackingmore.com/v4/trackings/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Tracking-Api-Key": apiKey,
          },
          body: JSON.stringify({
            tracking_number: trackingNumber,
            courier_code: courierCode || undefined,
          }),
        },
      );

      const createData = await createResponse.json();
      return res.status(200).json(createData);
    }

    // Step 2: Get tracking data (default action)
    const getResponse = await fetch(
      `https://api.trackingmore.com/v4/trackings/get?tracking_numbers=${trackingNumber}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Tracking-Api-Key": apiKey,
        },
      },
    );

    const getData = await getResponse.json();
    return res.status(200).json(getData);
  } catch (error) {
    console.error("TrackingMore API Error:", error);
    return res.status(500).json({
      error: "Failed to fetch tracking data",
      message: error.message,
    });
  }
}
