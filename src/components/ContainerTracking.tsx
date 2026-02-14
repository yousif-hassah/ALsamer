import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Search,
  MapPin,
  Ship,
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
  containerNumber: string;
  status: string;
  location: string;
  vessel: string;
  eta: string;
  origin: string;
  destination: string;
  lastUpdated: string;
  coordinates: { lat: number; lng: number };
  route: { lat: number; lng: number }[];
  isLive: boolean;
}

const ContainerTracking = () => {
  const { t, isRTL } = useLanguage();
  const [containerNumber, setContainerNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Validate container number format (standard ISO 6346)
  const validateContainerNumber = (num: string): boolean => {
    const pattern = /^[A-Z]{4}[0-9]{7}$/i;
    return pattern.test(num.replace(/\s/g, ""));
  };

  const handleTrack = async () => {
    setError(null);
    setResult(null);

    const cleanNumber = containerNumber.trim().toUpperCase().replace(/\s/g, "");

    if (!cleanNumber) {
      setError(t("tracking.invalid"));
      return;
    }

    if (!validateContainerNumber(cleanNumber)) {
      setError(t("tracking.invalid"));
      return;
    }

    setIsSearching(true);

    try {
      const apiKey = import.meta.env.VITE_TRACKINGMORE_API_KEY;

      // Step 1: Try to create/register the tracking number first (so it exists in TrackingMore)
      // This allows the system to work even if you haven't added the number manually
      try {
        await fetch("https://api.trackingmore.com/v4/trackings/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Tracking-Api-Key": apiKey,
          },
          body: JSON.stringify({
            tracking_number: cleanNumber,
            courier_code: "ocean", // Default for containers, or omit for auto-detect
          }),
        });
      } catch (e) {
        console.log(
          "Tracking already exists or creation failed, proceeding to fetch...",
        );
      }

      // Step 2: Fetch the tracking data
      const response = await fetch(
        `https://api.trackingmore.com/v4/trackings/get?tracking_numbers=${cleanNumber}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Tracking-Api-Key": apiKey,
          },
        },
      );

      if (!response.ok) {
        throw new Error("TrackingMore API Error");
      }

      const apiResult = await response.json();

      if (
        apiResult.code === 200 &&
        apiResult.data &&
        apiResult.data.length > 0
      ) {
        const data = apiResult.data[0];
        setResult({
          containerNumber: cleanNumber,
          status: data.delivery_status || "In Transit",
          location: data.last_event || "At Sea",
          vessel: data.vessel_name || "N/A",
          eta: data.scheduled_delivery_date || "N/A",
          origin: data.origin_country_code || "N/A",
          destination: data.destination_country_code || "N/A",
          lastUpdated: new Date().toLocaleString(),
          coordinates: {
            lat: 25.0,
            lng: 55.0,
          },
          route: [],
          isLive: true,
        });
        setIsSearching(false);
        return;
      } else {
        throw new Error("No data found in TrackingMore");
      }
    } catch (error) {
      console.log("Falling back to simulation:", error);
      // Comprehensive global routes covering all continents
      const routes = [
        // Arab Countries - Iraq and all Arab nations
        {
          origin: "Shanghai, China",
          destination: "Baghdad, Iraq",
          location: "Persian Gulf",
          vessel: "MAERSK SELETAR",
          coordinates: { lat: 29.5, lng: 48.5 },
          route: [
            { lat: 31.2304, lng: 121.4737 },
            { lat: 1.3521, lng: 103.8198 },
            { lat: 29.5, lng: 48.5 },
            { lat: 30.5085, lng: 47.7804 },
          ],
        },
        {
          origin: "Hamburg, Germany",
          destination: "Basra, Iraq",
          location: "Arabian Gulf",
          vessel: "HAPAG IRAQ",
          coordinates: { lat: 28.5, lng: 50.0 },
          route: [
            { lat: 53.5511, lng: 9.9937 },
            { lat: 27.8579, lng: 34.2853 },
            { lat: 28.5, lng: 50.0 },
            { lat: 30.5085, lng: 47.7804 },
          ],
        },
        {
          origin: "Los Angeles, USA",
          destination: "Jeddah, Saudi Arabia",
          location: "Red Sea",
          vessel: "EVER GIVEN",
          coordinates: { lat: 21.4858, lng: 39.1925 },
          route: [
            { lat: 33.7501, lng: -118.265 },
            { lat: 8.9824, lng: -79.5199 },
            { lat: 27.8579, lng: 34.2853 },
            { lat: 21.4858, lng: 39.1925 },
          ],
        },
        {
          origin: "Rotterdam, Netherlands",
          destination: "Dammam, Saudi Arabia",
          location: "Suez Canal",
          vessel: "HAPAG LLOYD",
          coordinates: { lat: 30.0444, lng: 32.34 },
          route: [
            { lat: 51.9244, lng: 4.4777 },
            { lat: 35.8989, lng: 14.5146 },
            { lat: 30.0444, lng: 32.34 },
            { lat: 26.4207, lng: 50.0888 },
          ],
        },
        {
          origin: "Mumbai, India",
          destination: "Dubai, UAE",
          location: "Arabian Sea",
          vessel: "MSC GULSUN",
          coordinates: { lat: 22.5, lng: 64.2 },
          route: [
            { lat: 19.076, lng: 72.8777 },
            { lat: 22.5, lng: 64.2 },
            { lat: 25.0657, lng: 55.1713 },
          ],
        },
        {
          origin: "Alexandria, Egypt",
          destination: "Casablanca, Morocco",
          location: "Gibraltar Strait",
          vessel: "CMA CGM TITAN",
          coordinates: { lat: 36.1408, lng: -5.3536 },
          route: [
            { lat: 31.2001, lng: 29.9187 },
            { lat: 36.1408, lng: -5.3536 },
            { lat: 33.5731, lng: -7.5898 },
          ],
        },
        {
          origin: "Tokyo, Japan",
          destination: "Muscat, Oman",
          location: "Indian Ocean",
          vessel: "NYK OLYMPUS",
          coordinates: { lat: 6.9271, lng: 79.8612 },
          route: [
            { lat: 35.6762, lng: 139.6503 },
            { lat: 1.3521, lng: 103.8198 },
            { lat: 6.9271, lng: 79.8612 },
            { lat: 23.61, lng: 58.54 },
          ],
        },
        {
          origin: "Rotterdam, Netherlands",
          destination: "Kuwait City, Kuwait",
          location: "Mediterranean Sea",
          vessel: "COSCO GALAXY",
          coordinates: { lat: 35.8989, lng: 14.5146 },
          route: [
            { lat: 51.9244, lng: 4.4777 },
            { lat: 35.8989, lng: 14.5146 },
            { lat: 27.8579, lng: 34.2853 },
            { lat: 29.3759, lng: 47.9774 },
          ],
        },
        {
          origin: "Glasgow, Scotland",
          destination: "Doha, Qatar",
          location: "Gulf of Aden",
          vessel: "EVERGREEN HARMONY",
          coordinates: { lat: 12.8628, lng: 45.0355 },
          route: [
            { lat: 55.8642, lng: -4.2518 },
            { lat: 36.1408, lng: -5.3536 },
            { lat: 12.8628, lng: 45.0355 },
            { lat: 25.2854, lng: 51.531 },
          ],
        },
        {
          origin: "Shanghai, China",
          destination: "Aqaba, Jordan",
          location: "Red Sea",
          vessel: "OOCL BERLIN",
          coordinates: { lat: 23.5, lng: 38.0 },
          route: [
            { lat: 31.2304, lng: 121.4737 },
            { lat: 1.3521, lng: 103.8198 },
            { lat: 23.5, lng: 38.0 },
            { lat: 29.5267, lng: 35.0078 },
          ],
        },
        {
          origin: "New York, USA",
          destination: "Beirut, Lebanon",
          location: "Eastern Mediterranean",
          vessel: "MSC OSCAR",
          coordinates: { lat: 34.5, lng: 33.0 },
          route: [
            { lat: 40.7128, lng: -74.006 },
            { lat: 36.1408, lng: -5.3536 },
            { lat: 34.5, lng: 33.0 },
            { lat: 33.8938, lng: 35.5018 },
          ],
        },
        {
          origin: "Guangzhou, China",
          destination: "Amman (via Aqaba), Jordan",
          location: "Strait of Malacca",
          vessel: "YANG MING MARVEL",
          coordinates: { lat: 1.3521, lng: 103.8198 },
          route: [
            { lat: 23.1291, lng: 113.2644 },
            { lat: 1.3521, lng: 103.8198 },
            { lat: 27.8579, lng: 34.2853 },
            { lat: 29.5267, lng: 35.0078 },
          ],
        },
        {
          origin: "Barcelona, Spain",
          destination: "Tunis, Tunisia",
          location: "Western Mediterranean",
          vessel: "MAERSK KOTKA",
          coordinates: { lat: 38.5, lng: 5.0 },
          route: [
            { lat: 41.3851, lng: 2.1734 },
            { lat: 38.5, lng: 5.0 },
            { lat: 36.8065, lng: 10.1815 },
          ],
        },
        {
          origin: "Marseille, France",
          destination: "Algiers, Algeria",
          location: "Mediterranean Sea",
          vessel: "CMA CGM LIBERTY",
          coordinates: { lat: 38.0, lng: 4.0 },
          route: [
            { lat: 43.2965, lng: 5.3698 },
            { lat: 38.0, lng: 4.0 },
            { lat: 36.7538, lng: 3.0588 },
          ],
        },
        {
          origin: "Genoa, Italy",
          destination: "Tripoli, Libya",
          location: "Tyrrhenian Sea",
          vessel: "EVERGREEN ELITE",
          coordinates: { lat: 39.5, lng: 12.0 },
          route: [
            { lat: 44.4056, lng: 8.9463 },
            { lat: 39.5, lng: 12.0 },
            { lat: 32.8872, lng: 13.1913 },
          ],
        },
        {
          origin: "Athens, Greece",
          destination: "Alexandria, Egypt",
          location: "Eastern Mediterranean",
          vessel: "COSCO HOPE",
          coordinates: { lat: 33.0, lng: 28.0 },
          route: [
            { lat: 37.9838, lng: 23.7275 },
            { lat: 33.0, lng: 28.0 },
            { lat: 31.2001, lng: 29.9187 },
          ],
        },
        {
          origin: "Istanbul, Turkey",
          destination: "Latakia, Syria",
          location: "Aegean Sea",
          vessel: "MSC MAYA",
          coordinates: { lat: 37.0, lng: 28.0 },
          route: [
            { lat: 41.0082, lng: 28.9784 },
            { lat: 37.0, lng: 28.0 },
            { lat: 35.5317, lng: 35.7917 },
          ],
        },
        {
          origin: "Singapore",
          destination: "Erbil (via Basra), Iraq",
          location: "Gulf of Oman",
          vessel: "PIL SINGAPORE",
          coordinates: { lat: 24.5, lng: 58.5 },
          route: [
            { lat: 1.3521, lng: 103.8198 },
            { lat: 24.5, lng: 58.5 },
            { lat: 30.5085, lng: 47.7804 },
          ],
        },
        {
          origin: "Busan, South Korea",
          destination: "Abu Dhabi, UAE",
          location: "Bay of Bengal",
          vessel: "HYUNDAI FAITH",
          coordinates: { lat: 10.0, lng: 85.0 },
          route: [
            { lat: 35.1796, lng: 129.0756 },
            { lat: 1.3521, lng: 103.8198 },
            { lat: 10.0, lng: 85.0 },
            { lat: 24.4539, lng: 54.3773 },
          ],
        },
        {
          origin: "Ho Chi Minh City, Vietnam",
          destination: "Manama, Bahrain",
          location: "Arabian Sea",
          vessel: "EVERGREEN EVER",
          coordinates: { lat: 15.0, lng: 68.0 },
          route: [
            { lat: 10.8231, lng: 106.6297 },
            { lat: 1.3521, lng: 103.8198 },
            { lat: 15.0, lng: 68.0 },
            { lat: 26.0667, lng: 50.5577 },
          ],
        },
        {
          origin: "Manila, Philippines",
          destination: "Salalah, Oman",
          location: "South China Sea",
          vessel: "PHILIPPINE STAR",
          coordinates: { lat: 8.0, lng: 115.0 },
          route: [
            { lat: 14.5995, lng: 120.9842 },
            { lat: 8.0, lng: 115.0 },
            { lat: 1.3521, lng: 103.8198 },
            { lat: 17.0151, lng: 54.0924 },
          ],
        },
        {
          origin: "New York, USA",
          destination: "Sana'a (via Aden), Yemen",
          location: "Gulf of Aden",
          vessel: "ATLANTIC YEMEN",
          coordinates: { lat: 12.5, lng: 44.0 },
          route: [
            { lat: 40.7128, lng: -74.006 },
            { lat: 36.1408, lng: -5.3536 },
            { lat: 27.8579, lng: 34.2853 },
            { lat: 12.5, lng: 44.0 },
          ],
        },
        {
          origin: "London, UK",
          destination: "Khartoum (via Port Sudan), Sudan",
          location: "Red Sea",
          vessel: "UK SUDAN EXPRESS",
          coordinates: { lat: 20.0, lng: 38.0 },
          route: [
            { lat: 51.5074, lng: -0.1278 },
            { lat: 36.1408, lng: -5.3536 },
            { lat: 27.8579, lng: 34.2853 },
            { lat: 19.6158, lng: 37.2164 },
          ],
        },
        {
          origin: "Tokyo, Japan",
          destination: "Djibouti City, Djibouti",
          location: "Indian Ocean",
          vessel: "NYK DJIBOUTI",
          coordinates: { lat: 5.0, lng: 55.0 },
          route: [
            { lat: 35.6762, lng: 139.6503 },
            { lat: 1.3521, lng: 103.8198 },
            { lat: 5.0, lng: 55.0 },
            { lat: 11.5886, lng: 43.1456 },
          ],
        },
        {
          origin: "Hamburg, Germany",
          destination: "Nouakchott, Mauritania",
          location: "Atlantic Ocean",
          vessel: "HAPAG MAURITANIA",
          coordinates: { lat: 20.0, lng: -18.0 },
          route: [
            { lat: 53.5511, lng: 9.9937 },
            { lat: 36.1408, lng: -5.3536 },
            { lat: 20.0, lng: -18.0 },
            { lat: 18.0735, lng: -15.9582 },
          ],
        },
        // Asia - China, Vietnam, all Asian countries
        {
          origin: "Los Angeles, USA",
          destination: "Shanghai, China",
          location: "Pacific Ocean",
          vessel: "COSCO SHIPPING",
          coordinates: { lat: 30.0, lng: -150.0 },
          route: [
            { lat: 33.7501, lng: -118.265 },
            { lat: 30.0, lng: -150.0 },
            { lat: 31.2304, lng: 121.4737 },
          ],
        },
        {
          origin: "Hamburg, Germany",
          destination: "Ho Chi Minh City, Vietnam",
          location: "Indian Ocean",
          vessel: "HAPAG EXPRESS",
          coordinates: { lat: 5.0, lng: 80.0 },
          route: [
            { lat: 53.5511, lng: 9.9937 },
            { lat: 27.8579, lng: 34.2853 },
            { lat: 5.0, lng: 80.0 },
            { lat: 10.8231, lng: 106.6297 },
          ],
        },
        {
          origin: "New York, USA",
          destination: "Tokyo, Japan",
          location: "North Pacific",
          vessel: "MOL TRIUMPH",
          coordinates: { lat: 40.0, lng: -160.0 },
          route: [
            { lat: 40.7128, lng: -74.006 },
            { lat: 8.9824, lng: -79.5199 },
            { lat: 40.0, lng: -160.0 },
            { lat: 35.6762, lng: 139.6503 },
          ],
        },
        {
          origin: "Rotterdam, Netherlands",
          destination: "Singapore",
          location: "Strait of Malacca",
          vessel: "MAERSK MC-KINNEY",
          coordinates: { lat: 2.5, lng: 100.0 },
          route: [
            { lat: 51.9244, lng: 4.4777 },
            { lat: 27.8579, lng: 34.2853 },
            { lat: 2.5, lng: 100.0 },
            { lat: 1.3521, lng: 103.8198 },
          ],
        },
        {
          origin: "Jeddah, Saudi Arabia",
          destination: "Jakarta, Indonesia",
          location: "Bay of Bengal",
          vessel: "SAUDI VOYAGER",
          coordinates: { lat: 5.0, lng: 85.0 },
          route: [
            { lat: 21.4858, lng: 39.1925 },
            { lat: 12.8628, lng: 45.0355 },
            { lat: 5.0, lng: 85.0 },
            { lat: -6.2088, lng: 106.8456 },
          ],
        },
        {
          origin: "Dubai, UAE",
          destination: "Bangkok, Thailand",
          location: "Andaman Sea",
          vessel: "EMIRATES EXPRESS",
          coordinates: { lat: 8.0, lng: 95.0 },
          route: [
            { lat: 25.0657, lng: 55.1713 },
            { lat: 19.076, lng: 72.8777 },
            { lat: 8.0, lng: 95.0 },
            { lat: 13.7563, lng: 100.5018 },
          ],
        },
        {
          origin: "Busan, South Korea",
          destination: "Mumbai, India",
          location: "South China Sea",
          vessel: "HYUNDAI SMART",
          coordinates: { lat: 12.0, lng: 110.0 },
          route: [
            { lat: 35.1796, lng: 129.0756 },
            { lat: 22.3193, lng: 114.1694 },
            { lat: 12.0, lng: 110.0 },
            { lat: 19.076, lng: 72.8777 },
          ],
        },
        {
          origin: "Shenzhen, China",
          destination: "Colombo, Sri Lanka",
          location: "Bay of Bengal",
          vessel: "COSCO FAITH",
          coordinates: { lat: 8.0, lng: 85.0 },
          route: [
            { lat: 22.5431, lng: 114.0579 },
            { lat: 1.3521, lng: 103.8198 },
            { lat: 8.0, lng: 85.0 },
            { lat: 6.9271, lng: 79.8612 },
          ],
        },
        {
          origin: "Hanoi, Vietnam",
          destination: "Karachi, Pakistan",
          location: "Arabian Sea",
          vessel: "VIETNAM GLORY",
          coordinates: { lat: 18.0, lng: 70.0 },
          route: [
            { lat: 21.0278, lng: 105.8342 },
            { lat: 1.3521, lng: 103.8198 },
            { lat: 18.0, lng: 70.0 },
            { lat: 24.8607, lng: 67.0011 },
          ],
        },
        {
          origin: "Los Angeles, USA",
          destination: "Haiphong, Vietnam",
          location: "Pacific Ocean",
          vessel: "PACIFIC VIETNAM",
          coordinates: { lat: 25.0, lng: 140.0 },
          route: [
            { lat: 33.7501, lng: -118.265 },
            { lat: 25.0, lng: 140.0 },
            { lat: 20.8449, lng: 106.6881 },
          ],
        },
        {
          origin: "Rotterdam, Netherlands",
          destination: "Manila, Philippines",
          location: "South China Sea",
          vessel: "MAERSK MANILA",
          coordinates: { lat: 10.0, lng: 115.0 },
          route: [
            { lat: 51.9244, lng: 4.4777 },
            { lat: 27.8579, lng: 34.2853 },
            { lat: 1.3521, lng: 103.8198 },
            { lat: 14.5995, lng: 120.9842 },
          ],
        },
        {
          origin: "New York, USA",
          destination: "Kuala Lumpur (Port Klang), Malaysia",
          location: "Indian Ocean",
          vessel: "NYK MALAYSIA",
          coordinates: { lat: 5.0, lng: 80.0 },
          route: [
            { lat: 40.7128, lng: -74.006 },
            { lat: 27.8579, lng: 34.2853 },
            { lat: 5.0, lng: 80.0 },
            { lat: 3.0738, lng: 101.5183 },
          ],
        },
        // Africa
        {
          origin: "Shanghai, China",
          destination: "Mombasa, Kenya",
          location: "Indian Ocean",
          vessel: "COSCO AFRICA",
          coordinates: { lat: -2.0, lng: 55.0 },
          route: [
            { lat: 31.2304, lng: 121.4737 },
            { lat: 1.3521, lng: 103.8198 },
            { lat: -2.0, lng: 55.0 },
            { lat: -4.0435, lng: 39.6682 },
          ],
        },
        {
          origin: "Rotterdam, Netherlands",
          destination: "Cape Town, South Africa",
          location: "Atlantic Ocean",
          vessel: "MAERSK CAPE",
          coordinates: { lat: -15.0, lng: -5.0 },
          route: [
            { lat: 51.9244, lng: 4.4777 },
            { lat: 14.6928, lng: -17.4467 },
            { lat: -15.0, lng: -5.0 },
            { lat: -33.9249, lng: 18.4241 },
          ],
        },
        {
          origin: "Dubai, UAE",
          destination: "Dar es Salaam, Tanzania",
          location: "Arabian Sea",
          vessel: "EMIRATES STAR",
          coordinates: { lat: 5.0, lng: 50.0 },
          route: [
            { lat: 25.0657, lng: 55.1713 },
            { lat: 12.8628, lng: 45.0355 },
            { lat: 5.0, lng: 50.0 },
            { lat: -6.7924, lng: 39.2083 },
          ],
        },
        {
          origin: "Marseille, France",
          destination: "Lagos, Nigeria",
          location: "Gulf of Guinea",
          vessel: "CMA CGM LAGOS",
          coordinates: { lat: 4.0, lng: 0.0 },
          route: [
            { lat: 43.2965, lng: 5.3698 },
            { lat: 36.1408, lng: -5.3536 },
            { lat: 4.0, lng: 0.0 },
            { lat: 6.5244, lng: 3.3792 },
          ],
        },
        {
          origin: "Singapore",
          destination: "Durban, South Africa",
          location: "Mozambique Channel",
          vessel: "PIL DURBAN",
          coordinates: { lat: -20.0, lng: 40.0 },
          route: [
            { lat: 1.3521, lng: 103.8198 },
            { lat: -4.0435, lng: 39.6682 },
            { lat: -20.0, lng: 40.0 },
            { lat: -29.8587, lng: 31.0218 },
          ],
        },
        {
          origin: "New York, USA",
          destination: "Accra, Ghana",
          location: "Central Atlantic",
          vessel: "ATLANTIC CARGO",
          coordinates: { lat: 10.0, lng: -25.0 },
          route: [
            { lat: 40.7128, lng: -74.006 },
            { lat: 10.0, lng: -25.0 },
            { lat: 5.6037, lng: -0.187 },
          ],
        },
        {
          origin: "Hamburg, Germany",
          destination: "Abidjan, Ivory Coast",
          location: "Atlantic Ocean",
          vessel: "HAPAG AFRICA",
          coordinates: { lat: 10.0, lng: -10.0 },
          route: [
            { lat: 53.5511, lng: 9.9937 },
            { lat: 36.1408, lng: -5.3536 },
            { lat: 10.0, lng: -10.0 },
            { lat: 5.36, lng: -4.0083 },
          ],
        },
        {
          origin: "Shanghai, China",
          destination: "Maputo, Mozambique",
          location: "Indian Ocean",
          vessel: "COSCO MOZAMBIQUE",
          coordinates: { lat: -15.0, lng: 50.0 },
          route: [
            { lat: 31.2304, lng: 121.4737 },
            { lat: 1.3521, lng: 103.8198 },
            { lat: -15.0, lng: 50.0 },
            { lat: -25.9692, lng: 32.5732 },
          ],
        },
        // North America
        {
          origin: "Shanghai, China",
          destination: "Los Angeles, USA",
          location: "Mid Pacific",
          vessel: "EVERGREEN PACIFIC",
          coordinates: { lat: 35.0, lng: -150.0 },
          route: [
            { lat: 31.2304, lng: 121.4737 },
            { lat: 35.6762, lng: 139.6503 },
            { lat: 35.0, lng: -150.0 },
            { lat: 33.7501, lng: -118.265 },
          ],
        },
        {
          origin: "Hamburg, Germany",
          destination: "New York, USA",
          location: "North Atlantic",
          vessel: "MSC ATLANTIC",
          coordinates: { lat: 45.0, lng: -40.0 },
          route: [
            { lat: 53.5511, lng: 9.9937 },
            { lat: 51.5074, lng: -0.1278 },
            { lat: 45.0, lng: -40.0 },
            { lat: 40.7128, lng: -74.006 },
          ],
        },
        {
          origin: "Dubai, UAE",
          destination: "Houston, USA",
          location: "Caribbean Sea",
          vessel: "GULF EXPRESS",
          coordinates: { lat: 18.0, lng: -75.0 },
          route: [
            { lat: 25.0657, lng: 55.1713 },
            { lat: 27.8579, lng: 34.2853 },
            { lat: 36.1408, lng: -5.3536 },
            { lat: 18.0, lng: -75.0 },
            { lat: 29.7604, lng: -95.3698 },
          ],
        },
        {
          origin: "Tokyo, Japan",
          destination: "Vancouver, Canada",
          location: "North Pacific",
          vessel: "NYK CANADA",
          coordinates: { lat: 45.0, lng: -160.0 },
          route: [
            { lat: 35.6762, lng: 139.6503 },
            { lat: 45.0, lng: -160.0 },
            { lat: 49.2827, lng: -123.1207 },
          ],
        },
        {
          origin: "Jeddah, Saudi Arabia",
          destination: "Miami, USA",
          location: "Atlantic Ocean",
          vessel: "SAUDI ATLANTIC",
          coordinates: { lat: 25.0, lng: -50.0 },
          route: [
            { lat: 21.4858, lng: 39.1925 },
            { lat: 27.8579, lng: 34.2853 },
            { lat: 36.1408, lng: -5.3536 },
            { lat: 25.0, lng: -50.0 },
            { lat: 25.7617, lng: -80.1918 },
          ],
        },
        {
          origin: "Busan, South Korea",
          destination: "Seattle, USA",
          location: "North Pacific",
          vessel: "HYUNDAI SEATTLE",
          coordinates: { lat: 45.0, lng: -170.0 },
          route: [
            { lat: 35.1796, lng: 129.0756 },
            { lat: 45.0, lng: -170.0 },
            { lat: 47.6062, lng: -122.3321 },
          ],
        },
        {
          origin: "Ho Chi Minh City, Vietnam",
          destination: "Long Beach, USA",
          location: "Pacific Ocean",
          vessel: "VIETNAM PACIFIC",
          coordinates: { lat: 30.0, lng: -140.0 },
          route: [
            { lat: 10.8231, lng: 106.6297 },
            { lat: 30.0, lng: -140.0 },
            { lat: 33.7701, lng: -118.1937 },
          ],
        },
        // South America
        {
          origin: "Shanghai, China",
          destination: "Santos, Brazil",
          location: "South Atlantic",
          vessel: "COSCO BRASIL",
          coordinates: { lat: -15.0, lng: -25.0 },
          route: [
            { lat: 31.2304, lng: 121.4737 },
            { lat: 1.3521, lng: 103.8198 },
            { lat: -33.9249, lng: 18.4241 },
            { lat: -15.0, lng: -25.0 },
            { lat: -23.9608, lng: -46.3336 },
          ],
        },
        {
          origin: "Rotterdam, Netherlands",
          destination: "Buenos Aires, Argentina",
          location: "South Atlantic",
          vessel: "MAERSK ARGENTINA",
          coordinates: { lat: -25.0, lng: -35.0 },
          route: [
            { lat: 51.9244, lng: 4.4777 },
            { lat: 14.6928, lng: -17.4467 },
            { lat: -25.0, lng: -35.0 },
            { lat: -34.6037, lng: -58.3816 },
          ],
        },
        {
          origin: "Los Angeles, USA",
          destination: "Valparaiso, Chile",
          location: "Eastern Pacific",
          vessel: "PACIFIC CHILE",
          coordinates: { lat: -10.0, lng: -90.0 },
          route: [
            { lat: 33.7501, lng: -118.265 },
            { lat: 8.9824, lng: -79.5199 },
            { lat: -10.0, lng: -90.0 },
            { lat: -33.0472, lng: -71.6127 },
          ],
        },
        {
          origin: "Hamburg, Germany",
          destination: "Lima (Callao), Peru",
          location: "Caribbean Sea",
          vessel: "HAPAG PERU",
          coordinates: { lat: 10.0, lng: -75.0 },
          route: [
            { lat: 53.5511, lng: 9.9937 },
            { lat: 10.0, lng: -75.0 },
            { lat: 8.9824, lng: -79.5199 },
            { lat: -12.0464, lng: -77.0428 },
          ],
        },
        {
          origin: "Dubai, UAE",
          destination: "Cartagena, Colombia",
          location: "Central Atlantic",
          vessel: "EMIRATES COLOMBIA",
          coordinates: { lat: 5.0, lng: -40.0 },
          route: [
            { lat: 25.0657, lng: 55.1713 },
            { lat: 27.8579, lng: 34.2853 },
            { lat: 36.1408, lng: -5.3536 },
            { lat: 5.0, lng: -40.0 },
            { lat: 10.391, lng: -75.4794 },
          ],
        },
        {
          origin: "Tokyo, Japan",
          destination: "Guayaquil, Ecuador",
          location: "Pacific Ocean",
          vessel: "NYK ECUADOR",
          coordinates: { lat: 5.0, lng: -100.0 },
          route: [
            { lat: 35.6762, lng: 139.6503 },
            { lat: 5.0, lng: -100.0 },
            { lat: -2.171, lng: -79.9224 },
          ],
        },
        {
          origin: "New York, USA",
          destination: "Montevideo, Uruguay",
          location: "South Atlantic",
          vessel: "MSC URUGUAY",
          coordinates: { lat: -20.0, lng: -40.0 },
          route: [
            { lat: 40.7128, lng: -74.006 },
            { lat: 0.0, lng: -30.0 },
            { lat: -20.0, lng: -40.0 },
            { lat: -34.9011, lng: -56.1645 },
          ],
        },
        // Europe
        {
          origin: "Shanghai, China",
          destination: "Rotterdam, Netherlands",
          location: "Indian Ocean",
          vessel: "COSCO EUROPE",
          coordinates: { lat: 10.0, lng: 75.0 },
          route: [
            { lat: 31.2304, lng: 121.4737 },
            { lat: 1.3521, lng: 103.8198 },
            { lat: 10.0, lng: 75.0 },
            { lat: 27.8579, lng: 34.2853 },
            { lat: 51.9244, lng: 4.4777 },
          ],
        },
        {
          origin: "Los Angeles, USA",
          destination: "Hamburg, Germany",
          location: "North Atlantic",
          vessel: "MSC EUROPA",
          coordinates: { lat: 50.0, lng: -30.0 },
          route: [
            { lat: 33.7501, lng: -118.265 },
            { lat: 8.9824, lng: -79.5199 },
            { lat: 50.0, lng: -30.0 },
            { lat: 53.5511, lng: 9.9937 },
          ],
        },
        {
          origin: "Dubai, UAE",
          destination: "Barcelona, Spain",
          location: "Western Mediterranean",
          vessel: "EMIRATES BARCELONA",
          coordinates: { lat: 37.0, lng: 2.0 },
          route: [
            { lat: 25.0657, lng: 55.1713 },
            { lat: 27.8579, lng: 34.2853 },
            { lat: 37.0, lng: 2.0 },
            { lat: 41.3851, lng: 2.1734 },
          ],
        },
        {
          origin: "Tokyo, Japan",
          destination: "Antwerp, Belgium",
          location: "Arabian Sea",
          vessel: "NYK BELGIUM",
          coordinates: { lat: 15.0, lng: 60.0 },
          route: [
            { lat: 35.6762, lng: 139.6503 },
            { lat: 1.3521, lng: 103.8198 },
            { lat: 15.0, lng: 60.0 },
            { lat: 27.8579, lng: 34.2853 },
            { lat: 51.2194, lng: 4.4025 },
          ],
        },
        {
          origin: "Singapore",
          destination: "London, UK",
          location: "Bay of Biscay",
          vessel: "PIL LONDON",
          coordinates: { lat: 45.0, lng: -5.0 },
          route: [
            { lat: 1.3521, lng: 103.8198 },
            { lat: 27.8579, lng: 34.2853 },
            { lat: 36.1408, lng: -5.3536 },
            { lat: 45.0, lng: -5.0 },
            { lat: 51.5074, lng: -0.1278 },
          ],
        },
        {
          origin: "Mumbai, India",
          destination: "Piraeus, Greece",
          location: "Eastern Mediterranean",
          vessel: "INDIA GREECE",
          coordinates: { lat: 33.0, lng: 30.0 },
          route: [
            { lat: 19.076, lng: 72.8777 },
            { lat: 27.8579, lng: 34.2853 },
            { lat: 33.0, lng: 30.0 },
            { lat: 37.9415, lng: 23.647 },
          ],
        },
        {
          origin: "Jeddah, Saudi Arabia",
          destination: "Genoa, Italy",
          location: "Tyrrhenian Sea",
          vessel: "SAUDI ITALIA",
          coordinates: { lat: 40.0, lng: 12.0 },
          route: [
            { lat: 21.4858, lng: 39.1925 },
            { lat: 27.8579, lng: 34.2853 },
            { lat: 40.0, lng: 12.0 },
            { lat: 44.4056, lng: 8.9463 },
          ],
        },
        {
          origin: "Busan, South Korea",
          destination: "Gdansk, Poland",
          location: "Baltic Sea",
          vessel: "HYUNDAI BALTIC",
          coordinates: { lat: 55.0, lng: 15.0 },
          route: [
            { lat: 35.1796, lng: 129.0756 },
            { lat: 1.3521, lng: 103.8198 },
            { lat: 27.8579, lng: 34.2853 },
            { lat: 55.0, lng: 15.0 },
            { lat: 54.352, lng: 18.6466 },
          ],
        },
        {
          origin: "Ho Chi Minh City, Vietnam",
          destination: "Lisbon, Portugal",
          location: "Atlantic Ocean",
          vessel: "VIETNAM PORTUGAL",
          coordinates: { lat: 35.0, lng: -15.0 },
          route: [
            { lat: 10.8231, lng: 106.6297 },
            { lat: 1.3521, lng: 103.8198 },
            { lat: 27.8579, lng: 34.2853 },
            { lat: 35.0, lng: -15.0 },
            { lat: 38.7223, lng: -9.1393 },
          ],
        },
        {
          origin: "Baghdad, Iraq",
          destination: "Dublin, Ireland",
          location: "English Channel",
          vessel: "IRAQ IRELAND EXPRESS",
          coordinates: { lat: 50.0, lng: -3.0 },
          route: [
            { lat: 30.5085, lng: 47.7804 },
            { lat: 27.8579, lng: 34.2853 },
            { lat: 36.1408, lng: -5.3536 },
            { lat: 50.0, lng: -3.0 },
            { lat: 53.3498, lng: -6.2603 },
          ],
        },
        {
          origin: "Alexandria, Egypt",
          destination: "Oslo, Norway",
          location: "North Sea",
          vessel: "NORDIC NILE",
          coordinates: { lat: 58.0, lng: 5.0 },
          route: [
            { lat: 31.2001, lng: 29.9187 },
            { lat: 36.1408, lng: -5.3536 },
            { lat: 58.0, lng: 5.0 },
            { lat: 59.9139, lng: 10.7522 },
          ],
        },
      ];

      // Use container number to deterministically select a route
      const hash = cleanNumber
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const selectedRoute = routes[hash % routes.length];

      const statuses = [
        "In Transit",
        "At Port",
        "Customs Clearance",
        "Loading",
        "Unloading",
      ];
      const selectedStatus = statuses[hash % statuses.length];

      const daysToAdd = (hash % 30) + 3;
      const etaDate = new Date();
      etaDate.setDate(etaDate.getDate() + daysToAdd);

      setResult({
        containerNumber: cleanNumber,
        status: selectedStatus,
        location: selectedRoute.location,
        vessel: selectedRoute.vessel,
        eta: etaDate.toISOString().split("T")[0],
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

    // Custom marker icon
    const containerIcon = L.divIcon({
      className: "custom-marker",
      html: `<div style="background: linear-gradient(135deg, hsl(43, 100%, 50%), hsl(48, 100%, 60%)); width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;">
        <svg width="12" height="12" fill="hsl(0, 0%, 5%)" viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z"/></svg>
      </div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    // Add marker for current location
    L.marker([result.coordinates.lat, result.coordinates.lng], {
      icon: containerIcon,
    })
      .addTo(map)
      .bindPopup(
        `<strong>${result.containerNumber}</strong><br/>${result.location}`,
      )
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

      // Add port markers
      result.route.forEach((point, index) => {
        const portIcon = L.divIcon({
          className: "port-marker",
          html: `<div style="background: ${index === result.route.length - 1 ? "hsl(43, 100%, 50%)" : "white"}; width: 10px; height: 10px; border-radius: 50%; border: 2px solid hsl(43, 100%, 50%);"></div>`,
          iconSize: [10, 10],
          iconAnchor: [5, 5],
        });
        L.marker([point.lat, point.lng], { icon: portIcon }).addTo(map);
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
      id="tracking"
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
            {t("tracking.tag")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            {t("tracking.title")}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base px-2">
            {t("tracking.subtitle")}
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
                placeholder={t("tracking.placeholder")}
                value={containerNumber}
                onChange={(e) =>
                  setContainerNumber(e.target.value.toUpperCase())
                }
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
                    {t("tracking.searching")}
                  </span>
                </>
              ) : (
                <span className="text-sm sm:text-base">
                  {t("tracking.button")}
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
                {/* Container Info Card */}
                <div className="glass-card p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-3">
                      <div className="icon-circle w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                        <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-xl font-bold text-white truncate">
                          {result.containerNumber}
                        </h3>
                        <span
                          className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold mt-1 uppercase tracking-wider ${
                            result.status === "Delivered"
                              ? "bg-green-500/20 text-green-400"
                              : result.status === "At Port"
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

                  <div className="space-y-3 sm:space-y-4 pt-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs text-white/50">
                          {t("tracking.location")}
                        </p>
                        <p className="text-white font-medium text-sm sm:text-base truncate">
                          {result.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <Ship className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs text-white/50">
                          {t("tracking.vessel")}
                        </p>
                        <p className="text-white font-medium text-sm sm:text-base truncate">
                          {result.vessel}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-[10px] sm:text-xs text-white/50">
                          {t("tracking.eta")}
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
                    Shipment Route
                  </h4>
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-center min-w-0 flex-shrink">
                      <p className="text-[10px] sm:text-xs text-white/50">
                        {t("tracking.origin")}
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
                        {t("tracking.destination")}
                      </p>
                      <p className="text-white font-medium text-xs sm:text-sm md:text-base truncate">
                        {result.destination}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Last Updated */}
                <p className="text-xs sm:text-sm text-white/40 text-center">
                  {t("tracking.updated")}: {result.lastUpdated}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ContainerTracking;
