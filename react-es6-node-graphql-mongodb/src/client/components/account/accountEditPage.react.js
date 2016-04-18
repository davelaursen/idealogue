import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import userActions from '../../actions/userActions';
import {UserStore} from '../../stores/userStore';
import {AuthStore} from '../../stores/authStore';
import TextInput from '../common/textInput.react';

class AccountEditPage extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                firstName: '',
                lastName: '',
                email: ''
            },
            errors: {}
        };
    }

    componentWillMount() {
        let userId = AuthStore.getCurrentUser()._id;
        UserStore.getUserById(userId)
            .done(user => {
                this.setState({ user: user });
            });
    }

    render() {
        return (
            <section>
                <h1 className="title">Edit Account</h1>

                <ul className="actions">
                    <li><Link to="/account">back</Link></li>
                </ul>

                <form name="editAccountForm" onSubmit={e => e.preventDefault()}>
                    <TextInput name="id" label="Username" className="id disabled"
                        value={this.state.user.username}
                        disabled={true} />

                    <TextInput name="firstName" label="First Name" className="name"
                        value={this.state.user.firstName}
                        onChange={this._onChange}
                        error={this.state.errors.firstName}
                        autoFocus={true} />

                    <TextInput name="lastName" label="Last Name" className="name"
                        value={this.state.user.lastName}
                        onChange={this._onChange}
                        error={this.state.errors.lastName} />

                    <TextInput name="email" label="Email" className="email" type="email"
                        value={this.state.user.email}
                        onChange={this._onChange}
                        error={this.state.errors.email} />

                    <fieldset className="form-button-group">
                        <button type="button" className="form-button button-default" onClick={this._save}>save</button>
                        <button type="button" className="form-button" onClick={this._cancel}>cancel</button>
                    </fieldset>
                </form>
            </section>
        );
    }

    _onChange = (e) => {
        var field = e.target.name;
        var value = e.target.value;
        this.state.user[field] = value;
        this.setState({user: this.state.user});
    }

    _save = (e) => {
        e.preventDefault();

        if (!this._userFormIsValid()) {
            return;
        }

        userActions.updateUser(this.state.user);
        this.context.router.push('/account');
    }

    _cancel = (e) => {
        e.preventDefault();
        this.context.router.push('/account');
    }

    _userFormIsValid = () => {
        let formIsValid = true;
        let requiredField = ['firstName', 'lastName', 'email'];

        for (let f of requiredField) {
            if (this.state.user[f].trim().length === 0) {
                this.state.errors[f] = 'required';
                formIsValid = false;
            }
        }

        this.setState({errors: this.state.errors});
        return formIsValid;
    }
}

export default AccountEditPage;
