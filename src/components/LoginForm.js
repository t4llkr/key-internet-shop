import React from 'react';
import PropTypes from 'prop-types';

const loginData = {
    login: 'admin',
    password:'123'
}

class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            login: props.login,
            password: props.password,
            loginFailed: false
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        const {toNext} = this.props;
        if (this.state.login === loginData.login && this.state.password === loginData.password) {
            toNext(2);
        }
        else {
            this.setState({login: '', password: '', loginFailed: true});
        }
    }

    handleLoginChange = (e) => {
        this.setState({login: e.target.value});
     }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    offFail = () => {
        this.setState({loginFailed: false})
    }

    render() {
        return (
            <div className='login-form'>
                <form>
                    <h1>admin; 123</h1>
                    <input className='login-input'
                        onMouseDown={this.offFail}
                        name='login'
                        type='text'
                        value={this.state.login} onChange={this.handleLoginChange}
                        placeholder='Логин'/><br></br>
                    <input className='login-input'
                        onMouseDown={this.offFail}
                        name='password'
                        type='password'
                        value={this.state.password} onChange={this.handlePasswordChange}
                        placeholder='Пароль'/><br></br>
                    <div><strong>{this.state.loginFailed? 'Неверный логин или пароль!' : '   '}</strong></div>
                    <button className='login-button'
                        onClick={this.handleClick}>
                            Войти
                    </button>
                </form>
            </div>
        );
    }
}

LoginForm.propTypes = {
    loginClick: PropTypes.func,
    login: PropTypes.string,
    password: PropTypes.string
}

export default LoginForm;