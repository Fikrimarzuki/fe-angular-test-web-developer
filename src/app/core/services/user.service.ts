import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models";
import { Observable, catchError, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserService {
  private baseUrl:string = "http://localhost:3000/users";

  constructor(private http:HttpClient) {}

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError<User[]>("getUsers", []))
      )
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {      
      return of(result as T);
    }
  }
}