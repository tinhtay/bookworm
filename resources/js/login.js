
import axios from 'axios'
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Account extends Component {
    state = {
        email: '',  
        password: ''
    }

    handleInput = (e) => {
        this.setState({ email: e.target.value });
    }

    checkUser = async (e) => {
        e.preventDefault();

        const res = await axios.post('http://127.0.0.1:8000/api/Account/login', this.state);
        if(res.data.status === 200){
            console.log(res.data.message);
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-header'><h4>
                                <link to={'login-user'} className='btn btn-primary btn-sm float-end' >Login User</link>
                            </h4></div>
                            <div className='card-body'>
                                <form onSubmit={this.checkUser} method='post'>
                                    <div className='form-group mb-3'>
                                        <label>Email: </label>
                                        <input type='text' className='email' placeholder='Email' name='email' onChange={this.handleInput} value={this.state.email}/>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Password: </label>
                                        <input type='password' className='password' placeholder='Password' name='password' onChange={this.handleInput} value={this.state.password}/>
                                    </div>
                                    <div className='form-group mb-3'>
                                       <button type='submit' className='btn btn-primary'>Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default Account;