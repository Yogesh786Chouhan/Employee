const {  getAllEmployees, getEmployeeById, deleteEmployeeById, updateEmployeeById, createEmployee } = require("../Controllers/EmployeeController");
const { CloudinaryFileUploader } = require("../Middlewares/FileUploader");

const routes = require("express").Router();

routes.get("/getallemp", getAllEmployees);

routes.get("/getallemp/:id", getEmployeeById);

routes.delete("/getallemp/:id", deleteEmployeeById);

routes.put("/update/:id", CloudinaryFileUploader.single("profileImage"), updateEmployeeById);

routes.post("/", CloudinaryFileUploader.single("profileImage"), createEmployee);

module.exports = routes;