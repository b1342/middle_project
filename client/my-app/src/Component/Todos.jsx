import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import axios from 'axios'
import Createtodo from './todoComp/Createtodo';
import Updatatodo from './todoComp/Updatetodo';
const Todos = () => {
    const [todoes, settodoes] = useState([]);
    const layout = 'grid'

    const updcmp=async(id)=>{
        const res=await axios.put(`http://localhost:1111/api/todo/${id}`)
        gettodos()
    }

    const gettodos = async () => {
        const res = await axios.get('http://localhost:1111/api/todo')
        settodoes(res.data)
    }

    const deletetodo= async(id)=>{
        console.log(id)
        const res=await axios.delete(`http://localhost:1111/api/todo/${id}`)
        gettodos()
    }
    useEffect(() => {
        gettodos()
    }, []);
    
    const gridItem = (todo) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-3 p-2" key={todo.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-thumbs-up"></i>
                            <span className="font-semibold">{todo.title}</span>

                        </div>

                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <div className="text-2xl font-bold">{todo.tags}</div>
                        <Button onClick={()=>{updcmp(todo._id)}} icon="pi pi-thumbs-up" label="complete" severity="success" text raised disabled={todo.complitaed} />
                    </div>
                    <div className="flex align-items-center justify-content-between">

                    <Updatatodo todo={todo} gettodos ={gettodos}/>
                        <Button onClick={() => { deletetodo(todo._id) }} icon="pi pi-trash" className="p-button-rounded"
                            style={{
                                backgroundColor: "red",
                                borderColor: 'red'
                            }}></Button>
                         

                    </div>
                </div>
            </div>
        );
    };
    const listTemplate = (todoes, layout) => {
        return <div className="grid grid-nogutter">{todoes.map((todo) => gridItem(todo))}</div>;
    };

    return (
        <>
       <Createtodo gettodos ={gettodos}/>
        <div className="card">
            <DataView value={todoes} listTemplate={listTemplate} layout={layout} />
        </div></>
    )
}
export default Todos      