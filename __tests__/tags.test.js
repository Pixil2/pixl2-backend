const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github.js');

//get by id

describe('pixl2 backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should get a list of all tags', async () => {
    const expected = [
      { id: '1', name: 'animals' },
      { id: '2', name: 'nature' },
      { id: '3', name: 'geometric' },
      { id: '4', name: 'nicolas cage' },
    ];

    const res = await request(app).get('/api/v1/tags');

    expect(res.body).toEqual(expected);
  });

  it('should get a tag by id', async () => {
    const expected = { id: '1', name: 'animals' };

    const res = await request(app).get(`/api/v1/tags/${expected.id}`);

    expect(res.body).toEqual(expected);
  });

  it('should get images by tag id', async () => {
    const expected = {
      id: '1',
      name: 'animals',
      images: [
        {
          id: '1',
          title: 'title',
          height: 10,
          width: 10,
          color_array: [
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
            'rgb(216, 216, 217)',
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
          user_id: '1',
          is_public: false,
          is_approved: null,
          tag_id: '1',
          image_id: '1',
        },
      ],
    };

    const res = await request(app).get('/api/v1/tags/1/images');

    expect(res.body).toEqual(expected);
  });
});
