import React, {Component, PropTypes} from 'react';
import $ from 'jquery';
import moment from 'moment';
import util from '../../../utilities/util';
import domUtil from '../../../utilities/domUtil';
import {AuthStore} from '../../../stores/authStore';
import ideaActions from '../../../actions/ideaActions';

class CommentsSection extends Component {
    static propTypes = {
        comments: PropTypes.arrayOf(PropTypes.object).isRequired,
        onChange: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = this._getInitState();
    }

    componentDidUpdate() {
        if (this.state.showNewComment) {
            let element = $('#newCommentText');
            if (element) {
                domUtil.resizeTextbox(element[0]);
            }
        }
    }

    render() {
        let keyCounter = 1;

        let ideaComments = this.props.comments.map(comment => {
            return (
                <li key={keyCounter++}>
                    <span className="comment-header">{moment(comment.timestamp).format('M/DD/YYYY h:mm a')}, {comment.firstName} {comment.lastName}</span>
                    <span className="comment-text linebreaks">{comment.text}</span>
                </li>
            );
        });

        let newComment = (
            <li>
                <textarea id="newCommentText" value={this.state.newComment.text} onChange={this._newCommentChanged}
                    className="form-element comment-new-text auto-size" rows="1" autoFocus={true} id-auto-size></textarea>
                <button type="button" className="inline" onClick={this._saveComment}>save</button>
                <button type="button" className="inline" onClick={this._cancelComment}>cancel</button>
            </li>
        )

        return (
            <div className='view-group'>
                <div className="view-label">Comments</div>
                <div className="view-element">
                    <ul className="comment-list">
                        {ideaComments}
                        {(() => {
                            if (this.state.showNewComment) { return newComment; }
                        })()}
                    </ul>
                    {(() => {
                        if (!this.state.showNewComment) {
                            return (<button type="button" className="inline add-comment-button" onClick={this._addComment}>add comment</button>);
                        }
                    })()}
                </div>
            </div>
        );
    }

    _newCommentChanged = (e) => {
        this.state.newComment.text = e.target.value;
        this.setState({ newComment: this.state.newComment });
    }

    _addComment = (e) => {
        e.preventDefault();
        this.setState({showNewComment: true});
    }

    _saveComment = (e) => {
        e.preventDefault();

        let user = AuthStore.getCurrentUser();
        this.state.newComment.userId = user._id;
        this.state.newComment.firstName = user.firstName;
        this.state.newComment.lastName = user.lastName;
        this.state.newComment.timestamp = util.getISO8601DateString();

        this.props.comments.push(this.state.newComment);
        this.props.onChange('comments', this.props.comments);
        this.setState(this._getInitState());
    }

    _cancelComment = (e) => {
        e.preventDefault();
        this.setState(this._getInitState());
    }

    _getInitState() {
        return {
            newComment: {
                userId: '',
                firstName: '',
                lastName: '',
                text: '',
                timestamp: ''
            },
            showNewComment: false
        }
    }
}

export default CommentsSection;
