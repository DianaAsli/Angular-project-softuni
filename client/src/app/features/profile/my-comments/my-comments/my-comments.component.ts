import { Component, inject, OnInit } from '@angular/core';
import { CommentService } from '../../../../core/services/comment.service';
import { ProductService } from '../../../../core/services/product.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-my-comments',
  standalone: true,
  imports: [],
  templateUrl: './my-comments.component.html',
  styleUrl: './my-comments.component.css'
})
export class MyCommentsComponent implements OnInit {
  private commentService = inject(CommentService);
  productService = inject(ProductService);

  comments = this.commentService.userComments;

  ngOnInit(): void {
    this.commentService.getUserComments();
  }
}
