import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3030/users'

  private _isLoggedIn = signal(!!localStorage.getItem('token'));
  public isLoggedIn = this._isLoggedIn;

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  constructor(private http: HttpClient) { }

  register(userData: { username: string, email: string, password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, userData).pipe(
      tap(user => {
        if (user.accessToken) {
          localStorage.setItem('token', user.accessToken);
          localStorage.setItem('user', JSON.stringify(user))
          this._isLoggedIn.set(true);
        }
      }),
      catchError(err => {
        return throwError(() => err?.error?.message || 'Registartion failed.')
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
      }),
      catchError(err => {
        return throwError(() => err?.error?.message || 'Login failed.')
      })
    )
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    this._isLoggedIn.set(false);
  }

  getUserDetails(): Observable<User> {
    const token = localStorage.getItem('token') || '';
    return this.http.get<User>(`${this.apiUrl}/me`, {
      headers: {
        'X-Authorization': token
      }
    })
  }
}
