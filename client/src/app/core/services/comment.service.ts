import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../../shared/models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly apiUrl = "http://localhost:3030/data/comments";

  constructor(private http: HttpClient) { }

  addComment(commentData: Comment) {
    const accessToken = localStorage.getItem('token')
    return this.http.post(`${this.apiUrl}`, commentData, {
      headers: { 'X-Authorization': `${accessToken}` }
    })
  }
}
