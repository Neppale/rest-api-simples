// Este arquivo serve para configurar o acesso ao banco de dados. No fim, exportamos ele para ser importado nos outros arquivos que obviamente vão precisar acessar a DB.


const mysql = require("mysql");

//CRIANDO CONEXÃO MYSQL
const dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "node_mysql_crud_db"
})

dbConnection.connect(function(err){
    if(err){
        console.log(err);
    } else {
        console.log("Conectado com sucesso.");
    }
})

module.exports = dbConnection;