import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { environment } from '../../../environments/enviroment';
import { UserRole } from '../../models/user-role.model';
import { UserService } from './user.service';
import { endpoints } from '../../../environments/endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}`;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  deleteAllCookies(): void {
    document.cookie.split(';').forEach((cookie) => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
    localStorage.removeItem('userToken');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  signIn(credentials: { email: string; password: string }) {
    this.deleteAllCookies();
    return this.http.post(this.apiUrl + endpoints.GET_TOKEN, credentials).pipe(
      catchError((error) => {
        console.error('Sign in failed', error);
        return of({});
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  signUp(userInfo) {
    this.deleteAllCookies();
    return this.http.post(this.apiUrl + endpoints.SIGN_UP, userInfo).pipe(
      catchError((error) => {
        console.error('Sign up failed', error);
        return of({});
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.http
      .post<{ valid: boolean; role: UserRole }>(this.apiUrl + '/validate/', {
        access: localStorage.getItem('userToken'),
        refresh: localStorage.getItem('refresh'),
      })
      .pipe(
        tap((response: any) => {
          if (response.access) {
            localStorage.setItem('userToken', response.access);
          }
          this.userService.updateUserRole(UserRole.Mega);
        }),
        map((response) => {
          return true;
        }),
        catchError((error) => {
          console.error('Validation failed', error.detail);
          return of(false);
        })
      );
  }

  signOut() {
    localStorage.removeItem('userToken');
    location.reload();
    this.userService.updateUserRole(UserRole.Guest);
  }
}
