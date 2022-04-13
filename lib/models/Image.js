const pool = require('../utils/pool');

module.exports = class Image {
  id;
  title;
  height;
  width;
  colorArray;
  userId;
  isPublic;
  isApproved;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.height = row.height;
    this.width = row.width;
    this.colorArray = row.color_array;
    this.userId = row.user_id;
    this.isPublic = row.is_public;
    this.isApproved = row.is_approved;
  }

  static async insert({ title, height, width, colorArray, userId }) {
    const { rows } = await pool.query(
      `
            INSERT INTO
                images (title, height, width, color_array, user_id)
            VALUES
                ($1, $2, $3, $4, $5)
            RETURNING
                *
          `,
      [title, height, width, colorArray, userId]
    );

    return new Image(rows[0]);
  }

  static async getUserImages(userId) {
    const { rows } = await pool.query(
      `
            SELECT
                *
            FROM
                images
            WHERE 
                user_id=$1
          `,
      [userId]
    );

    return rows.map((row) => new Image(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        images
      WHERE 
        id=$1
      `,
      [id]
    );

    return new Image(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingImage = await Image.findById(id);
    const updatedAttributes = { ...existingImage, ...attributes };
    const { title } = updatedAttributes;

    const { rows } = await pool.query(
      `
      UPDATE  
        images
      SET
        title=$1
      WHERE
        id=$2
      RETURNING
        *
    `,
      [title, id]
    );

    return new Image(rows[0]);
  }

  static async deleteTagRef(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM
          tags_images
        WHERE 
          image_id=$1
        RETURNING 
          *;
          `,
      [id]
    );

    return new Image(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        images
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );

    return new Image(rows[0]);
  }

  async findTagByImage() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        tags
      LEFT JOIN
        tags_images
      ON
        tags.id = tags_images.tag_id
      WHERE 
        tags_images.image_id=$1
      `,
      [this.id]
    );

    this.tags = rows;
    return this;
  }

  async addTag(imageId, tagId) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        tags_images (tag_id, image_id)
      VALUES
        ($1, $2)
      RETURNING 
        *
      `,
      [tagId, imageId]
    );
    return new Image(rows[0]);
  }
};
// Need to add a tag to image
// Remove individual tags from an image
