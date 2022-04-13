const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Tag = require('../lib/models/Tag');

jest.mock('../lib/utils/github.js');

//get all
//get by id

describe('pixl2 backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should get a list of all tags', async () => {
    const expected = await Tag.getAllTags();
    const res = await request(app).get('/api/v1/tags');

    expect(res.body).toEqual(expected);
  });
});
