const pool = require('../utils/pool');

module.exports = class User {
  id;
  username;
  avatar;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.avatar = row.avatar;
  }

  static async insert({ username, avatar }) {
    if (!username) throw new Error('Username is required');

    const { rows } = await pool.query(
      `
          INSERT INTO
            users (username, avatar)
          VALUES
            ($1, $2)
          RETURNING *
          `,
      [username, avatar]
    );

    return new User(rows[0]);
  }

  static async findByUsername(username) {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            users
          WHERE
            username=$1
          `,
      [username]
    );

    if (!rows[0]) return null;

    return new User(rows[0]);
  }
};
