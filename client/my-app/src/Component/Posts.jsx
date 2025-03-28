import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView} from 'primereact/dataview';
import CreatePost from './postcomp/CreatePost';
import UpdatePost from './postcomp/UpdataPost';
import axios from 'axios';


const Posts=()=>{
    const [products, setProducts] = useState([]);
    const layout='grid';

    const getposts=async()=>{
        const res=await axios.get('http://localhost:1111/api/post')
        setProducts( res.data)
    }

    const deletepost=async(_id)=>{
        console.log({_id})
        const res=await axios.delete(`http://localhost:1111/api/post/${_id}`)
        getposts()
    }

    useEffect(() => {
        getposts()
    }, []);

    
    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-book"></i>
                            <span className="text-2xl font-bold">{product.title}</span>
                        </div>
                      
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        
                        <div className="font-semibold">{product.body}</div>
                        
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        
                        <UpdatePost post={product} getposts={getposts} />
                        <Button onClick={()=>{deletepost(product._id)}} icon="pi pi-trash" className="p-button-rounded"
                        style={{
                            backgroundColor: "lightgreen",
                            borderColor: 'lightgreen'
                        }}></Button>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (products, layout) => {
        return <div className="grid grid-nogutter">{products.map((product) => gridItem(product))}</div>;
    };

    return (
        <div className="card">
            <CreatePost getposts={getposts}/>
            <DataView value={products} listTemplate={listTemplate} layout={layout} />
        </div>
    )
}
export default Posts        