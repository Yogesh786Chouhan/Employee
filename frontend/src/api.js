

const BASE_URL = 'http://localhost:4000';

export const GetAllEmployees = async (search = "", page = 1, limit = 5) => {
    const url = `${BASE_URL}/api/employees/getallemp?search=${search}&page=${page}&limit=${limit}`;
    // const url = `${BASE_URL}/?search=${search}&page=${page}&limit=${limit}`;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const { data } = await result.json();

        return data;
    } catch (err) {
        return err;
    }
}

export const CreateEmployee1 = async (empObj) => {
    const url = `${BASE_URL}/api/employees`;
    console.log('url ', url);

    const formData = new FormData();

    for (const key in empObj) {
        formData.append(key, empObj[key]);
    }

    const options = {
        method: 'POST',
        body: formData
    };

    try {
        const result = await fetch(url, options);

        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }

        const contentType = result.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await result.json();
            return data;
        } else {
            const text = await result.text();
            throw new Error(`Expected JSON but received: ${text}`);
        }
    } catch (err) {
        console.error('Error creating employee:', err);
        return {
            success: false,
            message: err.message,
        };
    }
};

export const UpdateEmployeeById = async (empObj, id) => {
    const url = `${BASE_URL}/api/employees/update/${id}`;
    console.log('url ', url);
    const formData = new FormData();

    for (const key in empObj) {
        formData.append(key, empObj[key]);
    }
    const options = {
        method: 'PUT',
        body: formData
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        console.log('<---update--> ', data);
        return data;
    } catch (err) {
        return err;
    }
};

export const DeleteEmployeeById = async (id) => {
    const url =
        `${BASE_URL}/api/employees/getallemp/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        // console.log(data);
        return data;
    } catch (err) {
        return err;
    }
}

export const GetEmployeeById = async (id) => {
    const url =
        `${BASE_URL}/api/employees/getallemp/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const { data } = await result.json();
        // console.log(data);
        return data;
    } catch (err) {
        return err;
    }
}
