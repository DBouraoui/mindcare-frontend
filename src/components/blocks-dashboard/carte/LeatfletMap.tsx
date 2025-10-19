"use client";

import { useEffect, useState } from "react";
// @ts-ignore
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { PraticienModel } from "@/api/models/Praticien-model";
import {Button} from "@/components/ui/button";
import {Eye} from "lucide-react";


delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/leaflet/marker-icon-2x.png",
    iconUrl: "/leaflet/marker-icon.png",
    shadowUrl: "/leaflet/marker-shadow.png",
});

interface LeafletMapProps {
    praticiens: Pick<PraticienModel, "id" | "title" | "description" | "city" | "address" |"lastname" | "firstname">[];
}

export default function LeafletMap({ praticiens }: LeafletMapProps) {
    const [coordsList, setCoordsList] = useState<
        { id: number; lat: number; lon: number; title: string; address: string; city: string; description?: string; lastname: string; firstname: string }[]
    >([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAllCoords() {
            setLoading(true);
            try {
                const results = await Promise.all(
                    praticiens.map(async (p) => {
                        const res = await fetch(`/api/geocode?q=${encodeURIComponent(`${p.address}, ${p.city}`)}`);
                        if (!res.ok) return null;
                        const data = await res.json();
                        if (data.length > 0) {
                            return {
                                id: p.id,
                                lat: parseFloat(data[0].lat),
                                lon: parseFloat(data[0].lon),
                                title: p.title,
                                address: p.address,
                                city: p.city,
                                description: p.description,
                                lastname: p.lastname,
                                firstname: p.firstname,
                            };
                        }
                        return null;
                    })
                );

                const filtered = results.filter((r) => r !== null) as any[];
                setCoordsList(filtered);
            } catch (error) {
                console.error("Erreur de géocodage:", error);
            } finally {
                setLoading(false);
            }
        }

        if (praticiens.length > 0) {
            fetchAllCoords();
        }
    }, [praticiens]);

    useEffect(() => {
        if (coordsList.length === 0) return;

        const map = L.map("mapid", {
            center: [coordsList[0].lat, coordsList[0].lon],
            zoom: 10,
            scrollWheelZoom: true,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        const bounds = L.latLngBounds([]);

        coordsList.forEach((coord) => {
            const marker = L.marker([coord.lat, coord.lon]).addTo(map);
            marker.bindPopup(`
        <div>Dr ${coord.lastname} ${coord.firstname}</div>
        <div style="font-weight:bold;">${coord.title}</div>
        <div>${coord.address}</div>
        <div>${coord.city}</div>
        ${coord.description ? `<div style="margin-top:4px;font-size:0.85rem;color:#666;">${coord.description}</div>` : ""}
        <div><a href="/dashboard/praticien/${coord.id}">Voir plus</a></div>
        
      `);
            bounds.extend([coord.lat, coord.lon]);
        });


        if (coordsList.length > 1) map.fitBounds(bounds, { padding: [50, 50] });

        return () => map.remove();
    }, [coordsList]);

    return (
        <div className="w-full h-full my-4 relative">
            {loading && <div className="text-center text-gray-500 italic py-2">Chargement de la carte...</div>}
            <div id="mapid" className="h-96 w-full rounded-lg shadow-lg z-0" />
            {!loading && coordsList.length === 0 && (
                <div className="text-center text-sm text-gray-400 mt-2">
                    Impossible de localiser les praticiens.
                </div>
            )}
        </div>
    );
}
