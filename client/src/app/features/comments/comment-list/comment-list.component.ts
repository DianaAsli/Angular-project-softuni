import { AuthService } from './../../../core/services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommentService } from '../../../core/services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent implements OnInit {
  private commentService = inject(CommentService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  isOwner: boolean = false;
  comments = this.commentService.comments;
  userId? : string;
  
  ngOnInit(): void {
    this.userId = this.authService.getUser()?._id;
    const productId = this.route.snapshot.paramMap.get('id')!
    this.commentService.getComments(productId);
  }

  editComment() {
console.log('edit comment');

  }
  deleteComment() {
console.log('delete');

  }
}
