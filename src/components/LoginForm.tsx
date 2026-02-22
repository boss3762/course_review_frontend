import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

type LoginFormProps = {
    loginCallback: () => void;
}

const LoginForm = (props: LoginFormProps) => {
    const [loginErrorMessage, setLoginErrorMessage] = React.useState("");
    const navigate = useNavigate();

    return (
        <div className="LoginForm">
            <Formik
                initialValues={{ username: '', password: '' }}
                validate={values => {
                    const errors: any = {};
                    if (values.username === '') {
                        errors.username = 'Username is required';
                    }
                    if (values.password === '') {
                        errors.password = 'Password is required';
                    }
                    return errors;
                }}
                onSubmit={async (values, actions) => {
                    const result = await AuthService.loginUser(values.username, values.password);
                    if (!result) {
                        setLoginErrorMessage("Invalid username or password");
                    } else {
                        setLoginErrorMessage("");
                        if (props.loginCallback) {
                            props.loginCallback();
                        }
                        navigate("/");
                    }
                    actions.setSubmitting(false);
                }}>
                {
                    ({ isSubmitting }) => (
                        <Form>
                            {
                                loginErrorMessage && (
                                    <div>{loginErrorMessage}</div>
                                )
                            }
                            <Field type="input" name="username" />
                            <ErrorMessage name="username" component="div" />
                            <Field type="password" name="password" />
                            <ErrorMessage name="password" component="div" />
                            <button disabled={isSubmitting}>Login</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default LoginForm;