import { React, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './style/Form.css'

export default function Form() {
    const applicationJSON = require('./applications.json')
  
    const { 
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful},
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            comment: ''
        }
    });

    const onSubmit = (data) => {
        const userInput = JSON.stringify(data)
        console.log(userInput)
    }

    useEffect(() => {
        if(isSubmitSuccessful) {
            reset()
        }
        
    },[reset, isSubmitSuccessful]);
    
    return (
        <div className='form-container'>
            <h1>
                Application Request Form
            </h1>
            <form className='submission-form' onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='name'>Name*</label>
                <input id='name' placeholder='Name'{...register('name', {
                    required: 'Name is required',
                    validate: {
                        matchPattern: (v) => /^[a-zA-Z\s]+$/.test(v) || "Name can not contain numbers",
                      },})}/>
                {errors.name?.message && (
                    <small>{errors.name.message}</small>
                )}
                <label htmlFor='email'>Email*</label>
                <input id='email' placeholder='Email'{...register('email', {
                    required: 'Email is required',
                    validate: {
                        maxLength: (v) =>
                          v.length <= 50 || "The email should have at most 50 characters",
                        matchPattern: (v) =>
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                          "Email address must be a valid address",
                      },})}/>
                {errors.email?.message && (
                    <small>{errors.email.message}</small>
                )}
                <label htmlFor='application'>Select Application(s)*</label>
                <select id='application' multiple {...register('application', {required: true})}>
                    <option value=''> --Select an Option-- </option>
                    {applicationJSON.applications.map((application, i) => { 
                        return  (
                    <option key={i} value={application.title}>{application.title}</option>)})}
                </select>
                {errors.application && <small>Please select an application</small>}
                <label htmlFor='comment'>Comments</label>
                <input id='comment' placeholder='Comments'{...register('comment')}/>
                <button type='submit' >Submit Form</button>
                <button type='button' onClick={() => 
                    reset()             
                }>Reset Form</button>
            </form>
        </div>
    )
}