import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";

import axios from "axios";

const CreatePost = ({ getposts }) => {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState('');

    const create = async () => {
        if (!title.trim()) {
            setError('Title is required.');
            return;
        }
        setError('');

        const post = { title, body };
        console.log(post);
        try {
            const res = await axios.post('http://localhost:1111/api/post', post);
            console.log(res);
            getposts();
            setVisible(false);
            setTitle('');
            setBody('');
        } catch (error) {
            console.error("Error creating post", error);
        }
    };

    return (
        <div className="card flex justify-content-center">
            <Button label="create new" icon="pi pi-plus" onClick={() => setVisible(true)} />
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
                            <Button label="create" onClick={() => create()} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10" />
                            <Button label="Cancel" onClick={() => setVisible(false)}  text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"/>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    );
};

export default CreatePost;
