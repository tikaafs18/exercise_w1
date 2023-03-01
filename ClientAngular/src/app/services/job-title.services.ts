import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { JobTitle } from '../models/job-title';

@Injectable({
    providedIn: 'root'
})

export class JobTitleService {
    private routeURL = 'job/title';
    private apiURL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    public getTitle(): Observable<JobTitle[]> {
        return this.http.get<JobTitle[]>(`${this.apiURL}/${this.routeURL}`);
    }

    public editTitle(title: JobTitle): Observable<JobTitle[]> {
        return this.http.patch<JobTitle[]>(`${this.apiURL}/${this.routeURL}/${title.idtitle}`, title);
    }

    public createTitle(title: JobTitle): Observable<JobTitle[]> {
        return this.http.post<JobTitle[]>(`${this.apiURL}/${this.routeURL}`, title);
    }

    public deleteTitle(title: JobTitle): Observable<JobTitle[]> {
        return this.http.delete<JobTitle[]>(`${this.apiURL}/${this.routeURL}/${title.idtitle}`);
    }
}