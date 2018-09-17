import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { BaseApi } from '../core/base-api';
import {map} from 'rxjs/operators';

@Injectable()
export class UsersService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.get(`users?email=${email}`).pipe(
      map((users: User[]) => users[0] ? users[0] : undefined)
    );
  }

  checkUserEmail(email: string): Observable<User> {
    return this.post('api/valid', { email }).pipe(
      map((user: User) => user ? user : undefined)
    );
  }

  createNewUser(user: User): Observable<User> {
    return this.post('api/signup', user);
  }
}
