//Aqui criamos as funções para garantir que os dados sejam adicionados, deletados ou alterados da forma correta no Banco de Dados. Estas funções são exportadas para o Controller e ele decide, baseado no tipo de requisição feita pelo Router e nos dados recebidos, qual ação presente aqui no Model deverá ser executada.


const dbConnection = require("../../config/db.config");


//DEFININDO ATRIBUTOS DO FUNCIONÁRIO NA DATABASE
const Employee = function (employee){
    this.first_name   = employee.first_name,
    this.last_name    = employee.last_name,
    this.email        = employee.email,
    this.phone        = employee.phone,
    this.organization = employee.organization,
    this.designation   = employee.designation,
    this.salary       = employee.salary,
    this.status       = employee.status ? employee.status : 1,
    this.created_at   = new Date(),
    this.updated_at   = new Date()
}

//FUNÇÃO PARA PEGAR TODOS OS FUNCIONÁRIOS
Employee.getAll = (result) => {
    dbConnection.query("SELECT * FROM employees", (err, res) =>{
        if(err){
            console.log("Houve um erro ao recuperar todos os funcionários. Mais detalhes:", err);
            result(null, err);
        } else {
            console.log("Funcionários recuperados com sucesso.");
            result(null, res);
        }
    })
}

//FUNÇÃO PARA PEGAR FUNCIONÁRIOS ESPECÍFICOS
Employee.getSpecificEmployee = (id, result) => {
    dbConnection.query("SELECT * FROM employees WHERE id=?", id, (err, res) =>{
        if(err){
            console.log("Houve um erro ao recuperar este funcionário. Mais detalhes:", err);
            result(null, err);
        } else {
            console.log("Funcionário recuperado com sucesso.");
            result(null, res);
        }
    })
}

//FUNÇÃO PARA CADASTRAR NOVO FUNCIONÁRIO
Employee.postEmployee = (requestData, result) => {
    dbConnection.query("INSERT INTO employees SET ?", requestData, (err, res) =>{
        if(err){
            console.log("Houve um erro ao cadastrar este funcionário. Mais detalhes:", err);
            result(null, err);
        } else {
            console.log("Funcionário cadastrado com sucesso.");
            result(null, res);
        }
    })
}

//FUNÇÃO PARA ATUALIZAR FUNCIONÁRIO
Employee.updateEmployee = (id, requestData, result) => {
    dbConnection.query(`UPDATE employees SET ? WHERE id=?`, [requestData, id], (err, res) =>{
        if(err){
            console.log("Houve um erro ao atualizar este funcionário. Mais detalhes:", err);
            result(null, err);
        } else {
            console.log("Funcionário atualizado com sucesso.");
            result(null, res);
        }
    })
}

//FUNÇÃO PARA DELETAR FUNCIONÁRIO
Employee.deleteEmployee = (id, result) => {
    dbConnection.query("DELETE FROM employees where id=?", id, (err, res) =>{
        if(err){
            console.log("Houve um erro ao deletar este funcionário. Mais detalhes:", err);
            result(null, err);
        } else {
            console.log("Funcionário deletado com sucesso.");
            result(null, res);
        }
    })
}

module.exports = Employee;