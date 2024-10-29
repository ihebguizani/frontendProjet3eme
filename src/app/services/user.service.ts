import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`http://localhost:8004/api/user/getAllUsers`);
  }
  getUserByUserName(username:string):Observable<User>{
    return this.http.get<User>('http://localhost:8004/api/user/getByUsername/'+username);
  }
}
