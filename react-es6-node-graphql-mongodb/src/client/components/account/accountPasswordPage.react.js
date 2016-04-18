import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import userActions from '../../actions/userActions';
import {UserStore} from '../../stores/userStore';
import {AuthStore} from '../../stores/authStore';
import ViewField from '../common/viewField.react';
import TextInput from '../common/textInput.react';

class AccountPasswordPage extends Component {
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
            passwords: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
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
                <h1 className="title">Account: Change Password</h1>

                <ul className="actions">
                    <li><Link to="/account">back</Link></li>
                </ul>

                <ViewField label="" value={this.state.user.firstName + ' ' + this.state.user.lastName} className="bottom-border" />

                <form name="changePasswordForm" onSubmit={e => e.preventDefault()}>
                    <TextInput name="oldPassword" label="Old Password" className="password" type="password"
                        value={this.state.passwords.oldPassword}
                        onChange={this._onChange}
                        error={this.state.errors.oldPassword}
                        showErrorMessage={true} />

                    <TextInput name="newPassword" label="New Password" className="password" type="password"
                        value={this.state.passwords.newPassword}
                        onChange={this._onChange}
                        error={this.state.errors.newPassword}
                        showErrorMessage={true} />

                    <TextInput name="confirmPassword" label="Confirm" className="password" type="password"
                        value={this.state.passwords.confirmPassword}
                        onChange={this._onChange}
                        error={this.state.errors.confirmPassword}
                        showErrorMessage={true} />

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
        this.state.passwords[field] = value;
        this.setState({passwords: this.state.passwords});
    }

    _save = (e) => {
        e.preventDefault();

        if (!this._formIsValid()) {
            return;
        }

        this.state.user.password = this.state.passwords.newPassword;
        userActions.updateUser(this.state.user);
        this.context.router.push('/account');
    }

    _cancel = (e) => {
        e.preventDefault();
        this.context.router.push('/account');
    }

    _formIsValid = () => {
        let formIsValid = true;
        let requiredField = ['oldPassword', 'newPassword'];

        this.state.errors = {};
        for (let f of requiredField) {
            if (this.state.passwords[f].trim().length === 0) {
                this.state.errors[f] = 'required';
                formIsValid = false;
            }
        }
        if (this.state.passwords.oldPassword !== this.state.user.password) {
            this.state.errors.oldPassword = 'password is incorrect';
            formIsValid = false;
        }
        if (this.state.passwords.newPassword !== this.state.passwords.confirmPassword) {
            this.state.errors.confirmPassword = 'passwords must match';
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});
        return formIsValid;
    }
}

export default AccountPasswordPage;
