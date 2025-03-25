import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const voiceId = 'EXAVITQu4vr4xnSDxMaL';
  const settings = {
    stability: 1,
    similarity_boost: 1,
    speed: 0.7,
  };

  const result = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      Accept: 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': process.env.ELEVENLABS_API_KEY!,
    },
    body: JSON.stringify({
      text: body.text,
      model_id: 'eleven_flash_v2_5',
      language_code: 'es',
      voice_settings: settings,
    }),
  });

  if (!result.ok) {
    const errorData = await result.json();
    console.error(errorData);
    const errorMsg = (await errorData.detail?.message) || 'Failed to fetch data.';
    return NextResponse.json({ error: errorMsg }, { status: result.status });
  }

  const audioBuffer = await result.arrayBuffer();
  const audioBase64 = Buffer.from(audioBuffer).toString('base64');

  return NextResponse.json({ audio: audioBase64 }, { status: 200 });
}
