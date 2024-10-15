const request = require('supertest');
const app = require('../app');  // Your main app file

describe('POST /login', () => {
  it('should return 400 for invalid email', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'invalid-email', password: 'password123' });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Invalid email format');
  });

  it('should return 400 for short password', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'short' });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Password must be at least 8 characters long');
  });
});
