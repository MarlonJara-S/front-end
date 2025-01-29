import { useEffect, useState } from 'react';
import React from 'react';
import CustomTable from '../../../ui/Table';
import { appApi } from '../../../api';

export const ListUsers = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await appApi.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const headers = ['Username', 'First Name', 'Last Name', 'Email', 'Role', 'Phone', 'Gender', 'Status'];

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4 text-black/75">Users</h1>
            <CustomTable headers={headers} data={users}/>
        </div>
    );
};