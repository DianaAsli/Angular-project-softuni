import { CommentOutput } from './../../shared/models/comment-output.model';
import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Comment } from '../../shared/models/comment.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly apiUrl = "http://localhost:3030/data/comments";
  private authService = inject(AuthService);

  public comments = signal<CommentOutput[]>([]);
  public userComments = signal<CommentOutput[]>([]);

  constructor(private http: HttpClient) { }

  getUserComments() {
    const userId = this.authService.getUser()?._id;
    if (!userId) {
      return this.userComments.set([]);
    }
    if (userId) {
      const query = encodeURIComponent(`_ownerId="${userId}"`);
      return this.http.get<CommentOutput[]>(`${this.apiUrl}?where=${query}`).subscribe({
        next: (data) => this.userComments.set(data),
        error: (err) => console.log('Error loading comments', err)
      });
    }
  }

  getComments(productId: string) {
    const query = encodeURIComponent(`productId="${productId}"`);
    return this.http.get<CommentOutput[]>(`${this.apiUrl}?where=${query}`).subscribe({
      next: (data) => this.comments.set(data),
      error: (err) => console.log('Error loading comments', err)
    });
  }

  addComment(commentData: Comment) {
    return this.http.post<CommentOutput>(`${this.apiUrl}`, commentData).subscribe({
      next: (newComment) => {
        this.comments.update(prev => [...prev, newComment])
      },
      error: (err) => console.log('Error adding comment', err)
    })
  }

  deleteComment(commentId: string) {
    return this.http.delete(`${this.apiUrl}/${commentId}`).subscribe({
      next: () => {
        this.comments.update(prev => prev.filter(comment => comment._id !== commentId))
      },
      error: (err) => console.log('error deleting comment', err)
    })
  }

  editComment(commentId: string, updatedData: { rating: number, comment: string }) {
    return this.http.put<CommentOutput>(`${this.apiUrl}/${commentId}`, updatedData).subscribe({
      next: (updatedComment) => {
        this.comments.update((prev) =>
          prev.map(c => c._id === updatedComment._id ? updatedComment : c)
        );
      }
    })
  }

}