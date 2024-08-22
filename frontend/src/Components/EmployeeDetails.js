
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetEmployeeById } from '../api';

const EmployeeDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [empDetails, setEmpDetails] = useState(null);  

    console.log('Employee ID:', id);

    const fetchEmpById = async () => {
        try {
            const data = await GetEmployeeById(id);
            // console.log('Fetched Employee Data:', data);
            if (data && Array.isArray(data) && data.length > 0) {
                setEmpDetails(data[0]);  
            } else {
                console.error('No employee data found');
            }
        } catch (err) {
            console.error('Error fetching employee details:', err);
            alert('Error fetching employee details.');
        }
    };

    console.log('Employee Details:', empDetails);

    useEffect(() => {
        fetchEmpById();
    }, [id]);

    if (!empDetails) {
        return <div>Loading...</div>;  
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>Employee Details</h2>
                </div>
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-3">
                            {empDetails.profileImage ? (
                                <img
                                    src={empDetails.profileImage}
                                    alt={empDetails.name}
                                    className="img-fluid rounded"
                                />
                            ) : (
                                <div>No Image Available</div>
                            )}
                        </div>
                        <div className="col-md-9">
                            <h4>{empDetails.name}</h4>
                            <p><strong>Email:</strong> {empDetails.email}</p>
                            <p><strong>Phone:</strong> {empDetails.phone}</p>
                            <p><strong>Department:</strong> {empDetails.department}</p>
                            <p><strong>Salary:</strong> {empDetails.salary}</p>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={() => navigate('/employee')}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;
