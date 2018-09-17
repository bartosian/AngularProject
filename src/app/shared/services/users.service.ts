import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { FormData } from '../models/formData.model';
import { BaseApi } from '../core/base-api';
import {map} from 'rxjs/operators';

@Injectable()
export class UsersService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getUserByEmail(data: FormData): Observable<User> {
    return this.post('api/login', data);
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
