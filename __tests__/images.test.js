const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Image = require('../lib/models/Image');
const Tag = require('../lib/models/Tag');

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
      userId: '2',
      isPublic: false,
      isApproved: null,
    };

    const res = await agent.post('/api/v1/images').send(expected);

    expect(res.body).toEqual(expected);
  });

  it('should get all user images', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/users/login/callback?code=42').redirects(1);
    const expected = await Image.getUserImages(1);

    const res = await agent.get('/api/v1/images/user/1');

    expect(res.body).toEqual(expected);
  });

  it('should get an image by id', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/users/login/callback?code=42').redirects(1);
    const expected = await Image.findById(1);
    const res = await agent.get(`/api/v1/images/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  it('should update an image', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/users/login/callback?code=42').redirects(1);

    const res = await agent
      .patch('/api/v1/images/1')
      .send({ title: 'whatever' });
    const expected = await Image.findById(1);

    expect(res.body).toEqual(expected);
  });

  it('should delete an image', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/users/login/callback?code=42').redirects(1);

    const expected = await Image.findById(1);
    const res = await agent.delete('/api/v1/images/1');
    expect(res.body).toEqual(expected);
  });

  it('should get tags by image id', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/users/login/callback?code=42').redirects(1);

    const image = await Image.findById(1);
    const expected = await image.findTagByImage();

    const res = await agent.get('/api/v1/images/1/tags');
    expect(res.body).toEqual(expected);
  });

  it('should create tags_images table entry', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/users/login/callback?code=42').redirects(1);
    const expected = { tag_id: '1', image_id: '1' };
    const res = await agent.post('/api/v1/images/1/tags/1');
    // console.log('tagsImages.body', tagsImages.body);
    // const res = await Tag.getTagById(tagsImages.body.tag_id);

    expect(res.body).toEqual(expected);
  });
});
