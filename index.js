// Aqui fizemos algumas configurações iniciais: 
//Importamos o framework do Express (pra acessar a DB) e definimos o nome dele como "app";
//Importamos o BodyParser para interpretar o corpo das requisições que fazemos para o Banco de Dados e definimos quais formatos ele vai interpretar: JSON e URL-Encoded;
//Definimos também algumas rotas padrões para acessar e manipular os dados no Banco de Dados: esta API está na porta 5000 do localhost e o servidor está na porta 3306 (manipulável através do localhost:5000/employee como definimos mais abaixo).


const express = require("express");
const app = express();
const bodyParser = require("body-parser"); //IMPORTADO PARA QUE A API RECONHEÇA OS POST REQUESTS

//CONFIGURANDO PORTA
const port = process.env.PORT || 5000;

//DEFININDO MENSAGEM DA ROTA PADRÃO
app.get("/", (req, res) => {
    res.status(403).send("<h1> 403 FORBIDDEN </h1>");
});

//DEFININDO OS TIPOS DE DADOS OUVIDOS PELO BODYPARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//IMPORTANDO AS ROTAS DE EMPLOYEE
const employeeRoutes = require("./src/routes/employeeRoute");

//CRIANDO ROTA PRINCIPAL PARA MANIPULAR DADOS DE EMPLOYEE
app.use("/employee", employeeRoutes);

//OUVINDO A PORTA
app.listen(port, () => {
    console.log(`Servidor funcionando na porta ${port}`);
});