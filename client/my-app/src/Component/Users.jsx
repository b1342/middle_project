import { React , useEffect ,useState} from "react"
import axios from 'axios'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import CreateUser from './userComp/CreateUser'
const Users = () => {
    const [user,setUser]=useState([]);

    const columns = [
        {field: 'name', header: 'Name'},
        {field: 'username', header: 'Username'},
        {field: 'email', header: 'Email'},
        {field: 'createdAt', header: 'CreatedAt'},
        {field: 'updatedAt', header: 'UpdatedAt'}

    ];
const deleteuser=async(id)=>{
    const res = await axios.delete(`http://localhost:1111/api/user/${id}`)
    getUsers()
}

    const getUsers = async () => {
        const res = await axios.get(`http://localhost:1111/api/user`)
        console.log(res.data);
        setUser(res.data)
    }
    const statusBodyTemplate = (user) => {
        return <Button  onClick={()=>{deleteuser(user._id)}}>delete</Button>;
    };
    useEffect(() => {
        getUsers();
    }, [])

    return (
        
        <>
        debugger
             <Button icon="pi pi-spin pi-plus" onClick={()=>{<CreateUser/>}}/>
            <DataTable value={user} tableStyle={{ minWidth: '50rem' }}>
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
                <Column header="Delete" body={statusBodyTemplate}></Column>

            </DataTable>

        </>
    )
}

export default Users