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
    return this.http.get<CommentOutput[]>(`${this.apiUrl}?where=${query}`)
  }

  addComment(commentData: Comment) {
    const accessToken = localStorage.getItem('token');
    return this.http.post<CommentOutput>(`${this.apiUrl}`, commentData, {
      headers: this.getAuthHeaders()
    })
  }

  deleteComment(commentId: string) {
    const accessToken = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/${commentId}`, { headers: this.getAuthHeaders() })
  }

  editComment(commentId: string, updatedData: {rating: number, comment:string}){
    return this.http.put<CommentOutput>(`${this.apiUrl}/${commentId}`, updatedData, {
      headers: this.getAuthHeaders()
    })
  }
}
