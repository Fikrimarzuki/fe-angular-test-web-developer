import { Observable, catchError, map, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Employee } from "../models/employee";
import { Injectable } from "@angular/core";
//  import other service from "./other.service";

@Injectable({ providedIn: "root" })
export class EmployeeService {
  private baseUrl:string="http://localhost:3000/employees";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  }

  constructor(private http:HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError<Employee[]>("getEmployees", []))
      );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee, this.httpOptions)
      .pipe(
        catchError(this.handleError("addEmployee", employee))
      )
  }

  deleteEmployee(employeeId: string): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/${employeeId}`, this.httpOptions)
      .pipe(
        catchError(this.handleError("deleteEmployee"))
      )
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {      
      return of(result as T);
    }
  }
}
