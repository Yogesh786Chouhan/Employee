import React from 'react'
import { Link } from 'react-router-dom';

const EmployeeTable = ({
    employees, pagination, fetchEmployee, handleUpdateEmployee, handleDeleteEmployee
}) => {
    const headers = ['Name', 'Email', 'Department', 'Actions'];
    const { currentPage, totalPages } = pagination;
    const TableRow = ({ employee }) => {
        return <tr>
            <td>
                <Link to={`/employee/${employee._id}`} className="text-decoration-none">{employee.name}</Link>
            </td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
            <td>{employee.department}</td>
            <td>
                <i
                    className='bi bi-pencil-fill text-warning me-4'
                    role="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Edit"
                    onClick={() => handleUpdateEmployee(employee)}
                ></i>
                <i
                    className='bi bi-trash-fill text-danger'
                    role="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Delete"
                    onClick={() => handleDeleteEmployee(employee)}
                ></i>


            </td>
        </tr >
    }

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePagination(currentPage + 1);
        }
    }
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handlePagination(currentPage - 1);
        }
    }
    const handlePagination = (currPage) => {
        fetchEmployee('', currPage, 5);
    }
    return (
        <>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        {
                            headers.map((header, i) => (
                                <th key={i}>{header}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((emp) => (
                            <TableRow key={emp._id} employee={emp} />
                        ))
                    }
                </tbody>

            </table>
            <div className='d-flex justify-content-between align-itmes-center my-3'>
                <span className='badge bg-primary'>Page {currentPage} of {totalPages}</span>
                <div>
                    <button
                        className='btn btn-outline-primary me-2'
                        onClick={() => handlePreviousPage()}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {
                        pageNumbers.map((page) => (
                            <button
                                onClick={() => handlePagination(page)}
                                className={`btn btn-outline-primary me-1 ${currentPage === page ? 'active' : ''}`}
                            >
                                {page}
                            </button>
                        ))
                    }
                    <button
                        className='btn btn-outline-primary ms-2'
                        onClick={() => handleNextPage()}
                        disabled={totalPages === currentPage}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default EmployeeTable
