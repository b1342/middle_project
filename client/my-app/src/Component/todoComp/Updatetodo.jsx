import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import axios from "axios";
const Updatatodo=({todo,gettodos})=>{
    const [visible, setVisible] = useState(false);
    const[title,setTitle]=useState('')
    const[tags,setTags]=useState('')

    const create=async()=>{
        todo.title=title
        todo.tags=tags
        console.log(todo)
        const res=await axios.put('http://localhost:1111/api/todo',todo)
        console.log(res)
        gettodos()
    }
    return (
        <div className="card flex justify-content-center">
            <Button icon="pi pi-pencil" className="p-button-rounded"
                            style={{
                                backgroundColor: "orange",
                                borderColor: 'orange'
                            }}onClick={() => setVisible(true)}></Button>
            
            <Dialog
                visible={visible}
                modal
                onHide={() => {if (!visible) return; setVisible(false); }}
                content={({ hide }) => (
                    setTitle(todo.title),setTags(todo.tags),
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                       
                        <div className="inline-flex flex-column gap-2">
                            
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                title
                            </label>
                            
                            <InputText onChange={(e) => { setTitle(e.target.value) }} defaultValue={todo.title} placeholder="title" />
                           
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                tags
                            </label>
                            <InputText onChange={(e) => { setTags(e.target.value) }} defaultValue={todo.tags} placeholder="title" />
                              
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="update" onClick={(e) =>{create(); hide(e)}} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    )
}
export default Updatatodo    