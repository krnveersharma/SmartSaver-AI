import { createClient } from 'redis';
import { NextResponse } from 'next/server';

export async function GET() {
  const client = createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD,
  });

  client.on('error', (error) => {
    console.error('Redis error', error);
    return NextResponse.json({ error: 'Redis error' }, { status: 500 });
  });

  try {
    await client.connect();

    // Set a test value
    await client.set('test_key', 'test_value');
    // Get the test value
    const value = await client.get('test_key');

    return NextResponse.json({ success: true, value });
  } catch (error) {
    console.error('Error during Redis operations', error);
    return NextResponse.json({ error: 'Error during Redis operations' }, { status: 500 });
  } finally {
    await client.disconnect();
  }
}
