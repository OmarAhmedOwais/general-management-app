import request from 'supertest';
import { app } from '@/app'; // Your Express app

describe('Resource Routes', () => {
  it('should fetch all resources', async () => {
    const res = await request(app).get('/api/resources').set('Authorization', 'Bearer token');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should create a new resource', async () => {
    const res = await request(app)
      .post('/api/resources')
      .set('Authorization', 'Bearer token')
      .send({ name: 'New Resource' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});
