import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import util from '../../utilities/util';
import {IdeaStore} from '../../stores/ideaStore';
import {UserStore} from '../../stores/userStore';
import ideaActions from '../../actions/ideaActions';
import IdeaForm from './sub/ideaForm.react';
import PersonSearch from '../common/personSearch.react';

class IdeaEditPage extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            idea: {
                name: '',
                summary: '',
                benefits: '',
                details: '',
                proposers: [],
                skills: [],
                technologies: [],
                tags: []
            },
            skills: ['test'],
            technologies: ['test2'],
            tags: ['test3'],
            users: [],
            showPersonSearch: false,
            errors: {}
        };
    }

    componentWillMount() {
        let ideaId = this.props.params.ideaId;
        IdeaStore.getIdeaById(ideaId)
            .done(idea => {
                this.setState({ idea: idea });
            });
        UserStore.getUserList()
            .done(users => {
                this.setState({ users: users });
            });
    }

    render() {
        return (
            <section>
                <h1 className="title">Edit Idea</h1>

                <ul className="actions">
                    <li><Link to={'/ideas/' + this.props.params.ideaId}>back</Link></li>
                </ul>

                <IdeaForm idea={this.state.idea}
                    skills={this.state.skills}
                    technologies={this.state.technologies}
                    tags={this.state.tags}
                    onChange={this._onChange}
                    onSave={this._saveIdea}
                    onCancel={this._cancelEdit}
                    errors={this.state.errors}
                    showProposers={true}
                    onAddProposer={this._openPersonSearch} />

                {(() => {
                    if (this.state.showPersonSearch) {
                        return (
                            <PersonSearch people={this.state.users}
                                onSelect={this._onSelectProposer}
                                onClose={this._onClosePersonSearch} />
                        );
                    }
                })()}
            </section>
        );
    }

    _onChange = (field, value) => {
        this.state.idea[field] = value;
        this.setState({idea: this.state.idea});
    }

    _onSelectProposer = (person) => {
        this.state.idea.proposers.push(person);
        this.setState({idea: this.state.idea, showPersonSearch: false});
    }

    _onClosePersonSearch = (e) => {
        e.preventDefault();
        this.setState({showPersonSearch: false});
    }

    _openPersonSearch = (e) => {
        e.preventDefault();
        this.setState({showPersonSearch: true});
    }

    _saveIdea = (e) => {
        e.preventDefault();

        if (!this._ideaFormIsValid()) {
            return;
        }

        ideaActions.updateIdea(this.state.idea);
        this.context.router.push('/ideas/' + this.props.params.ideaId);
    }

    _cancelEdit = (e) => {
        e.preventDefault();
        this.context.router.push('/ideas/' + this.props.params.ideaId);
    }

    _ideaFormIsValid = () => {
        let formIsValid = true;
        let requiredField = ['name', 'summary', 'benefits', 'details'];

        for (let f of requiredField) {
            if (this.state.idea[f].trim().length === 0) {
                this.state.errors[f] = 'required';
                formIsValid = false;
            }
        }

        this.setState({errors: this.state.errors});
        return formIsValid;
    }
}

export default IdeaEditPage;
