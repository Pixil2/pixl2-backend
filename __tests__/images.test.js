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

  it('should create an image', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/users/login/callback?code=42').redirects(1);
    const expected = {
      id: expect.any(String),
      title: 'A title',
      height: 10,
      width: 10,
      colorArray: [
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(215, 215, 215)',
        'rgb(243, 243, 244)',
        'rgb(216, 216, 217)',
        'rgb(243, 243, 244)',
        'rgb(216, 216, 217)',
        'rgb(243, 243, 244)',
        'rgb(216, 216, 217)',
        'rgb(243, 243, 244)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(243, 243, 244)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(216, 216, 217)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(216, 216, 217)',
        'rgb(0, 0, 0)',
        'rgb(216, 216, 217)',
        'rgb(243, 243, 244)',
        'rgb(216, 216, 217)',
        'rgb(243, 243, 244)',
        'rgb(0, 0, 0)',
        'rgb(243, 243, 244)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(243, 243, 244)',
        'rgb(0, 0, 0)',
        'rgb(243, 243, 244)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(216, 216, 217)',
        'rgb(0, 0, 0)',
        'rgb(216, 216, 217)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(216, 216, 217)',
        'rgb(0, 0, 0)',
        'rgb(216, 216, 217)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(243, 243, 244)',
        'rgb(0, 0, 0)',
        'rgb(243, 243, 244)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(243, 243, 244)',
        'rgb(0, 0, 0)',
        'rgb(243, 243, 244)',
        'rgb(216, 216, 217)',
        'rgb(243, 243, 244)',
        'rgb(216, 216, 217)',
        'rgb(0, 0, 0)',
        'rgb(216, 216, 217)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(216, 216, 217)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(243, 243, 244)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(243, 243, 244)',
        'rgb(216, 216, 217)',
        'rgb(243, 243, 244)',
        'rgb(216, 216, 217)',
        'rgb(243, 243, 244)',
        'rgb(216, 216, 217)',
        'rgb(243, 243, 244)',
        'rgb(216, 216, 217)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
      ],
      userId: '1',
      isPublic: false,
      isApproved: null,
      createdAt: expect.any(String),
    };

    const res = await agent.post('/api/v1/images').send(expected);

    expect(res.body).toEqual(expected);
  });
});
