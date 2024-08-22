import React, { useEffect, useState } from 'react';
import { CreateEmployee1, UpdateEmployeeById } from '../api';
import { notify } from '../utils';

const AddEmployee = ({ showModal, setShowModal, fetchEmployee, updateEmpObj }) => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        salary: '',
        profileImage: null
    });

    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        if (updateEmpObj) {
            setEmployee(updateEmpObj);
            setUpdateMode(true);
        }
    }, [updateEmpObj]);
    const resetEmployeeStates = () => {
        setEmployee({
            name: '',
            email: '',
            phone: '',
            department: '',
            salary: '',
            profileImage: null,
        })
    }

    const closeModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        console.log(employee)
        setEmployee({ ...employee, [name]: value });
    };

    const handleFileChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.files[0] });
    };


    //ADD / Update Employee
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(employee)
        try {
            const { success, message } = updateMode ?
                await UpdateEmployeeById(employee, employee._id) :
                await CreateEmployee1(employee );
            if (success) {
                notify(message, 'success')
            } else {
                notify(message, 'error')
            }
            setShowModal(false)
            resetEmployeeStates();
            fetchEmployee()
        } catch (error) {
            console.error(error);
            notify('Failed to create Employee', 'error')
        }
    };

    return (
        <div
            className={`modal fade ${showModal ? 'show' : ''}`}
            tabIndex={-1}
            role="dialog"
            style={{
                display: showModal ? 'block' : 'none',
                backgroundColor: 'rgba(0,0,0,0.5)' 
            }}
            aria-modal="true"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{updateMode ? 'Update Employee' : 'Add Employee'}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={closeModal}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit} method='post'>
                            <div className="mb-3">
                                <label htmlFor="employeeName" className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={employee.name}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter employee name"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="employeeEmail" className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={employee.email}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter employee email"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="employeePhone" className="form-label">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={employee.phone}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter employee phone"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="employeeDepartment" className="form-label">Department</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={employee.department}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter employee department"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="employeeSalary" className="form-label">Salary</label>
                                <input
                                    type="text"
                                    name="salary"
                                    value={employee.salary}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter employee salary"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="employeeProfileImage" className="form-label">Profile Image</label>
                                <input
                                    type="file"
                                    name="profileImage"
                                    onChange={handleFileChange}
                                    className="form-control"
                              
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                <button type="submit" className="btn btn-primary">{updateMode ? 'Update' : 'Save'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmployee;
