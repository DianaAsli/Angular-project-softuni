import { CommentOutput } from './../../../shared/models/comment-output.model';
import { AuthService } from './../../../core/services/auth.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommentService } from '../../../core/services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { CommentFormComponent } from "../comment-form/comment-form.component";

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommentFormComponent],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent implements OnInit {
  private commentService = inject(CommentService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  isOwner: boolean = false;
  comments = this.commentService.comments;
  userId?: string;
  currentEditComment = signal<CommentOutput | null>(null);

  ngOnInit(): void {
    this.userId = this.authService.getUser()?._id;
    const productId = this.route.snapshot.paramMap.get('id')!
    this.commentService.getComments(productId).subscribe({
      next: (data) => this.comments.set(data),
      error: (err) => console.log('Error loading comments', err)
    });
  }

  editComment(commentId: string) {
    const editedComment = this.comments().find(comment => comment._id === commentId) || null;
    this.currentEditComment.set(editedComment);
  }

  deleteComment(commentId: string) {
    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments.update(prev => prev.filter(comment => comment._id !== commentId))
      },
      error: (err) => console.log('error deleting comment', err)
    })
  }
}
