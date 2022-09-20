const pool = require('../../database/db.js')
/*
'photos', (SELECT COALESCE(json_agg(json_build_object(
                'id', photos.photos_id,
                'url', photos.photos_url
              )),
              array[]:json[])
              FROM photos
              WHERE answers.answer_id=photos.answer_id
              )
*/


module.exports = {
  getAllQuestions: (product_id, page, count) => new Promise((resolve, reject) => {
    var queryStr =
      `SELECT json_agg(resObj)
        FROM (
          SELECT json_build_object(
            'question_id', question_id,
            'question_body', question_body,
            'question_date', question_date,
            'asker_name', asker_name,
            'question_helpfulness', helpful,
            'reported', reported,
            'answers', (SELECT json_object_agg(answer_id, json_build_object(
              'id', answer_id,
              'body', answer_body,
              'date', answer_date,
              'answerer_name', answerer_name,
              'helpfulness', helpful,
              'reported', reported,
              'photos', (
                SELECT COALESCE(json_agg(
                  json_build_object(
                    'photo_id', photo_id,
                    'photo_url', photo_url
                  )
                ), '[]' :: json)
                FROM photos
                WHERE photos.answer_id=answers.answer_id
              )
            ))
            FROM answers
            WHERE answers.question_id=questions.question_id
            )
          ) AS resObj
        FROM questions
        WHERE questions.product_id = ${product_id}
          AND questions.reported=false
        LIMIT ${count}
        OFFSET ${page - 1}
        ) AS results`


    pool.query(queryStr, (err, result) => {
      if (err) {reject(err);}
      return resolve(result.rows);
    });
  }),
  getAllAnswers: (question_id, page, count) => new Promise((resolve, reject) => {
    /*
    var queryStr = `
      SELECT answer_id
      FROM answers
      WHERE answers.question_id=${question_id}
      LIMIT ${count}
      OFFSET ${page}
    `
    */
    var queryStr = `
      SELECT json_agg(resObj)
        FROM (
          SELECT json_build_object(
            'answer_id', answer_id,
            'body', answer_body,
            'date', answer_date,
            'answerer_name', answerer_name,
            'helpfulness', helpful,
            'photos', (
              SELECT COALESCE(json_agg(
                json_build_object(
                  'id', photos.photo_id,
                  'url', photos.photo_url
                )
              ), '[]' :: json)
              FROM photos
              WHERE photos.answer_id=answers.answer_id
            )
          ) AS resObj
          FROM answers
          WHERE answers.question_id=${question_id}
            AND answers.reported=false
          LIMIT ${count}
          OFFSET ${page - 1}
        ) AS results
    `
    pool.query(queryStr, (err, result) => {
      if (err) {reject(err)}
      return resolve(result.rows)
    })
  }),
  addQuestion: (question_body, asker_name, asker_email, product_id) => new Promise((resolve,reject) => {
    /*
    SELECT MAX(question_id) FROM questions;
    var queryStr = ``
    var queryStr = `
      INSERT INTO questions
        (question_body, asker_name, asker_email, product_id)
      VALUES
        ('${question_body}', '${asker_name}', '${asker_email}', '${product_id}')
    `
    */
    var queryStr = `
      INSERT INTO questions
        (
          question_body,
          asker_name,
          asker_email,
          product_id,
          question_date,
          reported,
          helpful,
          question_id
        )
      VALUES
        (
          '${question_body}',
          '${asker_name}',
          '${asker_email}',
          '${product_id}',
          '${Date.now()}',
          'false',
          '0',
          (SELECT MAX(question_id + 1) FROM questions)
        )
    `
    pool.query(queryStr, (err, result) => {
      if (err) {reject(err)}
      return resolve()
    })
  }),
  addAnswer: ( answer_body, answerer_name, answerer_email, question_id ) => new Promise((resolve, reject) => {
    // const queryStr = ``;
    const queryStr = `
      INSERT INTO answers
        (
          answer_body,
          answerer_name,
          answerer_email,
          answer_date,
          question_id,
          reported,
          helpful,
          answer_id
        )
      VALUES
        (
          '${answer_body}',
          '${answerer_name}',
          '${answerer_email}',
          '${Date.now()}',
          '${question_id}',
          'false',
          '0',
          (SELECT MAX(answer_id + 1) FROM answers)
        )
      RETURNING *
    `;

    // console.log('RIGHT NOW', query)
    pool.query(queryStr, (err, result) => {
      if (err) {reject(err)}
      return resolve(result.rows[0].answer_id)
    })
  }),
  addPhotos: (answer_id, photo_url) => new Promise ((resolve, reject) => {
    // var queryStr = ``;
    var queryStr = `
      INSERT INTO photos
        (
          answer_id,
          photo_url,
          photo_id
        )
      VALUES
        (
          '${answer_id}',
          '${photo_url}',
          (SELECT MAX(photo_id + 1) FROM photos)
        )
    `;

    pool.query(queryStr, (err, result) => {
      if (err) {reject(err)}
      return resolve()
    })
  }),
  updateHelpfulQuestion: (question_id) => new Promise((resolve, reject) => {
    var queryStr = `
      UPDATE questions
      SET helpful = helpful + 1
      WHERE question_id=${question_id}
    `;

    pool.query(queryStr, (err, result) => {
      if (err) (reject(err))
      resolve()
    })
  }),
  updateReportQuestion: (question_id) => new Promise((resolve, reject) => {
    console.log('TESTING UPDATE REPORT')
    var queryStr = `
      UPDATE questions
      SET reported = true
      WHERE question_id=${question_id}
    `;

    pool.query(queryStr, (err, result) => {
      if (err) (reject(err))
      resolve()
    })
  }),
  updateHelpfulAnswer: (answer_id) => new Promise((resolve, reject) => {
    console.log('TESTING UPDATE HELP')
    var queryStr = `
      UPDATE answers
      SET helpful = helpful + 1
      WHERE answer_id = ${answer_id}
    `;

    pool.query(queryStr, (err, result) => {
      if (err) (reject(err))
      resolve()
    })
  }),
  updateReportAnswer: (answer_id) => new Promise((resolve, reject) => {
    console.log('TESTING UPDATE REPORT')
    var queryStr = `
      UPDATE answers
      SET reported = true
      WHERE answer_id = ${answer_id}
    `;

    pool.query(queryStr, (err, result) => {
      if (err) (reject(err))
      resolve()
    })
  })
}