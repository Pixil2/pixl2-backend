const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github.js');

describe('pixl2-backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should redirect user to github oauth', async () => {
    const res = await request(app).get('/api/v1/users/login');

    expect(res.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/users\/login\/callback/i
    );
  });

  it('should login and redirect users to /api/v1/images', async () => {
    const req = await request
      .agent(app)
      .get('/api/v1/users/login/callback?code=42')
      .redirects(1);

    expect(req.req.path).toEqual('/api/v1/images');
  });

  it('DELETE route logs out user', async () => {
    const agent = request.agent(app);
    const res = await agent.delete('/api/v1/users/sessions');

    expect(res.body).toEqual({
      success: true,
      message: 'Signed out successfully!',
    });
  });
});
