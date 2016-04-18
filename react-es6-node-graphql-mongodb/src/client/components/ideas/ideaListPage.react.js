import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import util from '../../utilities/util';
import {IdeaStore} from '../../stores/ideaStore';
import ListFilter from '../common/listFilter.react';

class filteredIdeasPage extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor() {
        super();
        this._sortDesc = false;
        this.state = {
            ideas: [],
            filteredIdeas: [],
            filterStr: '',
            showFilter: false
        };
    }

    componentDidMount() {
        IdeaStore.getIdeaList()
            .done(ideas => {
                this._sortIdeas(ideas);
                this.setState({ ideas: ideas, filteredIdeas: ideas.slice() });
            });
    }

    render() {
        let content = this.state.filteredIdeas.map(idea => {
            return (
                <li key={idea._id}>
                    <button onClick={this._viewIdea.bind(this, idea._id)}>
                        <span className="idea-list-name">{idea.name}</span>
                        <span className="idea-list-summary">{idea.summary}</span>
                        <span className="idea-list-info idea-list-info-first">votes: {idea.votes.length}</span>
                        <span className="idea-list-info">tags: {this._toList(idea.tags)}</span>
                        <span className="idea-list-info">skills: {this._toList(idea.skills)}</span>
                        <span className="idea-list-info">techs: {this._toList(idea.technologies)}</span>
                    </button>
                </li>
            );
        });

        return (
            <section>
                <h1 className="title">Ideas</h1>

                <ul className="actions">
                    <li><Link to="/ideas/new">new</Link></li>
                    <li><a href="" onClick={this._reverseSortOrder}>sort</a></li>
                    <li><a href="" onClick={this._toggleFilter}>filter</a></li>
                </ul>

                {(() => {
                    if (this.state.showFilter) {
                        return (<ListFilter filterStr={this.state.filterStr} onChange={this._onFilterChange} />);
                    }
                })()}

                <ul className="idea-list">
                    {content}
                </ul>
            </section>
        );
    }

    _viewIdea = (id, e) => {
        e.preventDefault();
        this.context.router.push('/ideas/' + id);
    }

    _reverseSortOrder = (e) => {
        e.preventDefault();
        this._sortDesc = !this._sortDesc;
        this._sortIdeas(this.state.ideas);
        this.setState({ ideas: this.state.ideas });
    }

    _sortIdeas = (ideas) => {
        ideas.sort(
            util.sortCompareFunc('name', this._sortDesc, i => i.toUpperCase()));
    }

    _toggleFilter = (e) => {
        e.preventDefault();
        this.setState({ showFilter: !this.state.showFilter });
        if (this.state.showFilter) {
            this.setState({ filterStr: '', filteredIdeas: this.state.ideas.slice() });
        }
    }

    _onFilterChange = (e) => {
        let str = e.target.value.toLowerCase();
        this.state.filteredIdeas = this.state.ideas.filter(idea => {
            return idea.name.toLowerCase().indexOf(str) >= 0 ||
                idea.summary.toLowerCase().indexOf(str) >= 0;
        });
        this.setState({ filterStr: str, filteredIdeas: this.state.filteredIdeas });
    }

    _toList = (arr, prop) => {
        return util.arrayToString(arr, prop);
    }
}

export default filteredIdeasPage;
