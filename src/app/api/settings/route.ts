import { NextResponse } from "next/server";
import { getSiteSettings } from "@/services/settings";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json(settings, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    console.error("[settings] D1 error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}