import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from './../../../core/services/auth.service';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ratingValidator } from '../../../shared/validators/rating.validator';
import { CommentService } from '../../../core/services/comment.service';
import { CommentOutput } from '../../../shared/models/comment-output.model';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent implements OnChanges {
  private authService = inject(AuthService);
  private commentService = inject(CommentService)
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  @Input() editComment?: CommentOutput | null;

  ngOnChanges(): void {
    if (this.editComment) {
      this.form.patchValue({
        rating: this.editComment.rating,
        comment: this.editComment.comment
      });

      this.rating = this.editComment.rating;
      this.isFormVisible = true;
    }
  }

  isFormVisible: boolean = false;
  rating = 0; //za vizualizirane na ratinga
  form: FormGroup = this.fb.group({
    rating: [0, ratingValidator],
    comment: ['', [Validators.required]]
  })

  //Getter functions
  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  get ratingInput() {
    return this.form.get('rating')
  }
  get comment() {
    return this.form.get('comment');
  }

  toggle() {
    this.isFormVisible = !this.isFormVisible;
  }
  setRating(star: number) {
    this.rating = star;
    // console.log(this.rating);
    this.form.patchValue({ rating: star })
  }

  // Edit & Submit functionality
  submitComment() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return;
    }

    // Edit
    if (this.editComment) {
      const updatedData = {
        rating: this.rating,
        comment: this.form.value.comment,
      }
      this.commentService.editComment(this.editComment._id, updatedData);
      this.editComment = null;
    } else {
      // Add 
      const commentData = {
        productId: this.route.snapshot.paramMap.get('id')!,
        rating: this.rating,
        comment: this.form.value.comment,
        username: this.authService.getUser()?.username!
      }

      this.commentService.addComment(commentData);
    }

    // Reset form
    this.form.reset({ rating: 0, comment: '' });
    this.rating = 0;
    this.isFormVisible = false;
  }
}
