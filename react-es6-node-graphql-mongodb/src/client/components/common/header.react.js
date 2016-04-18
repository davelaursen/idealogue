import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import authActions from '../../actions/authActions';
import {AuthStore, AuthEvents} from '../../stores/authStore';
import SiteSearch from './siteSearch.react';

class Header extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            currentUserName: null,
            searchStr: ''
        };
    }

    componentWillMount() {
        let user = AuthStore.getCurrentUser();
        if (user) {
            this._onLogin(user);
        }

        AuthStore.on(AuthEvents.Login, this._onLogin);
        AuthStore.on(AuthEvents.Logout, this._onLogout);
    }

    componentWillUnmount() {
        AuthStore.removeListener(AuthEvents.Login, this._onLogin);
        AuthStore.removeListener(AuthEvents.Logout, this._onLogout);
    }

    render() {
        if (!this.state.currentUserName) {
            return null;
        }

        return (
            <div>
                <header className="header">
                    <div className="search">
                        <form onSubmit={this._openSiteSearch}>
                            <label for="searchStr">search:</label>
                            <input type="text" id="searchStr" className="form-element search-value"
                                value={this.state.searchStr} onChange={this._onChange} />
                        </form>
                    </div>
                    <div className="current-user">
                        logged in as: <span className="username">{this.state.currentUserName}</span>
                    </div>
                    <nav className="nav">
                        <ul>
                            <li><Link to="/ideas">Ideas</Link></li>
                            <li><Link to="/people">People</Link></li>
                            <li><Link to="/account">Account</Link></li>
                            <li><a href onClick={this._logout}>Logout</a></li>
                        </ul>
                    </nav>
                </header>

                {(() => {
                    if (this.state.showSiteSearch) {
                        return (
                            <SiteSearch searchStr={this.state.searchStr} onClose={this._onCloseSiteSearch} />
                        );
                    }
                })()}
            </div>
        );
    }

    _onChange = (e) => {
        e.preventDefault();
        this.setState({searchStr: e.target.value});
    }

    _onLogin = (user) => {
        if (user) {
            this.setState({currentUserName: user.firstName + ' ' + user.lastName});
        }
    }

    _onLogout = () => {
        this.setState({currentUserName: null});
    }

    _onCloseSiteSearch = (e) => {
        e.preventDefault();
        this.setState({showSiteSearch: false, searchStr: ''});
    }

    _openSiteSearch = (e) => {
        e.preventDefault();
        this.setState({showSiteSearch: true});
    }

    _logout = (e) => {
        e.preventDefault();
        authActions.logout();
        this.context.router.push('/login');
    }
}

export default Header;
