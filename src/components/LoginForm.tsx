import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';

const LoginForm = () => {
    return (
        <div className="LoginForm">
            <Formik 
                initialValues={{username: '', password: ''}} 
                validate={values => {
                    const errors:any = {};
                    if (values.username === ''){
                        errors.username = 'Username is required';
                    }
                    if (values.password === ''){
                        errors.password = 'Password is required';
                    }
                    return errors;
                }}
                onSubmit={(values, actions) => {
                console.log(values);
                actions.setSubmitting(false);
            }}>
            {
                ({isSubmitting}) => (
                    <Form>
                        <Field type="input" name="username" />
                        <ErrorMessage name="username" component="div"/>
                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div"/>
                        <button disabled={isSubmitting}>Login</button>
                    </Form>
                )
            }
            </Formik>
        </div>
    )
}

export default LoginForm;