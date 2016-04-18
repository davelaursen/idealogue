import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import util from '../../utilities/util';
import {IdeaStore, IdeaEvents} from '../../stores/ideaStore';
import ideaActions from '../../actions/ideaActions';
import {AuthStore} from '../../stores/authStore';
import IdeaDetails from './sub/ideaDetails.react';

class IdeaViewPage extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            idea: {
                votes: [],
                comments: []
            }
        };
    }

    componentDidMount() {
        let ideaId = this.props.params.ideaId;
        IdeaStore.getIdeaById(ideaId)
            .done(idea => {
                this.setState({ idea: idea });
            });
    }

    componentWillMount() {
        IdeaStore.on(IdeaEvents.Update, this._onUpdated);
        IdeaStore.on(IdeaEvents.Delete, this._onDeleted);
    }

    componentWillUnmount() {
        IdeaStore.removeListener(IdeaEvents.Update, this._onUpdated);
        IdeaStore.removeListener(IdeaEvents.Delete, this._onDeleted);
    }

    render() {
        return (
            <section>
                <h1 className="title">Idea Details</h1>

                <ul className="actions">
                    <li><Link to="/ideas">back</Link></li>
                    <li><a href="" onClick={this._vote}>vote</a></li>
                    <li><Link to={'/ideas/' + this.props.params.ideaId + '/edit'}>edit</Link></li>
                    <li><a href="" onClick={this._remove}>delete</a></li>
                </ul>

                <IdeaDetails idea={this.state.idea} onChange={this._onChange} />
            </section>
        );
    }

    _onUpdated = (idea) => {
        if (this.state.idea._id === idea._id) {
            this.state.idea = idea;
            this.setState({ idea: idea });
        }
    }

    _onDeleted = (id) => {
        if (id === this.state.idea._id) {
            this.context.router.push('/ideas');
        }
    }

    _onChange = (field, value) => {
        this.state.idea[field] = value;
        ideaActions.updateIdea(this.state.idea);
    }

    _remove = (e) => {
        e.preventDefault();
        ideaActions.deleteIdea(this.state.idea._id);
    }

    _vote = (e) => {
        e.preventDefault();

        let id = AuthStore.getCurrentUser()._id;
        let found = this.state.idea.votes.find(v => v === id);
        if (!found) {
            this.state.idea.votes.push(id);
            ideaActions.updateIdea(this.state.idea);
        }
    }
}

export default IdeaViewPage;
