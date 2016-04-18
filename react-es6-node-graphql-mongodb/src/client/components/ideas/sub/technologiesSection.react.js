import React, {Component, PropTypes} from 'react';
import util from '../../../utilities/util';
import ideaActions from '../../../actions/ideaActions';

class TechnologiesSection extends Component {
    static propTypes = {
        technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
        allTechnologies: PropTypes.arrayOf(PropTypes.string).isRequired,
        onChange: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            newTech: '',
            showNewTech: false
        };
    }

    render() {
        let keyCounter = 1;

        let index = 0;
        let ideaTechs = this.props.technologies.map(tech => {
            return (
                <li key={keyCounter++}>
                    {tech} <button type="button" onClick={this._removeTech.bind(this, index++)}>x</button>
                </li>
            );
        });

        let allTechs = this.props.allTechnologies.map(tech => {
            return <option key={keyCounter++} value={tech} />;
        });

        let newTech = (
            <li className="tech-new">
                <input id="newTech" list="newTechData" value={this.state.newTech} onChange={this._newTechChanged}
                    onKeyUp={this._newTechKeyUp} className="form-element" type="text" autoFocus={true} />
                <datalist id="newTechData">{allTechs}</datalist>
                <button type="button" className="inline-symbol" onClick={this._saveTech}>(+)</button>
                <button type="button" className="inline-symbol" onClick={this._cancelTech}>(x)</button>
            </li>
        )

        return (
            <fieldset className="form-group">
                <label className="form-label" for="ideaTechnologies">Technologies</label>
                <ul className="inline-form-list">
                    {ideaTechs}
                    {(() => {
                        if (this.state.showNewTech) { return newTech; }
                    })()}
                </ul>
                {(() => {
                    if (!this.state.showNewTech) {
                        return (<button type="button" className="inline-symbol" onClick={this._addTech}>(+)</button>);
                    }
                })()}
            </fieldset>
        );
    }

    _newTechKeyUp = (e) => {
        if (e.keyCode === 13) {
            this._saveTech(e);
        } else if (e.keyCode === 27) {
            this._cancelTech(e);
        }
    }

    _newTechChanged = (e) => {
        this.setState({newTech: e.target.value});
    }

    _removeTech = (index, e) => {
        e.preventDefault();
        this.props.technologies.splice(index, 1);
        this.props.onChange('technologies', this.props.technologies);
    }

    _addTech = (e) => {
        e.preventDefault();
        this.setState({showNewTech: true});
    }

    _saveTech = (e) => {
        e.preventDefault();
        if (util.isEmpty(this.state.newTech)) {
            return;
        }

        let index = this.props.technologies.indexOf(this.state.newTech);
        if (index === -1) {
            this.props.technologies.push(this.state.newTech);
            this.props.onChange('technologies', this.props.technologies);
        }
        this.setState({newTech: '', showNewTech: false});
    }

    _cancelTech = (e) => {
        e.preventDefault();
        this.setState({newTech: '', showNewTech: false});
    }
}

export default TechnologiesSection;
