module.exports = function(sequelize, DataTypes){
    var users = sequelize.define("users",{
    userName  :{  
        type : DataTypes.STRING,
        allowNull: false
    },
    firstName :{
        type : DataTypes.STRING,
        allowNull: false},

    lastName :{
            type : DataTypes.STRING,
            allowNull: false},

    password : {type : DataTypes.STRING,
        allowNull: true},

    });
    users.associate = function(models){
        users.hasMany(models.stock_trans);
    } 
    return users;
}