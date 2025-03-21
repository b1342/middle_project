import { React, useEffect, useState } from "react"
import axios from 'axios'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import CreateUser from './userComp/CreateUser'
import UpdateUser from "./userComp/UpdateUser";
const Users = () => {
    const [user, setUser] = useState([]);
    const [newuser, setNewUser] = useState(false)
    const[upduser,setupduser]=useState(false)
    const[spechuser,setspechuser]=useState(null)
    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'username', header: 'Username' },
        { field: 'email', header: 'Email' },
        { field: 'createdAt', header: 'CreatedAt' },
        { field: 'updatedAt', header: 'UpdatedAt' }

    ];
    const deleteuser = async (id) => {
        const res = await axios.delete(`http://localhost:1111/api/user/${id}`)
        getUsers()
    }
    
    const getUsers = async () => {
        const res = await axios.get(`http://localhost:1111/api/user`)
        console.log(res.data);
        setUser(res.data)
    }

    const updateuser=(user)=>{
        setspechuser(user)
        setupduser(true)
        
    }
    const statusBodyTemplate = (user) => {
        return <Button onClick={() => { deleteuser(user._id) }}>delete</Button>;
    };
    const aaa = (user) => {
        return <Button onClick={() => { updateuser(user) }}>update</Button>;
    }
    useEffect(() => {
        getUsers();
    }, [])
    useEffect(() => {
        getUsers();
    }, [newuser,upduser])
   return (
        <>
            {!newuser ? (
                <>
                {upduser? <>
                    {console.log(spechuser)}
                    <UpdateUser user={spechuser} setupduser={setupduser}/>
                </>:<>
                    <Button icon="pi pi-plus" onClick={() => setNewUser(true)} />
                    <DataTable value={user} tableStyle={{ minWidth: '50rem' }}>
                        {columns.map((col) => (
                            <Column key={col.field} field={col.field} header={col.header} />
                        ))}
                        <Column header="Delete" body={statusBodyTemplate} />
                        <Column header="Update" body={aaa} />
                    </DataTable>
                    
               </> }</>
            ) : (
                <CreateUser setNewUser={setNewUser}/>
            )}
        </>
    )
}

export default Users