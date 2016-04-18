import React, {Component, PropTypes} from 'react';
import util from '../../../utilities/util';
import ideaActions from '../../../actions/ideaActions';

class TagsSection extends Component {
    static propTypes = {
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        allTags: PropTypes.arrayOf(PropTypes.string).isRequired,
        onChange: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            newTag: '',
            showNewTag: false
        };
    }

    render() {
        let keyCounter = 1;

        let index = 0;
        let ideaTags = this.props.tags.map(tag => {
            return (
                <li key={keyCounter++}>
                    {tag} <button type="button" onClick={this._removeTag.bind(this, index++)}>x</button>
                </li>
            );
        });

        let allTags = this.props.allTags.map(tag => {
            return <option key={keyCounter++} value={tag} />;
        });

        let newTag = (
            <li className="tag-new">
                <input id="newTag" list="newTagData" value={this.state.newTag} onChange={this._newTagChanged}
                    onKeyUp={this._newTagKeyUp} className="form-element" type="text" autoFocus={true} />
                <datalist id="newTagData">{allTags}</datalist>
                <button type="button" className="inline-symbol" onClick={this._saveTag}>(+)</button>
                <button type="button" className="inline-symbol" onClick={this._cancelTag}>(x)</button>
            </li>
        )

        return (
            <fieldset className="form-group">
                <label className="form-label" for="ideaTags">Tags</label>
                <ul className="inline-form-list">
                    {ideaTags}
                    {(() => {
                        if (this.state.showNewTag) { return newTag; }
                    })()}
                </ul>
                {(() => {
                    if (!this.state.showNewTag) {
                        return (<button type="button" className="inline-symbol" onClick={this._addTag}>(+)</button>);
                    }
                })()}
            </fieldset>
        );
    }

    _newTagKeyUp = (e) => {
        if (e.keyCode === 13) {
            this._saveTag(e);
        } else if (e.keyCode === 27) {
            this._cancelTag(e);
        }
    }

    _newTagChanged = (e) => {
        this.setState({newTag: e.target.value});
    }

    _removeTag = (index, e) => {
        e.preventDefault();
        this.props.tags.splice(index, 1);
        this.props.onChange('tags', this.props.tags);
    }

    _addTag = (e) => {
        e.preventDefault();
        this.setState({showNewTag: true});
    }

    _saveTag = (e) => {
        e.preventDefault();
        if (util.isEmpty(this.state.newTag)) {
            return;
        }

        let index = this.props.tags.indexOf(this.state.newTag);
        if (index === -1) {
            this.props.tags.push(this.state.newTag);
            this.props.onChange('tags', this.props.tags);
        }
        this.setState({newTag: '', showNewTag: false});
    }

    _cancelTag = (e) => {
        e.preventDefault();
        this.setState({newTag: '', showNewTag: false});
    }
}

export default TagsSection;
