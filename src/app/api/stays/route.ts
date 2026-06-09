import { NextResponse } from "next/server";
import { getStays } from "@/services/stays";
 
export async function GET() {
  try {
    const stays = await getStays();
    return NextResponse.json(stays, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    console.error("[stays] D1 error:", error);
    return NextResponse.json({ error: "Failed to fetch stays" }, { status: 500 });
  }
}
 