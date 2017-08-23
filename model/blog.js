const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

let titleLengthChecker = (title) => {
  if(!title){
    return false;
  }else{
    if(title.length < 5 || title.length > 50){
      return false
    }else{
        return true;
    }
  }
};

let alphaNumericTitleChecker = (title) => {
  if(!title){
    return false;
  }else{
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    return regExp.test(title);
  }
};

let bodyLengthChecker = (body) => {
  if(!body){
    return false;
  }else{
    if(body.length < 10 || body.length > 500){
      return false;
    }else{
      return true;
    }
  }
};

let commentLengthChecker = (comment) => {
  if(!comment){
    return false;
  }else{
    if(comment[0].length < 1 || comment[0].length > 300){
      return false;
    }else{
      return true;
    }
  }
};


const bodyValidators = [
  {
    validator : bodyLengthChecker,
    message : 'Body must not be less than 5 or greater than 500'
  }
];

const titleValidators = [
  {
    validator : titleLengthChecker,
    message : 'Title must not be less than 5 or greater than 50'
  },
  {
    validator : alphaNumericTitleChecker,
    message : 'Title Must Be AplhaNumeric'
  }
];

const commentValidators = [
  {
    validator : commentLengthChecker,
    message : 'Comments may not exceed 300'
  }
];

const blogSchema = new Schema({
  title : {
    type: String,
    required: true,
    validator: titleValidators
   },
  body : {
    type: String,
    required: true,
    validator: bodyValidators
  },
  createdBy : {
    type: String
  },
  createdAt : {
    type: String,
    default: Date.now()
  },
  likes : {
    type: Number,
    default: 0
  },
  likedBy : {
    type: Array
  },
  dislikes : {
    type: Number,
    default: 0
  },
  dislikedBy : {
    type: Array
  },
  comments: [
    {
      comment : {
        type: String,
        validator: commentValidators
      },
      commentator : {
        type: String
      },
    }
  ]
});

module.exports = mongoose.model('Blog', blogSchema);
