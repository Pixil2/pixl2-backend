-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS images CASCADE;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL,
  avatar TEXT
);

CREATE TABLE profiles (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  theme TEXT NOT NULL,
  user_id BIGINT REFERENCES users(id)
);

CREATE TABLE images (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  height SMALLINT NOT NULL,
  width SMALLINT NOT NULL,
  color_array TEXT[] NOT NULL,
  user_id BIGINT REFERENCES users(id),
  is_public BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
);

INSERT INTO 
    users (username)
VALUES 
    ('whatever');

INSERT INTO 
    profiles (theme)
VALUES 
    ('rainbow or something');

INSERT INTO
    images (title, height, width, color_array)
VALUES
    ('title', 10, 10, 
     ARRAY ['rgb(0, 0, 0)',
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
    'rgb(0, 0, 0)']
    );