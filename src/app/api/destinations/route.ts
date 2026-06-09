// app/api/destinations/route.ts
// Route Handler — se ejecuta en el servidor, llama a D1 y devuelve JSON.
// El cliente hace fetch a /api/destinations para obtener los datos.

import { NextResponse } from "next/server";
import { getDestinations } from "@/services/destinations";

export async function GET() {
  try {
    const destinations = await getDestinations();
    return NextResponse.json(destinations, {
      headers: {
        // Cache 60s en el navegador, revalidar en background
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("[destinations] D1 error:", error);
    return NextResponse.json({ error: "Failed to fetch destinations" }, { status: 500 });
  }
}
