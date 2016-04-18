import React, {Component, PropTypes} from 'react';
import $ from 'jquery';
import domUtil from '../../utilities/domUtil';

class TextArea extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        className: PropTypes.string,
        autoSize: PropTypes.bool,
        placeholder: PropTypes.string,
        value: PropTypes.string,
        error: PropTypes.string
    }

    componentDidUpdate() {
        if (this.props.autoSize) {
            let element = $('#' + this.props.name + '.auto-size');
            if (element) {
                domUtil.resizeTextbox(element[0]);
            }
        }
    }

    render() {
        let classes = 'form-element' + (this.props.error && this.props.error.length > 0 ? ' has-error' : '');
        if (this.props.className) {
            classes += ' ' + this.props.className;
        }
        if (this.props.autoSize) {
            classes += ' auto-size';
        }

        return (
            <fieldset className="form-group">
                <label className="form-label" for={this.props.name}>{this.props.label}</label>
                <textarea
                    id={this.props.name}
                    name={this.props.name}
                    className={classes}
                    placeholder={this.props.placeholder}
                    ref={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onChange}>
                </textarea>
            </fieldset>
        );
    }
}

export default TextArea;
