import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import util from '../../utilities/util';
import {IdeaStore} from '../../stores/ideaStore';
import {UserStore} from '../../stores/userStore';

class PersonSearch extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    static propTypes = {
        onClose: PropTypes.func.isRequired,
        searchStr: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            searchStr: '',
            ideaSearchResults: [],
            personSearchResults: []
        };
    }

    componentDidMount() {
        this.state.searchStr = this.props.searchStr;
        this.setState({searchStr: this.state.searchStr});
        this._executeSearch();
    }

    render() {
        let ideaSearchResults = this.state.ideaSearchResults.map(idea => {
            return (
                <li key={idea._id}>
                    <button onClick={this._selectIdea.bind(this, idea)}>
                        <span className="search-result-name">{idea.name}</span>
                        <span className="search-result-info">{idea.summary}</span>
                        <span className="search-result-info">Score: {util.round(idea.score, 1)}</span>
                    </button>
                </li>
            );
        });

        let personSearchResults = this.state.personSearchResults.map(person => {
            return (
                <li key={person._id}>
                    <button onClick={this._selectPerson.bind(this, person)}>
                        <span className="search-result-name">{person.firstName} {person.lastName}</span>
                        <span className="search-result-info">{person.username}</span>
                        <span className="search-result-info">Score: {util.round(person.score, 1)}</span>
                    </button>
                </li>
            );
        });

        return (
            <div className="site-search fade">
                <div className="site-search-container">
                    <button type="button" className="inline site-search-close" onClick={this.props.onClose}>(close)</button>

                    <form onSubmit={this._executeSearch}>
                        <input className="form-element small" type="text" value={this.state.searchStr} onChange={this._onChange} autoFocus={true} />
                        <button type="submit" className="hidden"></button>
                    </form>

                    <div className="site-search-results">
                        <div>
                            <h2>Ideas</h2>
                            {(() => {
                                if (this.state.ideaSearchResults.length > 0) {
                                    return <ul>{ideaSearchResults}</ul>;
                                } else {
                                    return <span>No results found</span>
                                }
                            })()}
                        </div>
                        <div>
                            <h2>People</h2>
                            {(() => {
                                if (this.state.personSearchResults.length > 0) {
                                    return <ul>{personSearchResults}</ul>;
                                } else {
                                    return <span>No results found</span>
                                }
                            })()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _selectIdea = (idea, e) => {
        e.preventDefault();
        this.context.router.push('/ideas/' + idea._id);
        this.props.onClose(e);
    }

    _selectPerson = (person, e) => {
        e.preventDefault();
        this.context.router.push('/people/' + person._id);
        this.props.onClose(e);
    }

    _executeSearch = (e) => {
        if (e) { e.preventDefault(); }

        let searchStr = this.state.searchStr;
        if (util.isEmpty(searchStr)) {
            return this.setState({ideaSearchResults: [], personSearchResults: []});
        }

        IdeaStore.search(searchStr)
            .done(results => {
                this.setState({ideaSearchResults: results});
            });
        UserStore.search(searchStr)
            .done(results => {
                this.setState({personSearchResults: results});
            });
    }

    _onChange = (e) => {
        e.preventDefault();
        this.setState({searchStr: e.target.value});
    }
}

export default PersonSearch;
