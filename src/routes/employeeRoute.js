//Aqui definimos as rotas Get, Put, Post, e Delete e definimos o que será feito com elas dependendo de qual URL estão acessando. Em alguns casos é necessário acessar o "employee/id" para realizar funções para funcionários específicos (como alterar dados ou deletar) e em alguns casos não é preciso especificar o id (mostrar todos os dados ou adicionar novos). Esse arquivo é exportado para o resto da API através do nome router.


const express = require("express");

const router = express.Router();

const employeeController = require("../controllers/employee");

//PEGAR LISTA DE FUNCIONÁRIOS
router.get("/", employeeController.getAllEmployees);

//PEGAR FUNCIONÁRIO ESPECÍFICO POR ID
router.get("/:id", employeeController.getSpecificEmployee);

//CRIAR NOVO FUNCIONÁRIO
router.post("/", employeeController.postEmployee);

//ATUALIZAR FUNCIONÁRIO
router.put("/:id", employeeController.updateEmployee);

//DELETAR FUNCIONÁRIO
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;