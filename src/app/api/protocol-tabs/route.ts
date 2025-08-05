import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { protocolTabs } from "@/lib/db/schema";

export async function GET() {
  try {
    const tabs = await db
      .select()
      .from(protocolTabs)
      .orderBy(protocolTabs.tabIndex);
    
    return NextResponse.json(tabs);
  } catch (error) {
    console.error("Error fetching protocol tabs:", error);
    return NextResponse.json(
      { error: "Failed to fetch protocol tabs" },
      { status: 500 }
    );
  }
}