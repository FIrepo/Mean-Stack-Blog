const crypto = require('crypto').randomBytes(256).toString('hex'); // USED TO ENCRYPT DATABSE SECRET

module.exports = {
  // uri: 'mongodb://localhost:27017/blog',  // database uri and database name
  uri: 'mongodb://jamesd:flstudio10@ds157702.mlab.com:57702/angular2app', //link to the cloud hosting database name  
  secret: crypto,
  // db: 'blog' // local database name
  db:'angular2app' // cloud database name
}
