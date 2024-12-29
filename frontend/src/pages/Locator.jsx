import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import customLocationIcon from "/mylocation.png";
import axios from "axios";
import { RefreshCw } from "lucide-react";

const customIcon = new Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
});

const yourLocationIcon = new Icon({
  iconUrl: customLocationIcon,
  iconSize: [50, 55],
  iconAnchor: [15, 45],
});

const MapUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position[0] !== 0 && position[1] !== 0) {
      map.setView(position, 13);
    }
  }, [position, map]);
  return null;
};



const Locator = () => {
  const [position, setPosition] = useState([0, 0]);
  const [results, setResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("hospital");
  const [searchAddress, setSearchAddress] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const categories = [
    { label: "Hospitals", value: "hospital" },
    { label: "Dentists", value: "dentist" },
    { label: "Pharmacies", value: "pharmacy" },
    { label: "Veterinaries", value: "veterinary" },
    { label: "Clinics", value: "clinic" },
    { label: "Nearby Doctors", value: "doctors" },
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setPosition([coords.latitude, coords.longitude]);
          console.log("Fetched location:", coords);
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    }
  }, []);



  useEffect(() => {
    const fetchNearbyLocations = async () => {
      if (position[0] === 0 && position[1] === 0) return;

      const [lat, lon] = position;
      const query = `[out:json][timeout:60];
        nwr(around:10000,${lat},${lon})["amenity"="${selectedCategory}"];
        out center;`;

      setIsFetching(true);
      try {
        const response = await axios.post(
          `https://overpass-api.de/api/interpreter`,
          query,
          { headers: { "Content-Type": "text/plain" } }
        );

        console.log(response.data);

        const locations = response.data.elements.map((place) => ({
          name: place.tags.name || "Unnamed",
          lat: place.lat || place.center?.lat,
          lon: place.lon || place.center?.lon,
        }));

        console.log(locations);
        setResults(locations);
      } catch (error) {
        console.error("Error fetching data from Overpass API: ", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchNearbyLocations();
  }, [position, selectedCategory]);

  const handleAddressSearch = async () => {
    if (!searchAddress.trim()) return;

    setIsFetching(true);
    try {
      const response = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          q: searchAddress,
          format: "json",
        },
      });

      const uniqueResults = response.data.filter((item, index, self) =>
        index === self.findIndex((t) => t.display_name === item.display_name)
      );

      if (uniqueResults.length === 1) {
        const { lat, lon } = uniqueResults[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
        setSearchAddress(uniqueResults[0].display_name);
      } else if (uniqueResults.length > 1) {
        setSearchResults(uniqueResults);
      } else {
        console.error("Address not found.");
      }
    } catch (error) {
      console.error("Error fetching address coordinates:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSelectResult = (lat, lon, displayName) => {
    setPosition([parseFloat(lat), parseFloat(lon)]);
    setSearchAddress(displayName);
    setSearchResults([]);
  };

  const handleMarkerDragEnd = (event) => {
    const { lat, lng } = event.target.getLatLng();
    setPosition([lat, lng]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">
        {isFetching ? (
          <div className="flex items-center">
            <RefreshCw className="animate-spin mr-2" />
            {`Fetching Nearby ${categories.find((cat) => cat.value === selectedCategory)?.label || ""}`}
          </div>
        ) : (
          "Find Nearby Facilities"
        )}
      </h1>

      <div className="text-lg font-semibold mb-4">
        <label htmlFor="category" className="block font-medium text-gray-700">
          Select a category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mt-1 block w-fit rounded-md border-2 p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isFetching}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="address" className="block font-medium text-gray-700">
          Not your correct location? Enter your place below or drag the marker on the map:
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            id="address"
            value={searchAddress}
            onKeyDown={(e) => e.key === "Enter" && handleAddressSearch()}
            onChange={(e) => setSearchAddress(e.target.value)}
            className="mt-1 block w-2/3 rounded-md border-2 p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            onClick={handleAddressSearch}
            className="px-4 py-2 font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            disabled={isFetching || !searchAddress.trim()}
          >
            Search
          </button>
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="mb-4 bg-gray-100 p-2 rounded-xl">
          <h2 className="font-semibold text-lg">Multiple results found. Please select:</h2>
          <ul className="list-disc pl-5 text-lg">
            {searchResults.map((result, index) => (
              <li key={index} className="cursor-pointer text-blue-500 hover:underline" onClick={() => handleSelectResult(result.lat, result.lon, result.display_name)}>
                {result.display_name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="relative overflow-hidden rounded-3xl shadow-md border-2 border-gray-300">
        {isFetching && (
          <div className="absolute inset-0 bg-white backdrop-blur-sm bg-opacity-75 flex items-center justify-center z-20 text-xl font-semibold">
            <RefreshCw className="animate-spin mr-2" />
            Fetching Nearby {categories.find((cat) => cat.value === selectedCategory)?.label || ""}
          </div>
        )}

        <MapContainer
          center={position}
          zoom={10}
          style={{ height: "500px", width: "100%", zIndex: 10 }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapUpdater position={position} />

          <Marker
            position={position}
            icon={yourLocationIcon}
            draggable
            eventHandlers={{ dragend: handleMarkerDragEnd }}
          >
            <Popup>Your Location</Popup>
          </Marker>

          {results.map((result, index) => (
            <Marker
              key={index}
              position={[result.lat, result.lon]}
              icon={customIcon}
            >
              <Popup>{result.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Locator;
