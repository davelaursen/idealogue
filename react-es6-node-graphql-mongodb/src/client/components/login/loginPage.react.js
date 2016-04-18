import React, {Component, PropTypes} from 'react';
import authActions from '../../actions/authActions';
import {AuthStore, AuthEvents} from '../../stores/authStore';

class LoginPage extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            login: {
                username: '',
                password: '',
                message: ''
            }
        };
    }

    componentWillMount() {
        AuthStore.on(AuthEvents.Login, this._onLogin);
    }

    componentWillUnmount() {
        AuthStore.removeListener(AuthEvents.Login, this._onLogin);
    }

    render() {
        return (
            <section className='login'>
                <h1>Idealogue</h1>

                <form onSubmit={this._login}>
                    <div className="form-group">
                    	<input name="username" type="text" placeholder="username" className="form-element"
                            value={this.state.login.username} onChange={this._onChange} autoFocus={true} />
                    </div>
                    <div className="form-group">
                    	<input name="password" type="password" placeholder="password" className="form-element"
                            value={this.state.login.password} onChange={this._onChange} />
                    </div>
                    <button className="form-button" type="submit">login</button>
                    <button className="form-button" type="button" onClick={this._register}>register</button>
                    <span className="error-message">{this.state.login.message}</span>
                </form>
            </section>
        );
    }

    _onLogin = (user) => {
        if (user) {
            this.context.router.push('/ideas');
        } else {
            this.setState({
                login: {
                    username: '',
                    password: '',
                    message: 'invalid username or password'
                }
            });
        }
    }

    _onChange = (e) => {
        var field = e.target.name;
        var value = e.target.value;
        this.state.login[field] = value;
        this.setState({login: this.state.login});
    }

    _login = (e) => {
        e.preventDefault();
        authActions.login(this.state.login.username, this.state.login.password);
    }

    _register = (e) => {
        e.preventDefault();
        this.context.router.push('/register');
    }
}

export default LoginPage;
