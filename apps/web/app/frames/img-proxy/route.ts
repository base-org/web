import { NextRequest, NextResponse } from 'next/server';
import { withIPCheck } from '../proxy-ip-check';

async function getHandler(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const contentType = response.headers.get('content-type');

    if (!contentType || !contentType.startsWith('image') || contentType.includes('svg')) {
      return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 });
    }

    const imageBuffer = await response.arrayBuffer();
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType ?? 'application/octet-stream',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  }
}

export const GET = withIPCheck(getHandler);
