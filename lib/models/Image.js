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
};
