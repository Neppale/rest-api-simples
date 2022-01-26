//Aqui nos Controllers definimos as funções que vão ser chamadas pelo Router. Lembrando - aqui não pegamos dado NENHUM.
//Por exemplo - caso seja feita uma requisição do tipo GET na URL "localhost:5000/employees". O arquivo Routes então manda o Controller executar a função definida aqui neste arquivo como "getAllEmployees". Na função aqui definida, ele chama a função "getAll" presente no arquivo Model, responsável por salvar os dados recebidos no Router no Banco de Dados!
//Também temos mensagens de erro caso haja algum problema ao executar o código com o dado recebido (ou seja, se receber um erro aqui, significa que o dado provavelmente foi recebido da forma correta, mas não foi para o Model).


const { sendStatus } = require("express/lib/response");
const Employee = require("../models/employee")

//PEGAR LISTA DE FUNCIONÁRIOS
exports.getAllEmployees = (req, res) => {
    Employee.getAll((err, employees) => {
        if (err){
            res.send(err);
        } else {
            res.send(employees)
        }
    })
}

//PEGAR FUNCIONÁRIO ESPECÍFICO POR ID
exports.getSpecificEmployee = (req, res) => {
    Employee.getSpecificEmployee(req.params.id, (err, employee) => {
        if (err){
            res.send(err);
        } else {
            res.send(employee)
        }
    })
}

//CRIAR NOVO FUNCIONÁRIO
exports.postEmployee = (req, res) => {
    const employeeData = new Employee(req.body);

    //CHECAR PARA VER SE O DADO RECEBIDO É NULO
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send("Algo deu errado na sua requisição. Verifique se todos os campos foram preenchidos corretamente.");
    } else {
        Employee.postEmployee(employeeData, (err, employee) => {
            if (err){
                    res.json({status: "unsuccessful", message: "Algo deu errado. Tente novamente mais tarde.", err})
                } else {
                        res.send({status: "successful", message: "Funcionário cadastrado com sucesso.", employee});
                    }
        })
    }
}

//ATUALIZAR FUNCIONÁRIO POR ID
exports.updateEmployee = (req, res) => {
    const employeeData = new Employee(req.body);

    //CHECAR PARA VER SE O DADO RECEBIDO É NULO
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send("Algo deu errado na sua requisição. Verifique se todos os campos foram preenchidos corretamente.");
    } else {
        Employee.updateEmployee(req.params.id, employeeData, (err, employee) => {
            if (err){
                    res.json({status: "unsuccessful", message: "Algo deu errado. Tente novamente mais tarde.", err});
                } else {
                        res.send({status: "successful", message: "Funcionário atualizado com sucesso.", employee});
                    }
        })
    }
}

//DELETAR FUNCIONÁRIO POR ID
exports.deleteEmployee = (req, res) => {
    Employee.deleteEmployee(req.params.id, (err, employee) => {
        if (err){
            res.send(err);
        } else {
            res.json({status: "successful", message: "Funcionário deletado com sucesso."}, employee)
        }
    })
}