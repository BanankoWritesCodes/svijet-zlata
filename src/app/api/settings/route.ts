import { NextResponse } from 'next/server';

let settings = {
  goldPrice: 75.50,
  silverPrice: 0.92,
  buyMargin: 10,
  sellMargin: 10,
};

export async function GET() {
  return NextResponse.json(settings);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    settings = { ...settings, ...body };
    return NextResponse.json({ success: true, settings });
  } catch {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
