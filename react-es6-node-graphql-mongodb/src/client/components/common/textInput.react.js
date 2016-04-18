import React, {Component, PropTypes} from 'react';
import util from '../../utilities/util';

class TextInput extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        className: PropTypes.string,
        placeholder: PropTypes.string,
        value: PropTypes.string,
        error: PropTypes.string,
        disabled: PropTypes.bool,
        type: PropTypes.string,
        showErrorMessage: PropTypes.bool,
        autoFocus: PropTypes.bool
    }

    render() {
        return (
            <fieldset className="form-group">
                <label className="form-label" for={this.props.name}>{this.props.label}</label>
                <input type={this.props.type || 'text'}
                    name={this.props.name}
                    className={'form-element ' + (this.props.className || '') + (this.props.error && this.props.error.length > 0 ? ' has-error' : '')}
                    placeholder={this.props.placeholder}
                    ref={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    disabled={this.props.disabled}
                    autoFocus={this.props.autoFocus} />
                {(() => {
                    if (this.props.showErrorMessage && !util.isEmpty(this.props.error)) {
                        return (<span className="error-msg-inline">{this.props.error}</span>);
                    }
                })()}

            </fieldset>
        );
    }
}

export default TextInput;
