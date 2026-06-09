import { NextResponse } from "next/server";
import { getPackages } from "@/services/packages";
 
export async function GET() {
  try {
    const packages = await getPackages();
    return NextResponse.json(packages, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    console.error("[packages] D1 error:", error);
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}
 