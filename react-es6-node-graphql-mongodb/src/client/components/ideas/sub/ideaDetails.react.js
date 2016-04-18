import React, {Component, PropTypes} from 'react';
import util from '../../../utilities/util';
import ViewField from '../../common/viewField.react';
import CommentsSection from './commentsSection.react';

class IdeaDetails extends Component {
    static propTypes = {
        idea: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired
    }

    render() {
        return (
            <div>
                <ViewField label="" value={this.props.idea.name} className="bottom-border" />
                <ViewField label="Summary" value={this.props.idea.summary} className="bottom-border linebreaks" />
                <ViewField label="Benefits" value={this.props.idea.benefits} className="bottom-border linebreaks" />
                <ViewField label="Details" value={this.props.idea.details} className="bottom-border linebreaks" />
                <ViewField label="Proposers" value={this._toList(this.props.idea.proposers, p => p.firstName + ' ' + p.lastName)} />
                <ViewField label="Skills" value={this._toList(this.props.idea.skills)} />
                <ViewField label="Technologies" value={this._toList(this.props.idea.technologies)} />
                <ViewField label="Tags" value={this._toList(this.props.idea.tags)} />
                <ViewField label="Votes" value={'' + this.props.idea.votes.length} className="bottom-border-spaced" />

                <CommentsSection comments={this.props.idea.comments} onChange={this.props.onChange} />
            </div>
        );
    }

    _toList = (arr, predicate) => {
        return util.arrayToString(arr, null, predicate);
    }
}

export default IdeaDetails;
