const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('pixl2 backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should save a theme to user profile when user is logged in', async () => {
    const agent = request.agent(app);
    const expected = {
      id: expect.any(String),
      theme: 'dark',
      userId: expect.any(String),
    };
    let res = await agent.post('/api/v1/profiles').send(expected);
    expect(res.status).toEqual(401);

    await agent.get('/api/v1/users/login/callback?code=42').redirects(1);

    res = await agent.post('/api/v1/profiles').send(expected);
    expect(res.body).toEqual(expected);
  });
});
