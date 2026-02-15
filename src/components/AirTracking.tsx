import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Search,
  MapPin,
  Plane,
  Clock,
  Package,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface TrackingResult {
  awbNumber: string;
  status: string;
  location: string;
  flight: string;
  eta: string;
  origin: string;
  destination: string;
  lastUpdated: string;
  coordinates: { lat: number; lng: number };
  route: { lat: number; lng: number }[];
  isLive: boolean;
}

const AirTracking = () => {
  const { t, isRTL } = useLanguage();
  const [awbNumber, setAwbNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Validate AWB (Air Waybill) number format (3-digit airline code + 8-digit serial number)
  const validateAwbNumber = (num: string): boolean => {
    const pattern = /^[0-9]{3}-?[0-9]{8}$/;
    return pattern.test(num.replace(/\s/g, ""));
  };

  const handleTrack = async () => {
    setError(null);
    setResult(null);

    const cleanNumber = awbNumber.trim().replace(/\s/g, "");

    if (!cleanNumber) {
      setError(t("airtracking.invalid"));
      return;
    }

    if (!validateAwbNumber(cleanNumber)) {
      setError(t("airtracking.invalid"));
      return;
    }

    setIsSearching(true);

    try {
      // Use dedicated air tracking API with real flight data
      const response = await fetch(
        `/api/air-tracking?trackingNumber=${cleanNumber}`,
      );

      if (!response.ok) {
        throw new Error("API Error");
      }

      const apiResult = await response.json();

      if (
        apiResult.code === 200 &&
        apiResult.data &&
        apiResult.data.length > 0
      ) {
        const data = apiResult.data[0];
        const source = apiResult.source || "unknown";

        console.log(`✅ Real data from: ${source}`);

        // Use real GPS coordinates if available from AIS
        const hasRealGPS = data.latitude && data.longitude;
        const coordinates = hasRealGPS
          ? { lat: data.latitude, lng: data.longitude }
          : { lat: 33.3152, lng: 44.3661 }; // Fallback coordinates

        if (hasRealGPS) {
          console.log(
            `🌍 Real GPS coordinates: ${data.latitude}, ${data.longitude}`,
          );
        }

        setResult({
          awbNumber: cleanNumber,
          status: data.delivery_status || "In Transit",
          location: data.last_event || "In Air",
          flight: data.flight_number || "N/A",
          eta: data.scheduled_delivery_date || "N/A",
          origin: data.origin_country_code || "N/A",
          destination: data.destination_country_code || "N/A",
          lastUpdated: new Date().toLocaleString(),
          coordinates,
          route: [],
          isLive: true, // Real data from free APIs + AIS GPS!
        });
        setIsSearching(false);
        return;
      } else {
        throw new Error("No data found - falling back to simulation");
      }
    } catch (error) {
      console.log("Falling back to simulation:", error);

      // Comprehensive global air routes covering all continents
      const routes = [
        // Arab Countries - Iraq and all Arab nations
        {
          origin: "Beijing, China",
          destination: "Baghdad, Iraq",
          location: "Over Iran",
          flight: "CA 941",
          coordinates: { lat: 32.5, lng: 51.0 },
          route: [
            { lat: 40.0801, lng: 116.5846 },
            { lat: 32.5, lng: 51.0 },
            { lat: 33.2625, lng: 44.2346 },
          ],
        },
        {
          origin: "Frankfurt, Germany",
          destination: "Basra, Iraq",
          location: "Over Turkey",
          flight: "LH 600",
          coordinates: { lat: 38.5, lng: 35.0 },
          route: [
            { lat: 50.0379, lng: 8.5622 },
            { lat: 38.5, lng: 35.0 },
            { lat: 30.5494, lng: 47.6617 },
          ],
        },
        {
          origin: "Dubai, UAE",
          destination: "Erbil, Iraq",
          location: "Over Persian Gulf",
          flight: "EK 945",
          coordinates: { lat: 28.0, lng: 50.0 },
          route: [
            { lat: 25.2532, lng: 55.3657 },
            { lat: 28.0, lng: 50.0 },
            { lat: 36.2378, lng: 43.9633 },
          ],
        },
        {
          origin: "London, UK",
          destination: "Jeddah, Saudi Arabia",
          location: "Over Mediterranean",
          flight: "BA 263",
          coordinates: { lat: 35.0, lng: 25.0 },
          route: [
            { lat: 51.47, lng: -0.4543 },
            { lat: 35.0, lng: 25.0 },
            { lat: 21.6796, lng: 39.1564 },
          ],
        },
        {
          origin: "Paris, France",
          destination: "Riyadh, Saudi Arabia",
          location: "Over Egypt",
          flight: "AF 254",
          coordinates: { lat: 28.0, lng: 32.0 },
          route: [
            { lat: 49.0097, lng: 2.5479 },
            { lat: 28.0, lng: 32.0 },
            { lat: 24.9574, lng: 46.6989 },
          ],
        },
        {
          origin: "Istanbul, Turkey",
          destination: "Kuwait City, Kuwait",
          location: "Over Iraq",
          flight: "TK 772",
          coordinates: { lat: 33.0, lng: 43.0 },
          route: [
            { lat: 41.2753, lng: 28.7519 },
            { lat: 33.0, lng: 43.0 },
            { lat: 29.2263, lng: 47.9689 },
          ],
        },
        {
          origin: "New York, USA",
          destination: "Doha, Qatar",
          location: "Over Atlantic",
          flight: "QR 702",
          coordinates: { lat: 45.0, lng: -30.0 },
          route: [
            { lat: 40.6413, lng: -73.7781 },
            { lat: 45.0, lng: -30.0 },
            { lat: 35.0, lng: 15.0 },
            { lat: 25.2731, lng: 51.608 },
          ],
        },
        {
          origin: "Singapore",
          destination: "Abu Dhabi, UAE",
          location: "Over India",
          flight: "SQ 494",
          coordinates: { lat: 20.0, lng: 75.0 },
          route: [
            { lat: 1.3644, lng: 103.9915 },
            { lat: 20.0, lng: 75.0 },
            { lat: 24.4331, lng: 54.6511 },
          ],
        },
        {
          origin: "Tokyo, Japan",
          destination: "Dubai, UAE",
          location: "Over India",
          flight: "EK 319",
          coordinates: { lat: 22.0, lng: 78.0 },
          route: [
            { lat: 35.5494, lng: 139.7798 },
            { lat: 22.0, lng: 78.0 },
            { lat: 25.2532, lng: 55.3657 },
          ],
        },
        {
          origin: "Cairo, Egypt",
          destination: "Amman, Jordan",
          location: "Over Sinai",
          flight: "MS 505",
          coordinates: { lat: 30.0, lng: 34.0 },
          route: [
            { lat: 30.1219, lng: 31.4056 },
            { lat: 30.0, lng: 34.0 },
            { lat: 31.7227, lng: 35.9932 },
          ],
        },
        {
          origin: "Rome, Italy",
          destination: "Beirut, Lebanon",
          location: "Over Greece",
          flight: "AZ 804",
          coordinates: { lat: 38.0, lng: 23.0 },
          route: [
            { lat: 41.8003, lng: 12.2389 },
            { lat: 38.0, lng: 23.0 },
            { lat: 33.8206, lng: 35.4883 },
          ],
        },
        {
          origin: "Mumbai, India",
          destination: "Muscat, Oman",
          location: "Over Arabian Sea",
          flight: "AI 945",
          coordinates: { lat: 22.0, lng: 65.0 },
          route: [
            { lat: 19.0896, lng: 72.8656 },
            { lat: 22.0, lng: 65.0 },
            { lat: 23.5933, lng: 58.2844 },
          ],
        },
        {
          origin: "Madrid, Spain",
          destination: "Casablanca, Morocco",
          location: "Over Gibraltar",
          flight: "IB 3901",
          coordinates: { lat: 36.0, lng: -5.5 },
          route: [
            { lat: 40.4719, lng: -3.5626 },
            { lat: 36.0, lng: -5.5 },
            { lat: 33.3676, lng: -7.5898 },
          ],
        },
        {
          origin: "Athens, Greece",
          destination: "Alexandria, Egypt",
          location: "Over Mediterranean",
          flight: "A3 928",
          coordinates: { lat: 33.5, lng: 28.0 },
          route: [
            { lat: 37.9364, lng: 23.9445 },
            { lat: 33.5, lng: 28.0 },
            { lat: 31.2001, lng: 29.9187 },
          ],
        },
        {
          origin: "Tunis, Tunisia",
          destination: "Algiers, Algeria",
          location: "Over Mediterranean",
          flight: "TU 701",
          coordinates: { lat: 37.0, lng: 5.0 },
          route: [
            { lat: 36.851, lng: 10.2272 },
            { lat: 37.0, lng: 5.0 },
            { lat: 36.691, lng: 3.2154 },
          ],
        },
        {
          origin: "Khartoum, Sudan",
          destination: "Djibouti City, Djibouti",
          location: "Over Red Sea",
          flight: "SD 408",
          coordinates: { lat: 14.0, lng: 40.0 },
          route: [
            { lat: 15.5897, lng: 32.5599 },
            { lat: 14.0, lng: 40.0 },
            { lat: 11.5475, lng: 43.1594 },
          ],
        },
        {
          origin: "Damascus, Syria",
          destination: "Baghdad, Iraq",
          location: "Over Desert",
          flight: "RB 101",
          coordinates: { lat: 33.5, lng: 40.0 },
          route: [
            { lat: 33.4119, lng: 36.5155 },
            { lat: 33.5, lng: 40.0 },
            { lat: 33.2625, lng: 44.2346 },
          ],
        },
        {
          origin: "Sana'a, Yemen",
          destination: "Cairo, Egypt",
          location: "Over Red Sea",
          flight: "IY 322",
          coordinates: { lat: 18.0, lng: 38.0 },
          route: [
            { lat: 15.4769, lng: 44.1169 },
            { lat: 18.0, lng: 38.0 },
            { lat: 30.1219, lng: 31.4056 },
          ],
        },
        {
          origin: "Tripoli, Libya",
          destination: "Tunis, Tunisia",
          location: "Over Mediterranean",
          flight: "LN 105",
          coordinates: { lat: 35.0, lng: 12.0 },
          route: [
            { lat: 32.6635, lng: 13.159 },
            { lat: 35.0, lng: 12.0 },
            { lat: 36.851, lng: 10.2272 },
          ],
        },
        {
          origin: "Nouakchott, Mauritania",
          destination: "Casablanca, Morocco",
          location: "Over Atlantic",
          flight: "MR 201",
          coordinates: { lat: 22.0, lng: -14.0 },
          route: [
            { lat: 18.0969, lng: -15.9582 },
            { lat: 22.0, lng: -14.0 },
            { lat: 33.3676, lng: -7.5898 },
          ],
        },
        // Asia - China, Vietnam, all Asian countries
        {
          origin: "Los Angeles, USA",
          destination: "Shanghai, China",
          location: "Over Pacific",
          flight: "CA 988",
          coordinates: { lat: 40.0, lng: -160.0 },
          route: [
            { lat: 33.9416, lng: -118.4085 },
            { lat: 40.0, lng: -160.0 },
            { lat: 31.1443, lng: 121.8083 },
          ],
        },
        {
          origin: "Frankfurt, Germany",
          destination: "Ho Chi Minh City, Vietnam",
          location: "Over India",
          flight: "LH 782",
          coordinates: { lat: 25.0, lng: 80.0 },
          route: [
            { lat: 50.0379, lng: 8.5622 },
            { lat: 25.0, lng: 80.0 },
            { lat: 10.8188, lng: 106.6519 },
          ],
        },
        {
          origin: "New York, USA",
          destination: "Tokyo, Japan",
          location: "Over Alaska",
          flight: "JL 006",
          coordinates: { lat: 60.0, lng: -150.0 },
          route: [
            { lat: 40.6413, lng: -73.7781 },
            { lat: 60.0, lng: -150.0 },
            { lat: 35.5494, lng: 139.7798 },
          ],
        },
        {
          origin: "London, UK",
          destination: "Singapore",
          location: "Over India",
          flight: "BA 11",
          coordinates: { lat: 22.0, lng: 78.0 },
          route: [
            { lat: 51.47, lng: -0.4543 },
            { lat: 22.0, lng: 78.0 },
            { lat: 1.3644, lng: 103.9915 },
          ],
        },
        {
          origin: "Dubai, UAE",
          destination: "Jakarta, Indonesia",
          location: "Over India",
          flight: "EK 368",
          coordinates: { lat: 15.0, lng: 80.0 },
          route: [
            { lat: 25.2532, lng: 55.3657 },
            { lat: 15.0, lng: 80.0 },
            { lat: -6.1256, lng: 106.6559 },
          ],
        },
        {
          origin: "Seoul, South Korea",
          destination: "Bangkok, Thailand",
          location: "Over South China Sea",
          flight: "KE 651",
          coordinates: { lat: 18.0, lng: 110.0 },
          route: [
            { lat: 37.4602, lng: 126.4407 },
            { lat: 18.0, lng: 110.0 },
            { lat: 13.69, lng: 100.7501 },
          ],
        },
        {
          origin: "Hong Kong",
          destination: "Mumbai, India",
          location: "Over Bay of Bengal",
          flight: "CX 663",
          coordinates: { lat: 18.0, lng: 85.0 },
          route: [
            { lat: 22.308, lng: 113.9185 },
            { lat: 18.0, lng: 85.0 },
            { lat: 19.0896, lng: 72.8656 },
          ],
        },
        {
          origin: "Guangzhou, China",
          destination: "Colombo, Sri Lanka",
          location: "Over Bay of Bengal",
          flight: "CZ 349",
          coordinates: { lat: 12.0, lng: 85.0 },
          route: [
            { lat: 23.3924, lng: 113.2988 },
            { lat: 12.0, lng: 85.0 },
            { lat: 7.1808, lng: 79.8841 },
          ],
        },
        {
          origin: "Hanoi, Vietnam",
          destination: "Karachi, Pakistan",
          location: "Over India",
          flight: "VN 785",
          coordinates: { lat: 22.0, lng: 75.0 },
          route: [
            { lat: 21.2187, lng: 105.8019 },
            { lat: 22.0, lng: 75.0 },
            { lat: 24.9056, lng: 67.1608 },
          ],
        },
        {
          origin: "Manila, Philippines",
          destination: "Kuala Lumpur, Malaysia",
          location: "Over South China Sea",
          flight: "PR 507",
          coordinates: { lat: 8.0, lng: 112.0 },
          route: [
            { lat: 14.5086, lng: 121.0194 },
            { lat: 8.0, lng: 112.0 },
            { lat: 2.7456, lng: 101.7072 },
          ],
        },
        {
          origin: "Delhi, India",
          destination: "Dhaka, Bangladesh",
          location: "Over India",
          flight: "AI 237",
          coordinates: { lat: 25.0, lng: 85.0 },
          route: [
            { lat: 28.5562, lng: 77.1 },
            { lat: 25.0, lng: 85.0 },
            { lat: 23.8103, lng: 90.4125 },
          ],
        },
        {
          origin: "Kathmandu, Nepal",
          destination: "Bangkok, Thailand",
          location: "Over Myanmar",
          flight: "TG 320",
          coordinates: { lat: 20.0, lng: 95.0 },
          route: [
            { lat: 27.7172, lng: 85.324 },
            { lat: 20.0, lng: 95.0 },
            { lat: 13.69, lng: 100.7501 },
          ],
        },
        // Africa
        {
          origin: "Beijing, China",
          destination: "Nairobi, Kenya",
          location: "Over India",
          flight: "CA 863",
          coordinates: { lat: 15.0, lng: 75.0 },
          route: [
            { lat: 40.0801, lng: 116.5846 },
            { lat: 15.0, lng: 75.0 },
            { lat: -1.3192, lng: 36.9275 },
          ],
        },
        {
          origin: "Paris, France",
          destination: "Cape Town, South Africa",
          location: "Over Central Africa",
          flight: "AF 990",
          coordinates: { lat: -10.0, lng: 20.0 },
          route: [
            { lat: 49.0097, lng: 2.5479 },
            { lat: 10.0, lng: 10.0 },
            { lat: -10.0, lng: 20.0 },
            { lat: -33.9715, lng: 18.6021 },
          ],
        },
        {
          origin: "Dubai, UAE",
          destination: "Dar es Salaam, Tanzania",
          location: "Over Somalia",
          flight: "EK 723",
          coordinates: { lat: 5.0, lng: 45.0 },
          route: [
            { lat: 25.2532, lng: 55.3657 },
            { lat: 5.0, lng: 45.0 },
            { lat: -6.7924, lng: 39.2083 },
          ],
        },
        {
          origin: "London, UK",
          destination: "Lagos, Nigeria",
          location: "Over Sahara",
          flight: "BA 75",
          coordinates: { lat: 20.0, lng: 5.0 },
          route: [
            { lat: 51.47, lng: -0.4543 },
            { lat: 20.0, lng: 5.0 },
            { lat: 6.5774, lng: 3.3213 },
          ],
        },
        {
          origin: "Istanbul, Turkey",
          destination: "Johannesburg, South Africa",
          location: "Over East Africa",
          flight: "TK 43",
          coordinates: { lat: -5.0, lng: 35.0 },
          route: [
            { lat: 41.2753, lng: 28.7519 },
            { lat: 10.0, lng: 35.0 },
            { lat: -5.0, lng: 35.0 },
            { lat: -26.1367, lng: 28.2411 },
          ],
        },
        {
          origin: "Singapore",
          destination: "Durban, South Africa",
          location: "Over Madagascar",
          flight: "SQ 478",
          coordinates: { lat: -20.0, lng: 50.0 },
          route: [
            { lat: 1.3644, lng: 103.9915 },
            { lat: -20.0, lng: 50.0 },
            { lat: -29.8587, lng: 31.0218 },
          ],
        },
        {
          origin: "New York, USA",
          destination: "Accra, Ghana",
          location: "Over Atlantic",
          flight: "DL 157",
          coordinates: { lat: 15.0, lng: -30.0 },
          route: [
            { lat: 40.6413, lng: -73.7781 },
            { lat: 15.0, lng: -30.0 },
            { lat: 5.6052, lng: -0.1679 },
          ],
        },
        {
          origin: "Frankfurt, Germany",
          destination: "Addis Ababa, Ethiopia",
          location: "Over Sudan",
          flight: "LH 590",
          coordinates: { lat: 15.0, lng: 35.0 },
          route: [
            { lat: 50.0379, lng: 8.5622 },
            { lat: 15.0, lng: 35.0 },
            { lat: 8.9806, lng: 38.7578 },
          ],
        },
        // North America
        {
          origin: "Shanghai, China",
          destination: "Los Angeles, USA",
          location: "Over Pacific",
          flight: "AA 182",
          coordinates: { lat: 38.0, lng: -160.0 },
          route: [
            { lat: 31.1443, lng: 121.8083 },
            { lat: 38.0, lng: -160.0 },
            { lat: 33.9416, lng: -118.4085 },
          ],
        },
        {
          origin: "London, UK",
          destination: "New York, USA",
          location: "Over Atlantic",
          flight: "BA 112",
          coordinates: { lat: 52.0, lng: -35.0 },
          route: [
            { lat: 51.47, lng: -0.4543 },
            { lat: 52.0, lng: -35.0 },
            { lat: 40.6413, lng: -73.7781 },
          ],
        },
        {
          origin: "Dubai, UAE",
          destination: "Houston, USA",
          location: "Over Atlantic",
          flight: "EK 211",
          coordinates: { lat: 35.0, lng: -50.0 },
          route: [
            { lat: 25.2532, lng: 55.3657 },
            { lat: 35.0, lng: 15.0 },
            { lat: 35.0, lng: -50.0 },
            { lat: 29.9902, lng: -95.3368 },
          ],
        },
        {
          origin: "Tokyo, Japan",
          destination: "Vancouver, Canada",
          location: "Over Pacific",
          flight: "AC 004",
          coordinates: { lat: 48.0, lng: -155.0 },
          route: [
            { lat: 35.5494, lng: 139.7798 },
            { lat: 48.0, lng: -155.0 },
            { lat: 49.1967, lng: -123.1815 },
          ],
        },
        {
          origin: "Paris, France",
          destination: "Miami, USA",
          location: "Over Atlantic",
          flight: "AF 90",
          coordinates: { lat: 38.0, lng: -45.0 },
          route: [
            { lat: 49.0097, lng: 2.5479 },
            { lat: 38.0, lng: -45.0 },
            { lat: 25.7959, lng: -80.2871 },
          ],
        },
        {
          origin: "Seoul, South Korea",
          destination: "Seattle, USA",
          location: "Over Pacific",
          flight: "KE 019",
          coordinates: { lat: 50.0, lng: -165.0 },
          route: [
            { lat: 37.4602, lng: 126.4407 },
            { lat: 50.0, lng: -165.0 },
            { lat: 47.4502, lng: -122.3088 },
          ],
        },
        {
          origin: "Mexico City, Mexico",
          destination: "Toronto, Canada",
          location: "Over USA",
          flight: "AM 698",
          coordinates: { lat: 35.0, lng: -95.0 },
          route: [
            { lat: 19.4363, lng: -99.0721 },
            { lat: 35.0, lng: -95.0 },
            { lat: 43.6777, lng: -79.6248 },
          ],
        },
        // South America
        {
          origin: "Madrid, Spain",
          destination: "São Paulo, Brazil",
          location: "Over Atlantic",
          flight: "IB 6821",
          coordinates: { lat: -5.0, lng: -30.0 },
          route: [
            { lat: 40.4719, lng: -3.5626 },
            { lat: -5.0, lng: -30.0 },
            { lat: -23.4356, lng: -46.4731 },
          ],
        },
        {
          origin: "Paris, France",
          destination: "Buenos Aires, Argentina",
          location: "Over Brazil",
          flight: "AF 416",
          coordinates: { lat: -15.0, lng: -45.0 },
          route: [
            { lat: 49.0097, lng: 2.5479 },
            { lat: 0.0, lng: -30.0 },
            { lat: -15.0, lng: -45.0 },
            { lat: -34.6118, lng: -58.4173 },
          ],
        },
        {
          origin: "Los Angeles, USA",
          destination: "Santiago, Chile",
          location: "Over Pacific",
          flight: "LA 600",
          coordinates: { lat: -10.0, lng: -85.0 },
          route: [
            { lat: 33.9416, lng: -118.4085 },
            { lat: -10.0, lng: -85.0 },
            { lat: -33.393, lng: -70.7858 },
          ],
        },
        {
          origin: "Frankfurt, Germany",
          destination: "Lima, Peru",
          location: "Over Atlantic",
          flight: "LH 2574",
          coordinates: { lat: 5.0, lng: -50.0 },
          route: [
            { lat: 50.0379, lng: 8.5622 },
            { lat: 5.0, lng: -50.0 },
            { lat: -12.0219, lng: -77.1143 },
          ],
        },
        {
          origin: "Dubai, UAE",
          destination: "Bogotá, Colombia",
          location: "Over Atlantic",
          flight: "EK 247",
          coordinates: { lat: 15.0, lng: -55.0 },
          route: [
            { lat: 25.2532, lng: 55.3657 },
            { lat: 15.0, lng: 15.0 },
            { lat: 15.0, lng: -55.0 },
            { lat: 4.7016, lng: -74.1469 },
          ],
        },
        {
          origin: "Amsterdam, Netherlands",
          destination: "Rio de Janeiro, Brazil",
          location: "Over Atlantic",
          flight: "KL 705",
          coordinates: { lat: -5.0, lng: -25.0 },
          route: [
            { lat: 52.3105, lng: 4.7683 },
            { lat: -5.0, lng: -25.0 },
            { lat: -22.8099, lng: -43.2505 },
          ],
        },
        // Europe
        {
          origin: "Beijing, China",
          destination: "Amsterdam, Netherlands",
          location: "Over Russia",
          flight: "KL 898",
          coordinates: { lat: 55.0, lng: 60.0 },
          route: [
            { lat: 40.0801, lng: 116.5846 },
            { lat: 55.0, lng: 60.0 },
            { lat: 52.3105, lng: 4.7683 },
          ],
        },
        {
          origin: "Los Angeles, USA",
          destination: "Frankfurt, Germany",
          location: "Over Greenland",
          flight: "LH 457",
          coordinates: { lat: 65.0, lng: -40.0 },
          route: [
            { lat: 33.9416, lng: -118.4085 },
            { lat: 65.0, lng: -40.0 },
            { lat: 50.0379, lng: 8.5622 },
          ],
        },
        {
          origin: "Dubai, UAE",
          destination: "Barcelona, Spain",
          location: "Over Mediterranean",
          flight: "EK 185",
          coordinates: { lat: 36.0, lng: 15.0 },
          route: [
            { lat: 25.2532, lng: 55.3657 },
            { lat: 36.0, lng: 15.0 },
            { lat: 41.2974, lng: 2.0833 },
          ],
        },
        {
          origin: "Tokyo, Japan",
          destination: "Paris, France",
          location: "Over Russia",
          flight: "AF 275",
          coordinates: { lat: 58.0, lng: 80.0 },
          route: [
            { lat: 35.5494, lng: 139.7798 },
            { lat: 58.0, lng: 80.0 },
            { lat: 49.0097, lng: 2.5479 },
          ],
        },
        {
          origin: "Singapore",
          destination: "London, UK",
          location: "Over Middle East",
          flight: "SQ 322",
          coordinates: { lat: 28.0, lng: 50.0 },
          route: [
            { lat: 1.3644, lng: 103.9915 },
            { lat: 28.0, lng: 50.0 },
            { lat: 51.47, lng: -0.4543 },
          ],
        },
        {
          origin: "Mumbai, India",
          destination: "Rome, Italy",
          location: "Over Middle East",
          flight: "AZ 770",
          coordinates: { lat: 28.0, lng: 45.0 },
          route: [
            { lat: 19.0896, lng: 72.8656 },
            { lat: 28.0, lng: 45.0 },
            { lat: 41.8003, lng: 12.2389 },
          ],
        },
        {
          origin: "New York, USA",
          destination: "Moscow, Russia",
          location: "Over Arctic",
          flight: "SU 102",
          coordinates: { lat: 65.0, lng: 30.0 },
          route: [
            { lat: 40.6413, lng: -73.7781 },
            { lat: 65.0, lng: 30.0 },
            { lat: 55.9726, lng: 37.4146 },
          ],
        },
        {
          origin: "Seoul, South Korea",
          destination: "Vienna, Austria",
          location: "Over Russia",
          flight: "OS 542",
          coordinates: { lat: 52.0, lng: 85.0 },
          route: [
            { lat: 37.4602, lng: 126.4407 },
            { lat: 52.0, lng: 85.0 },
            { lat: 48.1103, lng: 16.5697 },
          ],
        },
        // Australia & Oceania
        {
          origin: "Singapore",
          destination: "Sydney, Australia",
          location: "Over Indonesia",
          flight: "SQ 221",
          coordinates: { lat: -10.0, lng: 125.0 },
          route: [
            { lat: 1.3644, lng: 103.9915 },
            { lat: -10.0, lng: 125.0 },
            { lat: -33.9399, lng: 151.1753 },
          ],
        },
        {
          origin: "Los Angeles, USA",
          destination: "Auckland, New Zealand",
          location: "Over Pacific",
          flight: "NZ 6",
          coordinates: { lat: -15.0, lng: -160.0 },
          route: [
            { lat: 33.9416, lng: -118.4085 },
            { lat: -15.0, lng: -160.0 },
            { lat: -37.0082, lng: 174.785 },
          ],
        },
        {
          origin: "Dubai, UAE",
          destination: "Melbourne, Australia",
          location: "Over India",
          flight: "EK 406",
          coordinates: { lat: 15.0, lng: 80.0 },
          route: [
            { lat: 25.2532, lng: 55.3657 },
            { lat: 15.0, lng: 80.0 },
            { lat: -37.669, lng: 144.841 },
          ],
        },
      ];

      // Use AWB number to deterministically select a route
      const hash = cleanNumber
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const selectedRoute = routes[hash % routes.length];

      const statuses = [
        "In Transit",
        "At Airport",
        "Customs Clearance",
        "Loading",
        "Unloading",
        "Departed",
      ];
      const selectedStatus = statuses[hash % statuses.length];

      const hoursToAdd = (hash % 48) + 2;
      const etaDate = new Date();
      etaDate.setHours(etaDate.getHours() + hoursToAdd);

      setResult({
        awbNumber: cleanNumber,
        status: selectedStatus,
        location: selectedRoute.location,
        flight: selectedRoute.flight,
        eta:
          etaDate.toISOString().split("T")[0] +
          " " +
          etaDate.toTimeString().split(" ")[0].substring(0, 5),
        origin: selectedRoute.origin,
        destination: selectedRoute.destination,
        lastUpdated: new Date().toLocaleString(),
        coordinates: selectedRoute.coordinates,
        route: selectedRoute.route,
        isLive: false, // Default to simulation (Demo Mode)
      });
    }

    setIsSearching(false);
  };

  // Initialize and update map
  useEffect(() => {
    if (!mapRef.current || !result) return;

    // Cleanup previous map instance
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Create new map
    const map = L.map(mapRef.current).setView(
      [result.coordinates.lat, result.coordinates.lng],
      4,
    );
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      },
    ).addTo(map);

    // Custom marker icon for aircraft
    const aircraftIcon = L.divIcon({
      className: "custom-marker",
      html: `<div style="background: linear-gradient(135deg, hsl(43, 100%, 50%), hsl(48, 100%, 60%)); width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;">
        <svg width="12" height="12" fill="hsl(0, 0%, 5%)" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
      </div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    // Add marker for current location
    L.marker([result.coordinates.lat, result.coordinates.lng], {
      icon: aircraftIcon,
    })
      .addTo(map)
      .bindPopup(`<strong>${result.awbNumber}</strong><br/>${result.location}`)
      .openPopup();

    // Draw route if available
    if (result.route.length > 1) {
      const routeCoords: L.LatLngExpression[] = result.route.map((p) => [
        p.lat,
        p.lng,
      ]);
      L.polyline(routeCoords, {
        color: "hsl(43, 100%, 50%)",
        weight: 3,
        opacity: 0.8,
        dashArray: "10, 10",
      }).addTo(map);

      // Add airport markers
      result.route.forEach((point, index) => {
        const airportIcon = L.divIcon({
          className: "port-marker",
          html: `<div style="background: ${index === result.route.length - 1 ? "hsl(43, 100%, 50%)" : "white"}; width: 10px; height: 10px; border-radius: 50%; border: 2px solid hsl(43, 100%, 50%);"></div>`,
          iconSize: [10, 10],
          iconAnchor: [5, 5],
        });
        L.marker([point.lat, point.lng], { icon: airportIcon }).addTo(map);
      });

      // Fit bounds to show entire route
      map.fitBounds(L.latLngBounds(routeCoords), { padding: [50, 50] });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [result]);

  return (
    <section
      id="air-tracking"
      className="relative py-16 sm:py-20 lg:py-24 bg-background overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(45,50%,15%)] to-background opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="tag-warm mb-3 sm:mb-4 inline-block text-[10px] sm:text-xs">
            {t("airtracking.tag")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            {t("airtracking.title")}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base px-2">
            {t("airtracking.subtitle")}
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass-card p-4 sm:p-6 max-w-2xl mx-auto mb-8 sm:mb-12"
        >
          <div
            className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}
          >
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder={t("airtracking.placeholder")}
                value={awbNumber}
                onChange={(e) => setAwbNumber(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                className="h-12 sm:h-14 pl-10 sm:pl-12 pr-4 bg-white/5 border-white/10 text-white placeholder:text-white/40 text-sm sm:text-lg"
                dir="ltr"
              />
              <Search
                className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? "right-3 sm:right-4" : "left-3 sm:left-4"} w-4 h-4 sm:w-5 sm:h-5 text-white/40`}
              />
            </div>
            <Button
              onClick={handleTrack}
              disabled={isSearching}
              variant="hero"
              size="lg"
              className="h-12 sm:h-14 px-6 sm:px-8 w-full sm:w-auto"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin mr-2" />
                  <span className="text-sm sm:text-base">
                    {t("airtracking.searching")}
                  </span>
                </>
              ) : (
                <span className="text-sm sm:text-base">
                  {t("airtracking.button")}
                </span>
              )}
            </Button>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 mt-4 text-red-400"
              >
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
            >
              {/* Map */}
              <div className="glass-card overflow-hidden h-[280px] sm:h-[350px] lg:h-[500px] order-2 lg:order-1">
                <div ref={mapRef} className="w-full h-full" />
              </div>

              {/* Details */}
              <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                {/* Shipment Info Card */}
                <div className="glass-card p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-3">
                      <div className="icon-circle w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                        <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-xl font-bold text-white truncate">
                          {result.awbNumber}
                        </h3>
                        <span
                          className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold mt-1 uppercase tracking-wider ${
                            result.status === "Delivered"
                              ? "bg-green-500/20 text-green-400"
                              : result.status === "At Airport"
                                ? "bg-primary/20 text-soft-yellow"
                                : "bg-primary/20 text-primary"
                          }`}
                        >
                          {result.status}
                        </span>
                      </div>
                    </div>

                    {/* Data Status Badge - Hybrid Logic Indicator */}
                    <div
                      className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-tight flex items-center gap-1.5 border ${
                        result.isLive
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full animate-pulse ${result.isLive ? "bg-green-400" : "bg-amber-400"}`}
                      />
                      {result.isLive ? "Live Data" : "Demo Mode"}
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs text-white/50">
                          {t("airtracking.location")}
                        </p>
                        <p className="text-white font-medium text-sm sm:text-base truncate">
                          {result.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <Plane className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs text-white/50">
                          {t("airtracking.flight")}
                        </p>
                        <p className="text-white font-medium text-sm sm:text-base truncate">
                          {result.flight}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-[10px] sm:text-xs text-white/50">
                          {t("airtracking.eta")}
                        </p>
                        <p className="text-white font-medium text-sm sm:text-base">
                          {result.eta}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Route Info Card */}
                <div className="glass-card p-4 sm:p-6">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                    Flight Route
                  </h4>
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-center min-w-0 flex-shrink">
                      <p className="text-[10px] sm:text-xs text-white/50">
                        {t("airtracking.origin")}
                      </p>
                      <p className="text-white font-medium text-xs sm:text-sm md:text-base truncate">
                        {result.origin}
                      </p>
                    </div>
                    <div className="flex-1 mx-2 sm:mx-4 h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50 relative min-w-[40px]">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full animate-pulse" />
                    </div>
                    <div className="text-center min-w-0 flex-shrink">
                      <p className="text-[10px] sm:text-xs text-white/50">
                        {t("airtracking.destination")}
                      </p>
                      <p className="text-white font-medium text-xs sm:text-sm md:text-base truncate">
                        {result.destination}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Last Updated */}
                <p className="text-xs sm:text-sm text-white/40 text-center">
                  {t("airtracking.updated")}: {result.lastUpdated}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AirTracking;
