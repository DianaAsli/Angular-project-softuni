import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from './../../../core/services/auth.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ratingValidator } from '../../../shared/validators/rating.validator';
import { CommentService } from '../../../core/services/comment.service';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent {
  private authService = inject(AuthService);
  private commentService = inject(CommentService)
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  isFormVisible: boolean = false;
  rating = 0;
  form: FormGroup = this.fb.group({
    rating: [0, ratingValidator],
    comment: ['', [Validators.required]]
  })

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
    console.log(this.rating);
    this.form.patchValue({ rating: star })
  }
  submitComment() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return;
    }
    // console.log('comment data', this.form.value);

    const commentData = {
      productId: this.route.snapshot.paramMap.get('id')!,
      rating: this.rating,
      comment: this.form.value.comment,
      username: this.authService.getUser()?.username!
    }

    this.commentService.addComment(commentData).subscribe({
      next: () => {
        console.log('successfully added');
        //TODO refresh comments list
      },
      error: (err) => {
        console.log('error', err);

      }
    })

    // Reset form
    this.form.reset({ rating: 0, comment: '' });
    this.rating = 0;
    this.isFormVisible = false;
  }


}
