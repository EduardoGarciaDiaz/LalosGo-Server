//const {body, validationResult} = require('express-validator');
const EmployeesService = require('../services/employees.service');
const bcrypt = require('bcrypt');

let self = {}

self.getAll = async function (req, res, next) {
    try {
        const data = await EmployeesService.getAllEmployees();
        return res.status(200).send({
            employees: data
        })
    } catch (error) {
        next(error);
    }
};

self.get = async function (req, res, next) {
    try {
        const { id } = req.params;
        const data = await EmployeesService.getEmployee(id);
        if (!data) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

self.create = async function (req, res, next) {
    try {
        /*const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json(errors)
            return;
        }*/
        const employee = req.body;
        const data = await EmployeesService.saveEmployee(employee);
        return res.status(201).json(data);
    } catch (error) {
        next(error);
    }
};

self.update = async function (req, res, next) {
    try {
        const { id } = req.params;
        const employee = req.body;
        await EmployeesService.getEmployee(id);
        const data = await EmployeesService.updateEmployee(id, employee);
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

self.updateStatus = async function (req, res, next) {
    try {
        const { id } = req.params;
        const employee = await EmployeesService.getEmployee(id);
        const data = await EmployeesService.updateEmployeeStatus(employee);
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

self.getEmployeeByRole = async function (req, res, next) {
    try {
        const { branchId } = req.params.branchId;
        const { role } = req.body

        const data = await EmployeesService.getEmployeeByRole( branchId, role);

        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

module.exports = self;