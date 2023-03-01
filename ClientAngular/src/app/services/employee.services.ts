import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { Employee } from "../models/employee";

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    apiURL = `${environment.apiUrl}/employee/info`;

    constructor(private http: HttpClient) { }

    public getEmployee(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.apiURL)
    }

    public deleteEmployee(employee: Employee): Observable<Employee[]> {
        return this.http.delete<Employee[]>(`${this.apiURL}/${employee.idemployee}`)
    }

    public addEmployee(employee: Employee): Observable<Employee[]> {
        return this.http.post<Employee[]>(this.apiURL, employee)
    }

    public editEmployee(employee: Employee): Observable<Employee[]> {
        return this.http.patch<Employee[]>(`${this.apiURL}/${employee.idemployee}`, employee)
    }
}