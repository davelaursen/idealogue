import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import util from '../../utilities/util';
import {IdeaStore, IdeaEvents} from '../../stores/ideaStore';
import ideaActions from '../../actions/ideaActions';
import IdeaForm from './sub/ideaForm.react';

class IdeaCreationPage extends Component {
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
                proposers: [{_id: "5b1177c0-f6f5-11e5-8404-9be64f50204b"}],
                skills: [],
                technologies: [],
                tags: [],
                votes: [],
                comments: []
            },
            skills: ['test'],
            technologies: ['test2'],
            tags: ['test3'],
            errors: {}
        };
    }

    componentWillMount() {
        IdeaStore.on(IdeaEvents.Create, this._onCreated);
    }

    componentWillUnmount() {
        IdeaStore.removeListener(IdeaEvents.Create, this._onCreated);
    }

    render() {
        return (
            <section>
                <h1 className="title">New Idea</h1>

                <ul className="actions">
                    <li><Link to="/ideas">back</Link></li>
                </ul>

                <IdeaForm idea={this.state.idea}
                    skills={this.state.skills}
                    technologies={this.state.technologies}
                    tags={this.state.tags}
                    onChange={this._onChange}
                    onSave={this._saveIdea}
                    onCancel={this._cancelAdd}
                    errors={this.state.errors} />
            </section>
        );
    }

    _onCreated = (idea) => {
        this.context.router.push('/ideas/' + idea._id);
    }

    _onChange = (field, value) => {
        console.log(field,'=', value)
        this.state.idea[field] = value;
        return this.setState({idea: this.state.idea});
    }

    _saveIdea = (e) => {
        e.preventDefault();

        if (!this._ideaFormIsValid()) {
            return;
        }
        console.log(this.state.idea);
        ideaActions.createIdea(this.state.idea);
    }

    _cancelAdd = (e) => {
        e.preventDefault();
        this.context.router.push('/ideas');
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

export default IdeaCreationPage;
