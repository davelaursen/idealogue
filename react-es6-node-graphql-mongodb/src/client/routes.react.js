import React from 'react';
import {IndexRedirect, Route, Redirect} from 'react-router';
import {AuthStore} from './stores/authStore';
import App from './components/app.react';
import NotFoundPage from './components/404.react';
import LoginPage from './components/login/loginPage.react';
import SignupPage from './components/login/signupPage.react';
import IdeaListPage from './components/ideas/ideaListPage.react';
import IdeaCreationPage from './components/ideas/ideaCreationPage.react';
import IdeaViewPage from './components/ideas/ideaViewPage.react';
import IdeaEditPage from './components/ideas/ideaEditPage.react';
import PersonListPage from './components/people/personListPage.react';
import PersonViewPage from './components/people/personViewPage.react';
import AccountViewPage from './components/account/accountViewPage.react';
import AccountEditPage from './components/account/accountEditPage.react';
import AccountPasswordPage from './components/account/accountPasswordPage.react';

var routes = (
    <Route path="/" component={App}>
        <IndexRedirect to="ideas" />

        <Route path="login" component={LoginPage} />
        <Route path="register" component={SignupPage} />

        <Route path="ideas" component={IdeaListPage} onEnter={requireAuth} />
        <Route path="ideas/new" component={IdeaCreationPage} onEnter={requireAuth} />
        <Route path="ideas/:ideaId" component={IdeaViewPage} onEnter={requireAuth} />
        <Route path="ideas/:ideaId/edit" component={IdeaEditPage} onEnter={requireAuth} />

        <Route path="people" component={PersonListPage} onEnter={requireAuth} />
        <Route path="people/:personId" component={PersonViewPage} onEnter={requireAuth} />

        <Route path="account" component={AccountViewPage} onEnter={requireAuth} />
        <Route path="account/edit" component={AccountEditPage} onEnter={requireAuth} />
        <Route path="account/password" component={AccountPasswordPage} onEnter={requireAuth} />

        <Redirect from="signup" to="register" />

        <Route path="*" component={NotFoundPage} />
    </Route>
);

function requireAuth(nextState, replace) {
    if (!AuthStore.isLoggedIn()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}

export default routes;
