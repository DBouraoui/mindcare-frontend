"use client";

import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { PraticienModel } from "@/api/models/Praticien-model";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/leaflet/marker-icon-2x.png",
    iconUrl: "/leaflet/marker-icon.png",
    shadowUrl: "/leaflet/marker-shadow.png",
});

interface LeafletMapProps {
    praticien: PraticienModel;
}

export default function LeafletMap({ praticien }: LeafletMapProps) {
    const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCoords() {
            try {
                setLoading(true);
                console.log("Fetching coords for", praticien.address, praticien.city);

                const res = await fetch(
                    `/api/geocode?q=${encodeURIComponent(`${praticien.address}, ${praticien.city}`)}`
                );
                if (!res.ok) throw new Error("Erreur de géocodage");

                const data = await res.json();
                console.log("Data received:", data);

                if (data.length > 0) {
                    setCoords({ lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) });
                } else {
                    setCoords(null);
                }
            } catch (e) {
                console.error(e);
                setCoords(null);
            } finally {
                setLoading(false);
            }
        }

        fetchCoords();
    }, [praticien.address, praticien.city]);

    useEffect(() => {
        if (!coords) return;

        const map = L.map("mapid", {
            center: [coords.lat, coords.lon],
            zoom: 16,
            scrollWheelZoom: true,
        });
        map.on("focus", () => map.scrollWheelZoom.enable());
        map.on("blur", () => map.scrollWheelZoom.disable());

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors",
        }).addTo(map);

        const marker = L.marker([coords.lat, coords.lon]).addTo(map);
        marker.bindPopup(`
      <div style="font-weight:bold;">${praticien.title ?? "Praticien"}</div>
      <div>${praticien.address}</div>
      <div>${praticien.city}</div>
      ${praticien.phone ? `<div><b>Téléphone :</b> ${praticien.phone}</div>` : ""}
      ${praticien.email ? `<div><b>Email :</b> ${praticien.email}</div>` : ""}
    `);

        return () => map.remove();
    }, [coords, praticien]);

    return (
        <div className="w-full my-4">
            {loading && (
                <div className="text-center text-gray-500 italic">Chargement de la carte...</div>
            )}
            <div id="mapid" className="h-96 w-full rounded-lg shadow-lg z-0"></div>
            {!coords && !loading && (
                <div className="text-center text-sm text-gray-400 mt-2">
                    Impossible de localiser l’adresse du praticien.
                </div>
            )}
        </div>
    );
}
