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

  //   static async insert({ theme, userId }) {
  //     if (!theme) throw new Error('Theme is required');

  //     const { rows } = await pool.query(
  //       `
  //           INSERT INTO
  //             profiles (theme, user_id)
  //           VALUES
  //             ($1, $2)
  //           RETURNING
  //             *
  //           `,
  //       [theme, userId]
  //     );

  //     return new Profile(rows[0]);
  //   }

  //   static async findById(userId) {
  //     const { rows } = await pool.query(
  //       `
  //           SELECT
  //             *
  //           FROM
  //             profiles
  //           WHERE
  //             user_id=$1
  //           `,
  //       [userId]
  //     );

  //     return new Profile(rows[0]);
  //   }

  //   static async updateById(id, attributes) {
  //     const existingProfile = await Profile.findById(id);
  //     const updatedAttributes = { ...existingProfile, ...attributes };
  //     const { theme } = updatedAttributes;
  //     const { rows } = await pool.query(
  //       `
  //         UPDATE
  //             profiles
  //         SET
  //             theme=$1
  //         WHERE
  //             id=$2
  //         RETURNING
  //             *
  //         `,
  //       [theme, id]
  //     );
  //     return new Profile(rows[0]);
  //   }
};
