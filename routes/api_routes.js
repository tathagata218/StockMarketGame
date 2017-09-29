var db = require("../models");

module.exports = function(app){
    
    
    app.get("/userApiData",function(req,res){
        db.users.findAll({}).then(function(data){
            res.json(data);
        });

    });

    app.get ("/stockTransData",function(req,res){
        db.stock_trans.findAll({}).then(function(data){
            res.json(data);
        });
    });

    app.put("/updateStockTrans", function(req,res){
        console.log(req.body);
        db.stock_trans.update({numOfShares : req.body.newNumOfShares},{ where : {
            companyName : req.body.userTicker
        }}).then(function(){
            res.json(true);
        });
    });

    app.post("/userTransData",function(req,res){
        console.log(req.body);
        db.stock_trans.create({
             numOfShares :       req.body.userShares,
             companyName :       req.body.userTicker,
             priceAtPurchase :   req.body.currentPrice,
             totalCostOf :       req.body.currentPrice * req.body.userShares
         }).then(function(outData){
             res.json(outData);
         });
    });


    app.post("/userIntData",function(req,res){
        console.log(req.body);

        db.users.create({
            userName  : req.body.userName,
            firstName : req.body.firstName,
            lastName  : req.body.lastName,
            password  : req.body.password 
        }).then(function(outData){
            res.json(outData);
        })
    });


    
}