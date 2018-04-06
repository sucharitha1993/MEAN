import { IFaculty } from './../../interfaces/ifaculty';
import { AppConfigService } from './app-config.services';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FacultyService {

    public url: string;

    constructor(private http: HttpClient, public config: AppConfigService) {
        this.url = config.facultyReqUrl;
    }

    // to load all the Faculty from DB
    loadFaculty() {
        return this.http.get<IFaculty[]>(`${this.url}getFaculty`)
            .pipe();
    }

    /** DELETE: delete the Faculty from the server */
    deleteFacultyById(id: number): Observable<IFaculty> {
        return this.http.delete<IFaculty>(`${this.url}deleteFaculty/${id}`)
            .pipe();
    }

    //to add a new Faculty to DB 
    addFaculty(params) {
        return this.http.post(`${this.url}addFaculty`, params.request)
            .pipe();
    }

    /** PUT: update the Faculty on the server */
    updateFaculty(params) {
        return this.http.put(`${this.url}updateFaculty`, params.request)
            .pipe();
    }
}