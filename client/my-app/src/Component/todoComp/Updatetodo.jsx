import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import axios from "axios";

const UpdateTodo = ({ todo, gettodos }) => {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [tags, setTags] = useState(todo.tags);
    const [error, setError] = useState('');

    const create = async () => {
        if (!title.trim()) {
            setError('Title is required.');
            return;
        }
        setError('');

        const updatedTodo = { ...todo, title, tags };
        try {
            const res = await axios.put('http://localhost:1111/api/todo', updatedTodo);
            console.log(res);
            gettodos();
            setVisible(false);
        } catch (error) {
            console.error("Error updating todo", error);
        }

    };

    return (
        <div className="card flex justify-content-center">
            <Button icon="pi pi-pencil" className="p-button-rounded"
                style={{ backgroundColor: "orange", borderColor: 'orange' }}
                onClick={() => setVisible(true)}>
            </Button>

            <Dialog
                visible={visible}
                modal
                onHide={() => setVisible(false)}
                content={() => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                        <div className="inline-flex flex-column gap-2">
                            <label className="text-primary-50 font-semibold">Title</label>
                            <InputText
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="title"
                            />
                            {error && <small className="p-error">{error}</small>}
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label className="text-primary-50 font-semibold">Tags</label>
                            <InputText
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="tags"
                            />
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="Update" onClick={create} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="Cancel" onClick={() => setVisible(false)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    );
};

export default UpdateTodo;
