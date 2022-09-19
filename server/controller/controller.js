const models = require('../models/models.js');

module.exports = {
  getQuestions: (req, res) => {
    let { product_id, page, count } = req.query;
    models.getAllQuestions(product_id, page=1, count=5)
      .then((response) => {
          res.send({
          product_id: product_id,
          results: response[0].json_agg
        }).status(200)
      })
      .catch((err) => {
        console.log('bad get question', err)
        res.send(err).status(400)
      })


    // localhost:4000/qa/questions?product_id=1
  },
  getAnswers: (req, res) => {
    const { question_id } = req.params;
    let { page, count } = req.query;
    models.getAllAnswers(question_id, page=1, count=5)
      .then((response) => {
        res.send({
          question: question_id,
          page: page,
          count: count,
          results: response[0].json_agg
        }).status(200)
      })
      .catch((err) => {
        res.send(err).status(400)
        console.log('bad get answer', err)
      })


    // localhost:4000/qa/questions/9763/answers
  },
  postQuestion: (req, res) => {
    // console.log("POST CONTROLLERRRRRRR")
    const { question_body, asker_name, asker_email, product_id } = req.body

    models.addQuestion(question_body, asker_name, asker_email, product_id)
      .then((response) => {
        // console.log(response)
        console.log('good add question')
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('bad post question', err)
        res.send(err).status(400);
      })

    // localhost:4000/qa/questions?product_id=54321

    /*
    SAMPLE POST REQ
    {
      "question_body": "Why?",
      "asker_name": "thinker",
      "asker_email": "thinker@gmail.com",
      "product_id": "54321"
    }
    {
      "answer_body": "Why?",
      "answerer_name_name": "thinker",
      "answerer_email": "thinker@gmail.com",
      "photos": "https://i.kym-cdn.com/photos/images/newsfeed/002/214/242/763.jpg"
    }
    */
  },
  postAnswer: (req, res) => {

    const { answer_body, answerer_name, answerer_email, photos } = req.body;
    const { question_id } = req.params;

    // console.log('TEST POST ANSWER', answer_body, answerer_name, answerer_email, photos)
    // console.log('TEST POST ANSWER', question_id)


    models.addAnswer( answer_body, answerer_name, answerer_email, question_id )
      .then((resolve) => {
        console.log('good add answer', resolve);
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('bad add answer', err);
        res.send(err).status(400);
      })


    // localhost:4000/qa/questions/3518964/answers

    /*
      SAMPLE POST ANSWER
      {
        "answer_body": "Just because",
        "answerer_name": "answer guy",
        "answerer_email": "answer_guy@gmail.com",
        "photos": "https://i.kym-cdn.com/photos/images/newsfeed/002/214/242/763.jpg"
      }
    */
  },
  putHelpful: (req, res) => {
    models.updateHelpful('test num', 'test value', (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log(response);
      }
    })
  },
  putReport: (req, res) => {
    models.updateReport('test num', 'test value', (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log(response);
      }
    })
  }
}

/*
\i database/postgres.sql

SELECT * FROM questions LIMIT 5;

SELECT product_id FROM questions LIMIT 5;
SELECT product_id, question_id || ' ' || question_body AS results FROM questions LIMIT 5;






*/