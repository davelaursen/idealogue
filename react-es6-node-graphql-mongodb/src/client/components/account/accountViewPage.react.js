import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import authActions from '../../actions/authActions';
import userActions from '../../actions/userActions';
import {UserStore, UserEvents} from '../../stores/userStore';
import {AuthStore} from '../../stores/authStore';
import ViewField from '../common/viewField.react';

class AccountViewPage extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    componentWillMount() {
        let userId = AuthStore.getCurrentUser()._id;
        UserStore.getUserById(userId)
            .done(user => {
                this.setState({ user: user });
            });

        UserStore.on(UserEvents.Delete, this._onDeleted);
    }

    componentWillUnmount() {
        UserStore.removeListener(UserEvents.Delete, this._onDeleted);
    }

    render() {
        return (
            <section>
                <h1 className="title">Account</h1>

                <ul className="actions">
                    <li><Link to="/account/edit">edit</Link></li>
                    <li><Link to="/account/password">change password</Link></li>
                    <li><a href="" onClick={this._remove}>delete</a></li>
                </ul>

                <div>
                    <ViewField label="" value={this.state.user.firstName + ' ' + this.state.user.lastName} className="bottom-border" />
                    <ViewField label="Username" value={this.state.user.username} />
                    <ViewField label="Email" value={this.state.user.email} />
                    <ViewField label="Joined" value={moment(this.state.user.createdDate).format('M/DD/YYYY')} />
                </div>
            </section>
        );
    }

    _onDeleted = (id) => {
        if (id === this.state.user._id) {
            setTimeout(() => {
                authActions.logout();
                this.context.router.push('/login');
            }, 1);
        }
    }

    _remove = (e) => {
        e.preventDefault();
        userActions.deleteUser(this.state.user._id);
    }
}

export default AccountViewPage;
