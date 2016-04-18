import React, {Component, PropTypes} from 'react';
import ideaActions from '../../../actions/ideaActions';

class ProposersSection extends Component {
    static propTypes = {
        proposers: PropTypes.array.isRequired,
        onRemove: PropTypes.func.isRequired,
        onAdd: PropTypes.func.isRequired
    }

    render() {
        let proposers = this.props.proposers.map(proposer => {
            return (
                <li key={proposer._id}>
                    {proposer.firstName} {proposer.lastName}
                    <button type="button" onClick={this.props.onRemove.bind(this, proposer)}>x</button>
                </li>
            );
        });

        return (
            <fieldset className="form-group">
                <label className="form-label" for="ideaProposers">Proposers</label>
                <ul className="inline-form-list">
                    {proposers}
                </ul>
                <button type="button" className="inline-symbol" onClick={this.props.onAdd}>(+)</button>
            </fieldset>
        );
    }
}

export default ProposersSection;
