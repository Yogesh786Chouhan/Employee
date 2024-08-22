
const EmployeeModel = require("../Models/EmployeeModel");

const createEmployee = async (req, res) => {
    try {
        const body = req.body;
        const profileImage = req?.file ? req?.file?.path : null;
        body.profileImage = profileImage;
        const emp = new EmployeeModel(body);

        await emp.save();
        res.status(201)
            .json({
                message: 'Employee Created',
                success: true
            });
    } catch (err) {
        console.log('Error ', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}

const getAllEmployees = async (req, res) => {
    try {
        let { page, limit, search } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;
        const skip = (page - 1) * limit; // Corrected to use limit variable

        let searchCriteria = {};
        if (search) {
            searchCriteria = {
                name: {
                    $regex: search,
                    $options: "i" // Changed $option to $options
                }
            };
        }

        const totalEmployees = await EmployeeModel.countDocuments(searchCriteria);
        const emps = await EmployeeModel.find(searchCriteria)
            .skip(skip)
            .limit(limit)
            .sort({ updatedAt: -1 });

        const totalPages = Math.ceil(totalEmployees / limit);

        res.status(200).json({
            message: "All Employees",
            success: true,
            data: {
                employees: emps,
                pagination: {
                    totalEmployees,
                    currentPage: page,
                    totalPages,
                    pageSize: limit
                }
            }
        });
    } catch (error) {
        console.log(error); // Changed err to error
        res.status(500).json({
            message: 'Internal server error',
            success: false,
            error: error.message
        });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;

        const emp = await EmployeeModel.find({ _id: id });

        res.status(200).json({
            message: "Get Employee details",
            success: true,
            data: emp
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            success: false,
            error: error.message
        });
    }
};

const deleteEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;

        const emp = await EmployeeModel.findByIdAndDelete({ _id: id });

        res.status(200).json({
            message: " Employee deleted",
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            success: false,
            error: error.message
        });
    }
};

const updateEmployeeById = async (req, res) => {
    try {


        const { name, phone, email, salary, department } = req.body;
        const { id } = req.params;
        let updateData = {
            name, phone, email, salary, department, updateAt: new Date()
        }
        if (req.file) {
            updateData.profileImage = req.file.path;
        }
        const updateEmployee = await EmployeeModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        )
        if (!updateEmployee) {
            return res.status(404).json({
                message: "Employee Not Found"
            });
        }

        res.status(201).json({
            message: "Employee Updated",
            success: true,
            data: updateData
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    deleteEmployeeById,
    updateEmployeeById
};