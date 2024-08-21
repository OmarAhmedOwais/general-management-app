import request from 'supertest';
import { app } from '@/app'; // Your Express app

describe('End-to-End Tests', () => {
  it('should allow a user to register, login, and access protected routes', async () => {
    // Register
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({ email: 'e2e@test.com', password: 'password' });
    expect(registerRes.status).toBe(201);

    // Login
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'e2e@test.com', password: 'password' });
    expect(loginRes.status).toBe(200);
    const token = loginRes.body.token;

    // Access protected route
    const protectedRes = await request(app)
      .get('/api/resources')
      .set('Authorization', `Bearer ${token}`);
    expect(protectedRes.status).toBe(200);
  });
});
