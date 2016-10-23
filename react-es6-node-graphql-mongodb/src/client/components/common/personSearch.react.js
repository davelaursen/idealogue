import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import util from '../../utilities/util';

class PersonSearch extends Component {
    static propTypes = {
        people: PropTypes.arrayOf(PropTypes.object).isRequired,
        onSelect: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            searchStr: '',
            searchResults: []
        };
    }

    render() {
        let keyCounter = 1;

        let searchResults = this.state.searchResults.map(person => {
            return (
                <li key={keyCounter++}>
                    <button onClick={this._selectPerson.bind(this, person)}>
                        <span className="person-result-full-name">{person.firstName} {person.lastName}</span>
                        <span className="person-result-info">username: {person.username}</span>
                        <span className="person-result-info">{person.email}</span>
                    </button>
                </li>
            );
        });

        return (
            <div className="person-search fade">
                <div className="person-search-container">
                    <form onSubmit={this._executeSearch}>
                        <input className="form-element small" type="text" value={this.state.searchStr} onChange={this._onChange} autoFocus={true} />
                        <button type="submit" className="hidden"></button>
                        <button type="button" className="inline person-search-close" onClick={this.props.onClose}>(close)</button>
                    </form>

                    <div className="person-search-results">
                        <ul>
                            {searchResults}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    _selectPerson = (person, e) => {
        e.preventDefault();
        this.props.onSelect(person);
    }

    _executeSearch = (e) => {
        e.preventDefault();

        let str = this.state.searchStr;
        if (util.isEmpty(str)) {
            return this.setState({searchResults: this.props.people});
        }

        str = str.toLowerCase();
        let results = this.props.people.filter(p => {
            return p.firstName.toLowerCase().indexOf(str) > -1 ||
                p.lastName.toLowerCase().indexOf(str) > -1 ||
                p.username.toLowerCase().indexOf(str) > -1 ||
                p.email.toLowerCase().indexOf(str) > -1;
        });
        this.setState({searchResults: results});
    }

    _onChange = (e) => {
        e.preventDefault();
        this.setState({searchStr: e.target.value});
    }
}

export default PersonSearch;
