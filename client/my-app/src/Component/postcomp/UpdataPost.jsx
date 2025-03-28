import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import axios from "axios";

const UpdataPost = ({ post,getposts }) => {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);
    const [error, setError] = useState('');

    const create = async () => {
        if (!title.trim()) {
            setError('Title is required.');
            return;
        }
        setError('');

        const updatedpost = { ...post, title, body };
        try {
            const res = await axios.put('http://localhost:1111/api/post', updatedpost);
            console.log(res);
            getposts();
            setVisible(false);
           
        } catch (error) {
            console.error("Error updating post", error);
        }
    };

    return (
        <div className="card flex justify-content-center">
            <Button icon="pi pi-pencil" className="p-button-rounded"
                         style={{
                                backgroundColor: "lightblue",
                                borderColor: 'lightblue'
                            }} onClick={() => setVisible(true)} />
            <Dialog
                visible={visible}
                modal
                onHide={() => setVisible(false)}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" 
                        style={{ 
                            borderRadius: '12px', 
                            backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' 
                        }}>
                        <div className="inline-flex flex-column gap-2">
                            <label className="text-primary-50 font-semibold">
                            Title
                            </label>
                            <InputText 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}  
                                placeholder="title" 
                            />
                            {error && <small className="p-error">{error}</small>}
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label className="text-primary-50 font-semibold">
                            Body
                            </label>
                            <InputText 
                                value={body}
                                onChange={(e) => setBody(e.target.value)}  
                                placeholder="body" 
                            />
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="update" onClick={() => create()} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10" />
                            <Button label="Cancel" onClick={() => setVisible(false)}  text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"/>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    );
};

export default UpdataPost;
