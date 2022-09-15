DROP DATABASE IF EXISTS qna
CREATE DATABASE qna


DROP TABLE IF EXISTS questions, answers, photos

CREATE TABLE questions (
  question_id SERIAL NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
  question_body VARCHAR(1000) NOT NULL,
  question_date DATE NOT NULL,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  reported BOOLEAN NOT NULL,
  helpful INT NOT NULL
);

CREATE TABLE answers (
  answer_id SERIAL NOT NULL PRIMARY KEY,
  question_id INT NOT NULL,
  answer_body VARCHAR(1000) NOT NULL,
  answer_date DATE NOT NULL,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  reported BOOLEAN NOT NULL,
  helpful INT NOT NULL
);

CREATE TABLE photos (
  photo_id SERIAL NOT NULL PRIMARY KEY,
  answer_id INT NOT NULL,
  photo_url VARCHAR(1000) NOT NULL
);