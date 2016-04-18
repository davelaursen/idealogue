import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import util from '../../utilities/util';
import {UserStore} from '../../stores/userStore';
import ListFilter from '../common/listFilter.react';

class PersonListPage extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor() {
        super();
        this._sortDesc = false;
        this.state = {
            people: [],
            filteredPeople: [],
            filterStr: '',
            showFilter: false
        };
    }

    componentWillMount() {
        UserStore.getUserList()
            .done(users => {
                this._sortPeople(users);
                this.setState({ people: users, filteredPeople: users.slice() });
            });
    }

    render() {
        let content = this.state.filteredPeople.map(person => {
            return (
                <li key={person._id}>
                    <button onClick={this._viewPerson.bind(this, person._id)}>
                        <span className="person-list-full-name">{person.firstName} {person.lastName}</span>
                        <span className="person-list-info">username: {person.username}</span>
                        <span className="person-list-info">email: {person.email}</span>
                    </button>
                </li>
            );
        });

        return (
            <section>
                <h1 className="title">People</h1>

                <ul className="actions">
                    <li><a href="" onClick={this._reverseSortOrder}>sort</a></li>
                    <li><a href="" onClick={this._toggleFilter}>filter</a></li>
                </ul>

                {(() => {
                    if (this.state.showFilter) {
                        return (<ListFilter filterStr={this.state.filterStr} onChange={this._onFilterChange} />);
                    }
                })()}

                <ul className="person-list">
                    {content}
                </ul>
            </section>
        );
    }

    _viewPerson = (id, e) => {
        e.preventDefault();
        this.context.router.push('/people/' + id);
    }

    _reverseSortOrder = (e) => {
        e.preventDefault();
        this._sortDesc = !this._sortDesc;
        this._sortPeople(this.state.people);
        this.setState({ people: this.state.people });
    }

    _sortPeople = (people) => {
        people.sort(util.sortCompareFunc('lastName', this._sortDesc, i => i.toUpperCase()));
    }

    _toggleFilter = (e) => {
        e.preventDefault();
        this.setState({ showFilter: !this.state.showFilter });
        if (this.state.showFilter) {
            this.setState({ filterStr: '', filteredPeople: this.state.people.slice() });
        }
    }

    _onFilterChange = (e) => {
        let str = e.target.value.toLowerCase();
        this.state.filteredPeople = this.state.people.filter(person => {
            return person.username.toLowerCase().indexOf(str) >= 0 ||
                person.firstName.toLowerCase().indexOf(str) >= 0 ||
                person.lastName.toLowerCase().indexOf(str) >= 0 ||
                person.email.toLowerCase().indexOf(str) >= 0;
        });
        this.setState({ filterStr: str, filteredPeople: this.state.filteredPeople });
    }

    _toList = (arr, prop) => {
        return util.arrayToString(arr, prop);
    }
}

export default PersonListPage;
