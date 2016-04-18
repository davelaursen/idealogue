import React, {Component, PropTypes} from 'react';

class ListFilter extends Component {
    static propTypes = {
        filterStr: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="list-filter">
            	<input type="text" value={this.props.filterStr} onChange={this.props.onChange} autoFocus={true} />
            </div>

        );
    }
}

export default ListFilter;
