import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import axios from 'axios';
import CreateUser from './userComp/CreateUser';
import UpdateUser from './userComp/UpdateUser';

export default function CombinedComponent() {
    // TreeTable state
    const [nodes, setNodes] = useState([]);
    
    // Users state
    const [user, setUser] = useState([]);
    const [newuser, setNewUser] = useState(false);
    const [upduser, setupduser] = useState(false);
    const [spechuser, setspechuser] = useState(null);

    // Columns for DataTable
    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'username', header: 'Username' },
        { field: 'email', header: 'Email' },
        { field: 'createdAt', header: 'CreatedAt' },
        { field: 'updatedAt', header: 'UpdatedAt' }
    ];

    // Fetch Users data (for DataTable)
    const getUsers = async () => {
        const res = await axios.get('http://localhost:1111/api/user');
        setUser(res.data);
    };

    // Delete User
    const deleteuser = async (id) => {
        await axios.delete(`http://localhost:1111/api/user/${id}`);
        getUsers();
    };

    // Update User
    const updateuser = (user) => {
        setspechuser(user);
        setupduser(true);
    };

    // DataTable status column (delete button)
    const statusBodyTemplate = (user) => {
        return <Button onClick={() => deleteuser(user._id)}>Delete</Button>;
    };

    // DataTable update column (update button)
    const aaa = (user) => {
        return <Button onClick={() => updateuser(user)}>Update</Button>;
    };

    // Fetch and refresh users data
    useEffect(() => {
        getUsers();
    }, [newuser, upduser]);

 
    useEffect(() => {
       
        const transformedData = user.map((u) => ({
            key: u._id,
            data: [
                { name: u.name, username: u.username, email: u.email, createdAt: u.createdAt, updatedAt: u.updatedAt }
            ],
           
        }));

        setNodes(transformedData);
    }, [user]);

    return (
        <div>
            <div className="card">
               
                {!newuser ? (
                    <>
                        {upduser ? (
                            <>
                                <UpdateUser user={spechuser} setupduser={setupduser} />
                            </>
                        ) : (
                            <>
                                <Button icon="pi pi-plus" onClick={() => setNewUser(true)} />
                                <DataTable value={user} tableStyle={{ minWidth: '50rem' }} responsiveLayout="scroll" sortable>
                                    {columns.map((col) => (
                                        <Column key={col.field} field={col.field} header={col.header} sortable />
                                    ))}
                                    <Column header="Delete" body={statusBodyTemplate} />
                                    <Column header="Update" body={aaa} />
                                </DataTable>
                            </>
                        )}
                    </>
                ) : (
                    <CreateUser setNewUser={setNewUser} /> 
                )}
            </div>
        </div>
    );
}
