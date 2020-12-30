import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {

    const [ formData, setFormData ] = useState({
        email:'',
        password:'',
    });

    const { email, password } = formData;

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("success")
    }

    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form className="form" onSubmit={onSubmit}>
                    <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} />
                    </div>
                    <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={onChange}
                    />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to="/login">Sign Up</Link>
                </p>
            </section>
        </Fragment>   
    )
}

export default Login
