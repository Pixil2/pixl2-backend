const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Profile = require('../lib/models/Profile');

jest.mock('../lib/utils/github.js');

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
      userId: '1',
    };
    let res = await agent.post('/api/v1/profiles').send(expected);
    expect(res.status).toEqual(401);

    await agent.get('/api/v1/users/login/callback?code=42').redirects(1);

    res = await agent.post('/api/v1/profiles').send(expected);
    expect(res.body).toEqual(expected);
  });

  it('should find a profile by id', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/users/login/callback?code=42').redirects(1);
    const expected = await Profile.findById(1);
    const res = await agent.get(`/api/v1/profiles/${expected.userId}`);

    expect(res.body).toEqual({ ...expected });
  });

  it('should update profile', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/users/login/callback?code=42').redirects(1);
    await Profile.findById(1);
    const expected = {
      id: expect.any(String),
      theme: 'light',
      userId: '1',
    };
    const res = await agent
      .patch('/api/v1/profiles/1')
      .send({ theme: 'light' });

    expect(res.body).toEqual(expected);
  });
});
