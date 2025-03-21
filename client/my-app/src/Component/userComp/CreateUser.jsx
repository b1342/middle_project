import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import axios from 'axios';
import './FormDemo.css';
const CreateUser = ({ setNewUser }) => {

    const [countries, setCountries] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const defaultValues = {
        name: '',
        username: '',
        email: '',
        address: '',
        phone: '',

    }


    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = async (data) => {
        setFormData(data);

        reset();
        console.log(data)
        try {
            const response = await axios.post('http://localhost:1111/api/user/', data,)
            if (response.status == 200) {
                setNewUser(false)
            }

        }
        catch (error) {
            setShowMessage(true);
        }



    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;

    return (
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-times-circle" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
                    <h2>failed</h2>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        <h1>username have to be uniqu 😔</h1>
                    </p>
                </div>
            </Dialog>

            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Register</h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Name*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="username" control={control} rules={{ required: 'Username is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="username" className={classNames({ 'p-error': errors.name })}>username*</label>
                            </span>
                            {getFormErrorMessage('username')}
                        </div>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <Controller name="email" control={control}
                                    rules={{ required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email*</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="phone" control={control} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="phone" className={classNames({ 'p-error': errors.name })}>phone</label>
                            </span>
                            {getFormErrorMessage('phone')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="address" control={control} render={({ field, fieldState }) => (
                                    <InputText id={field.address} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="address" className={classNames({ 'p-error': errors.name })}>Address</label>
                            </span>
                            {getFormErrorMessage('address')}
                        </div>
                        <Button type="submit" label="Submit" className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}




export default CreateUser