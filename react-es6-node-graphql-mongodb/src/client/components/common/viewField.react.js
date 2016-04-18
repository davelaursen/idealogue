import React, {Component, PropTypes} from 'react';

class ViewField extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        className: PropTypes.string,
        value: PropTypes.string
    }

    render() {
        return (
            <div className='view-group'>
                <div className="view-label">{this.props.label}</div>
                <div className={'view-element ' + (this.props.className || '')}>{this.props.value}</div>
            </div>
        );
    }
}

export default ViewField;
