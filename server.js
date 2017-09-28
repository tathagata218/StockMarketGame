var express = require("express");
var db = require("./models");
var port = process.env.port || 8080;


var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use("/public", express.static("public"));

require("./routes/api_routes.js")(app);
require("./routes/html_routes.js")(app);

db.sequelize.sync()
// .then(function() {
//     return db.users.create({
//         userName: 'asdf', 
//         firstName: 'asdf', 
//         lastName: 'asdf', 
//         password: 'asdf',
//         stock_trans: [
//         {
//             companyName: 'asdf',
//             numOfShares: 2345
//         }, {
//             companyName: 'dsfdf',
//             numOfShares: 345345
//         }]
//     }, {
//         include: [db.stock_trans]
//     })
//   })
//   .then(function(user) {
//       return user.getStock_trans()
//   })
//   .then(console.log)
  .then(function(){
    app.listen(port, function(){
        console.log("it is lisining!!!");
    });  
});

