import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { JobPosition } from "../models/job-position";

@Injectable({
    providedIn: 'root'
})

export class JobPositionServices {
    private apiURL = `${environment.apiUrl}/job/position`;

    constructor(private http: HttpClient) { }

    public getPosition(): Observable<JobPosition[]> {
        return this.http.get<JobPosition[]>(`${this.apiURL}`);
    }

    public deletePosition(position: JobPosition): Observable<JobPosition[]> {
        return this.http.delete<JobPosition[]>(`${this.apiURL}/${position.idposition}`)
    }

    public editPosition(position: JobPosition): Observable<JobPosition[]> {
        return this.http.patch<JobPosition[]>(`${this.apiURL}/${position.idposition}`, position)
    }

    public addPosition(position: JobPosition): Observable<JobPosition[]> {
        return this.http.post<JobPosition[]>(`${this.apiURL}`, position)
    }
}