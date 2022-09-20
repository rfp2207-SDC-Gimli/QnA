DROP DATABASE IF EXISTS qna;
CREATE DATABASE qna;


DROP TABLE IF EXISTS questions, answers, photos;

CREATE TABLE questions (
  question_id SERIAL NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
  question_body VARCHAR(1000) NOT NULL,
  question_date BIGINT NOT NULL,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  reported BOOLEAN NOT NULL,
  helpful INT NOT NULL
);

CREATE TABLE answers (
  answer_id SERIAL NOT NULL PRIMARY KEY,
  question_id INT NOT NULL,
  answer_body VARCHAR(1000) NOT NULL,
  answer_date BIGINT NOT NULL,
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

COPY questions FROM '/Users/aaronyabut/SDC Project/QnA/data/questions.csv' DELIMITER ',' CSV HEADER;
COPY answers FROM '/Users/aaronyabut/SDC Project/QnA/data/answers.csv' DELIMITER ',' CSV HEADER;
COPY photos FROM '/Users/aaronyabut/SDC Project/QnA/data/answers_photos.csv' DELIMITER ',' CSV HEADER;

CREATE INDEX questions_product_id ON questions(product_id);
CREATE INDEX questions_question_id ON questions(question_id);
CREATE INDEX questions_reported ON questions(reported);

CREATE INDEX answers_answer_id ON answers(answer_id);
CREATE INDEX answers_question_id ON answers(question_id);
CREATE INDEX answers_reported ON answers(reported);

CREATE INDEX photos_answer_id ON photos(answer_id);
CREATE INDEX photos_photo_id ON photos(photo_id);
