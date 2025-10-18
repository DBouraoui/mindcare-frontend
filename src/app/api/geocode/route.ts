import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    if (!query) return NextResponse.json({ error: "Missing query" }, { status: 400 });

    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`, {
        headers: {
            "User-Agent": "Mindcarev1.0"
        }
    });

    const data = await res.json();
    return NextResponse.json(data);
}