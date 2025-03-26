import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';

import {useNavigate}  from 'react-router-dom'

    const Home = () => {
    const navigate =useNavigate();

        const itemRenderer = (item) => (
            <a className="flex align-items-center p-menuitem-link">
                <span className={item.icon} />
                <span className="mx-2">{item.label}</span>
                {item.badge && <Badge className="ml-auto" value={item.badge} />}
                {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
            </a>
        );
        const items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                command:()=>{
                 navigate('./Home')
                }
            },
            {
                label: 'Users',
                icon: 'pi pi-user',
                command:()=>{
                    navigate('./User')
                   }
            },
            {
                label: 'Posts',
                icon: 'pi pi-pencil',
                command:()=>{
                    navigate('./Posts')
                   }

            },
            {
                label: 'Todos',
                icon: 'pi pi-thumbs-up',
                command:()=>{
                    navigate('./Todos')
                   }
            },
            {
                label: 'photos',
                icon: 'pi pi-images',
                command:()=>{
                    navigate('./photos')
                   }
            }
        ];

        const start = <img alt="logo" src='https://d3m9l0v76dty0.cloudfront.net/system/photos/9005958/large/45156ff0bcbaaa736b17375f16604441.png' height="40" className="mr-2"></img>;
        const end = (
            <div className="flex align-items-center gap-2">
                <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
                <Avatar icon="pi pi-search" shape="circle" />
            </div>
        );

        return (
            <div className="card">
                <Menubar model={items} start={start} end={end} />
                
            </div>
        )
    }
        
export default Home