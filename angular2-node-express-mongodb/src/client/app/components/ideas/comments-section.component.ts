import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Util } from '../../blocks/util/util.service';
import { AuthService } from '../../services/auth.service';
import { IComment } from '../../services/idea.service';

@Component({
    selector: 'id-comments-section',
    templateUrl: 'app/components/ideas/comments-section.component.html'
})
export class CommentsSectionComponent implements OnInit {
    @Input() comments: IComment[] = [];
    @Output() commentsChange = new EventEmitter<IComment[]>();

    newCommentText: string;
    showNewComment: boolean;

    constructor(
        private _util: Util,
        private _authService: AuthService
    ) { }

    ngOnInit() {
        this.newCommentText = '';
        this.showNewComment = false;
    }

    saveComment() {
        if (this._util.isEmpty(this.newCommentText)) {
            return;
        }

        let user = this._authService.getCurrentUser();

        let newComment = {
            userId: user._id,
            person: user,
            text: this.newCommentText,
            timestamp: this._util.getISO8601DateString()
        }

        this.comments.push(newComment);
        this.commentsChange.emit(this.comments);

        this.cancelComment();
    }

    cancelComment() {
        this.showNewComment = false;
        this.newCommentText = '';
    }

    addComment() {
        this.showNewComment = true;
    }
}
