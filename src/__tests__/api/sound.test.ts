/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { POST } from '@/app/api/sound/route';

global.fetch = jest.fn();

jest.mock('buffer', () => ({
  Buffer: {
    from: jest.fn().mockImplementation(() => ({
      toString: jest.fn().mockReturnValue('base64-encoded-audio'),
    })),
  },
}));

describe('', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('successfully returns generated data', async () => {
    const mockRequestBody = { text: 'Hola, mundo!' };
    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as NextRequest;

    const mockAudioBuffer = new ArrayBuffer(8);
    const mockResponseObject = {
      ok: true,
      arrayBuffer: jest.fn().mockResolvedValue(mockAudioBuffer),
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponseObject);

    const response = await POST(mockRequest);
    const responseData = await response.json();

    expect(global.fetch).toHaveBeenCalledWith('https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL', {
      method: 'POST',
      headers: {
        Accept: 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: 'Hola, mundo!',
        model_id: 'eleven_flash_v2_5',
        language_code: 'es',
        voice_settings: {
          stability: 1,
          similarity_boost: 1,
          speed: 0.7,
        },
      }),
    });
    expect(responseData).toHaveProperty('audio');
    expect(response.status).toBe(200);
  });

  it('should handle an error correctly and return a correct error status', async () => {
    const mockRequestBody = { text: 'Hola, mundo!' };
    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as NextRequest;

    const errorStatus = 400;
    const errorDetail = { detail: { message: 'Invalid request' } };
    const mockErrorResponse = {
      ok: false,
      status: errorStatus,
      json: jest.fn().mockResolvedValue(errorDetail),
    };

    (global.fetch as jest.Mock).mockResolvedValue(mockErrorResponse);

    const response = await POST(mockRequest);
    const responseData = await response.json();

    expect(global.fetch).toHaveBeenCalled();
    expect(responseData).toHaveProperty('error');
    expect(response.status).toBe(errorStatus);
  });

  it('should handle an error without detail returned', async () => {
    const mockRequestBody = { text: 'Hola, mundo!' };
    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as NextRequest;

    const errorStatus = 500;
    const errorDetail = {};
    const mockErrorResponse = {
      ok: false,
      status: errorStatus,
      json: jest.fn().mockResolvedValue(errorDetail),
    };

    (global.fetch as jest.Mock).mockResolvedValue(mockErrorResponse);

    const response = await POST(mockRequest);
    const responseData = await response.json();

    expect(global.fetch).toHaveBeenCalled();
    expect(responseData).toHaveProperty('error', 'Failed to fetch data.');
    expect(response.status).toBe(errorStatus);
  });

  it('should handle an exception during an API call', async () => {
    const mockRequestBody = { text: 'Hola, mundo!' };
    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as NextRequest;

    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(POST(mockRequest)).rejects.toThrow('Network error');
  });
});
