const pool = require('../utils/pool');

module.exports = class Tag {
  id;
  name;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
  }

  static async getAllTags() {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            tags
          `
    );

    return rows.map((row) => new Tag(row));
  }

  static async getTagById(id) {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            tags
          WHERE
            id=$1
          `,
      [id]
    );

    return new Tag(rows[0]);
  }
};
