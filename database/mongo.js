const mongoose = require("mongoose");

const { Schema } = mongoose;

const questionsSchema = new Schema(
  {
    question_id: Number,
    product_id: Number,
    question_body: String,
    question_date: Date,
    asker_name: String,
    asker_email: String,
    reported: Boolean,
    helpful: Number,
    answers: []
  }
)
const Questions = mongoose.model('Questions', questionsSchema);

const answersSchema = new Schema(
  {
    answer_id: Number,
    question_id: Number,
    answer_body: String,
    answer_date: Date,
    answerer_name: String,
    answerer_email: String,
    reported: Boolean,
    helpful: Number,
    photos: []
  }
)

const Answers = mongoose.model('Answers', answersSchema);