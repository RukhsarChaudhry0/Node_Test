import request from 'supertest';
import app from './server';

describe('Shopping List API', () => {
  describe('POST /login', () => {
    it('should return a JWT token for valid credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should return a 401 error for invalid credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: '',
        })
    }
    )

    it('should return shopping list for login users only ', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty('token');
    });


  }
  )
}
)
