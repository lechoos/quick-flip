import { http, HttpResponse } from 'msw';

type RegisterRequestBody = {
  email: string;
  password: string;
  username: string;
};

export const handlers = [
  http.post('/api/auth/register', async ({ request }) => {
    const body = (await request.json()) as RegisterRequestBody;

    if (body.email === 'exists@example.com') {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'User already exists',
      });
    }

    return HttpResponse.json({
      message: 'User created successfully',
    });
  }),
];
