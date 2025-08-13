import { CommentOutput } from './../../shared/models/comment-output.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Comment } from '../../shared/models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly apiUrl = "http://localhost:3030/data/comments";

  public comments = signal<CommentOutput[]>([]);

  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    const accessToken = localStorage.getItem('token') || '';
    return {
      'X-Authorization': `${accessToken}`
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
    const accessToken = localStorage.getItem('token');
    return this.http.post<CommentOutput>(`${this.apiUrl}`, commentData, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: (newComment) => {
        this.comments.update(prev => [...prev, newComment])
      },
      error: (err) => console.log('Error adding comment', err)
    })
  }

  deleteComment(commentId: string) {
    const accessToken = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/${commentId}`, { headers: this.getAuthHeaders() }).subscribe({
      next: () => {
        this.comments.update(prev => prev.filter(comment => comment._id !== commentId))
      },
      error: (err) => console.log('error deleting comment', err)
    })
  }

  editComment(commentId: string, updatedData: { rating: number, comment: string }) {
    return this.http.put<CommentOutput>(`${this.apiUrl}/${commentId}`, updatedData, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: (updatedComment) => {
        this.comments.update((prev) =>
          prev.map(c => c._id === updatedComment._id ? updatedComment : c)
        );
      }
    })
  }
}
