import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3030/users'

  private _isLoggedIn = signal(!!localStorage.getItem('token'));
  public isLoggedIn = this._isLoggedIn;

  constructor(private http: HttpClient) { }

  register(userData: { username: string, email: string, password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, userData).pipe(
      tap(user => {
        if (user.accessToken) {
          localStorage.setItem('token', user.accessToken);
          localStorage.setItem('user', JSON.stringify(user))
          this._isLoggedIn.set(true);
        }
      })
    )
  }

  login(userData: { email: string, password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, userData).pipe(
      tap(user => {
        if (user.accessToken) {
          localStorage.setItem('token', user.accessToken);
          localStorage.setItem('user', JSON.stringify(user));
          this._isLoggedIn.set(true);
        }
      })
    )
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    this._isLoggedIn.set(false);
  }
}
