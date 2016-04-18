import React, {Component, PropTypes} from 'react';
import domUtil from '../../../utilities/domUtil';
import TextInput from '../../common/textInput.react';
import TextArea from '../../common/textArea.react';
import ProposersSection from './proposersSection.react';
import SkillsSection from './skillsSection.react';
import TechnologiesSection from './technologiesSection.react';
import TagsSection from './tagsSection.react';

class IdeaForm extends Component {
    static propTypes = {
        idea: PropTypes.object.isRequired,
        skills: PropTypes.arrayOf(PropTypes.string).isRequired,
        technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        errors: PropTypes.object,
        onChange: PropTypes.func.isRequired,
        onSave: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        showProposers: PropTypes.bool,
        onAddProposer: PropTypes.func
    }

    // componentDidMount(prevProps, prevState) {
    //     domUtil.autoSize('.auto-size');
    // }

    render() {
        return (
            <form name="editIdeaForm" onSubmit={e => e.preventDefault()}>
                <TextInput name="name" label="Name" className="name"
                    value={this.props.idea.name}
                    onChange={this._onChange}
                    error={this.props.errors.name}
                    autoFocus={true} />

                <TextArea name="summary" label="Summary" className="desc"
                    value={this.props.idea.summary}
                    onChange={this._onChange}
                    error={this.props.errors.summary}
                    autoSize={true} />

                <TextArea name="benefits" label="Benefits" className="desc"
                    value={this.props.idea.benefits}
                    onChange={this._onChange}
                    error={this.props.errors.benefits}
                    autoSize={true} />

                <TextArea name="details" label="Details" className="desc"
                    value={this.props.idea.details}
                    onChange={this._onChange}
                    error={this.props.errors.details}
                    autoSize={true} />

                {(() => {
                    if (this.props.showProposers) {
                        return (
                            <ProposersSection proposers={this.props.idea.proposers}
                                onRemove={this._onRemove}
                                onAdd={this.props.onAddProposer} />
                        );
                    }
                })()}

                <SkillsSection skills={this.props.idea.skills}
                    allSkills={this.props.skills}
                    onChange={this.props.onChange} />

                <TechnologiesSection technologies={this.props.idea.technologies}
                    allTechnologies={this.props.technologies}
                    onChange={this.props.onChange} />

                <TagsSection tags={this.props.idea.tags}
                    allTags={this.props.tags}
                    onChange={this.props.onChange} />

                <fieldset className="form-button-group">
                    <button type="button" className="form-button button-default" onClick={this.props.onSave}>save</button>
                    <button type="button" className="form-button" onClick={this.props.onCancel}>cancel</button>
                </fieldset>
            </form>
        );
    }

    _onChange = (e) => {
        var field = e.target.name;
        var value = e.target.value;
        this.props.onChange(field, value);
    }

    _onRemove = (proposer, e) => {
        e.preventDefault();
        var index = this.props.idea.proposers.indexOf(proposer);
        this.props.idea.proposers.splice(index, 1);
        this.props.onChange('proposers', this.props.idea.proposers);
    }
}

export default IdeaForm;
