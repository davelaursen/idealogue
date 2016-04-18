import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import authActions from '../../actions/authActions';
import {AuthStore, AuthEvents} from '../../stores/authStore';
import TextInput from '../common/textInput.react';

class SignupPage extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            signup: {
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            errors: {}
        };
    }

    componentWillMount() {
        AuthStore.on(AuthEvents.Signup, this._onSignup);
        AuthStore.on(AuthEvents.Login, this._onLogin);
    }

    componentWillUnmount() {
        AuthStore.removeListener(AuthEvents.Signup, this._onSignup);
        AuthStore.removeListener(AuthEvents.Login, this._onLogin);
    }

    render() {
        return (
            <section>
                <h1 className="title">Create Account</h1>

                <ul className="actions">
                    <li><Link to="login">back</Link></li>
                </ul>

                <form name="createAccountForm" onSubmit={e => e.preventDefault()}>
                    <TextInput name="username" label="Username" className="id"
                        value={this.state.signup.username}
                        onChange={this._onChange}
                        error={this.state.errors.username}
                        showErrorMessage={this.state.errors.username && this.state.errors.username !== 'required'}
                        autoFocus={true} />

                    <TextInput name="firstName" label="First Name" className="name"
                        value={this.state.signup.firstName}
                        onChange={this._onChange}
                        error={this.state.errors.firstName} />

                    <TextInput name="lastName" label="Last Name" className="name"
                        value={this.state.signup.lastName}
                        onChange={this._onChange}
                        error={this.state.errors.lastName} />

                    <TextInput name="email" label="Email" className="email" type="email"
                        value={this.state.signup.email}
                        onChange={this._onChange}
                        error={this.state.errors.email} />

                    <TextInput name="password" label="Password" className="password" type="password"
                        value={this.state.signup.password}
                        onChange={this._onChange}
                        error={this.state.errors.password} />

                    <TextInput name="confirmPassword" label="Confirm" className="password" type="password"
                        value={this.state.signup.confirmPassword}
                        onChange={this._onChange}
                        error={this.state.errors.confirmPassword}
                        showErrorMessage={true} />

                    <fieldset className="form-button-group">
                        <button type="button" className="form-button button-default" onClick={this._create}>create</button>
                        <button type="button" className="form-button" onClick={this._cancel}>cancel</button>
                    </fieldset>
                </form>
            </section>

        );
    }

    _onSignup = (message) => {
        console.log('message:', message);
        if (message) {
            console.log(message);
            this.state.errors.username = message;
            this.setState({errors: this.state.errors});
        } else {
            authActions.login(this.state.signup.username, this.state.signup.password);
        }
    }

    _onLogin = (user) => {
        if (user) {
            this.context.router.push('/ideas');
        } else {
            console.log('something weird happened...');
        }
    }

    _onChange = (e) => {
        var field = e.target.name;
        var value = e.target.value;
        this.state.signup[field] = value;
        this.setState({signup: this.state.signup});
    }

    _create = (e) => {
        e.preventDefault();

        if (!this._formIsValid()) {
            return;
        }

        let user = {
            username: this.state.signup.username,
            firstName: this.state.signup.firstName,
            lastName: this.state.signup.lastName,
            email: this.state.signup.email,
            password: this.state.signup.password
        };
        authActions.signup(user);
    }

    _cancel = (e) => {
        e.preventDefault();
        this.context.router.push('/login');
    }

    _formIsValid = () => {
        let formIsValid = true;
        let requiredField = ['username', 'firstName', 'lastName', 'email', 'password'];

        this.state.errors = {};
        for (let f of requiredField) {
            if (this.state.signup[f].trim().length === 0) {
                this.state.errors[f] = 'required';
                formIsValid = false;
            }
        }
        if (this.state.signup.password !== this.state.signup.confirmPassword) {
            this.state.errors.confirmPassword = 'passwords must match';
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});
        return formIsValid;
    }
}

export default SignupPage;
