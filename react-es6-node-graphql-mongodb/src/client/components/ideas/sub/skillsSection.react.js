import React, {Component, PropTypes} from 'react';
import util from '../../../utilities/util';
import ideaActions from '../../../actions/ideaActions';

class SkillsSection extends Component {
    static propTypes = {
        skills: PropTypes.arrayOf(PropTypes.string).isRequired,
        allSkills: PropTypes.arrayOf(PropTypes.string).isRequired,
        onChange: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            newSkill: '',
            showNewSkill: false
        };
    }

    render() {
        let keyCounter = 1;

        let index = 0;
        let ideaSkills = this.props.skills.map(skill => {
            return (
                <li key={keyCounter++}>
                    {skill} <button type="button" onClick={this._removeSkill.bind(this, index++)}>x</button>
                </li>
            );
        });

        let allSkills = this.props.allSkills.map(skill => {
            return <option key={keyCounter++} value={skill} />;
        });

        let newSkill = (
            <li className="skill-new">
                <input id="newSkill" list="newSkillData" value={this.state.newSkill} onChange={this._newSkillChanged}
                    onKeyUp={this._newSkillKeyUp} className="form-element" type="text" autoFocus={true} />
                <datalist id="newSkillData">{allSkills}</datalist>
                <button type="button" className="inline-symbol" onClick={this._saveSkill}>(+)</button>
                <button type="button" className="inline-symbol" onClick={this._cancelSkill}>(x)</button>
            </li>
        )

        return (
            <fieldset className="form-group">
                <label className="form-label" for="ideaSkills">Skills</label>
                <ul className="inline-form-list">
                    {ideaSkills}
                    {(() => {
                        if (this.state.showNewSkill) { return newSkill; }
                    })()}
                </ul>
                {(() => {
                    if (!this.state.showNewSkill) {
                        return (<button type="button" className="inline-symbol" onClick={this._addSkill}>(+)</button>);
                    }
                })()}
            </fieldset>
        );
    }

    _newSkillKeyUp = (e) => {
        if (e.keyCode === 13) {
            this._saveSkill(e);
        } else if (e.keyCode === 27) {
            this._cancelSkill(e);
        }
    }

    _newSkillChanged = (e) => {
        this.setState({newSkill: e.target.value});
    }

    _removeSkill = (index, e) => {
        e.preventDefault();
        this.props.skills.splice(index, 1);
        this.props.onChange('skills', this.props.skills);
    }

    _addSkill = (e) => {
        e.preventDefault();
        this.setState({showNewSkill: true});
    }

    _saveSkill = (e) => {
        e.preventDefault();
        if (util.isEmpty(this.state.newSkill)) {
            return;
        }

        let index = this.props.skills.indexOf(this.state.newSkill);
        if (index === -1) {
            this.props.skills.push(this.state.newSkill);
            this.props.onChange('skills', this.props.skills);
        }
        this.setState({newSkill: '', showNewSkill: false});
    }

    _cancelSkill = (e) => {
        e.preventDefault();
        this.setState({newSkill: '', showNewSkill: false});
    }
}

export default SkillsSection;
