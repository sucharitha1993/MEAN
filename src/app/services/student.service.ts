import { IStudent } from './../../interfaces/istudent';
import { students } from './../../mock-data/students-mock-data';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class StudentService {

  public url: any = 'http://localhost:9000/';

  constructor(private http: HttpClient) { }


  getStudents(): Observable<IStudent[]> {
    return of(students);
  }

  // to load all the Students from DB
  loadStudents() {
    return this.http.get<IStudent[]>(`${this.url}loadStudents`)
      .pipe();
  }

  //to fetch particular student record
  getStudentById(id: number): Observable<any> {
    return this.http.get(`${this.url}getStudentDetails/${id}`)
      .pipe();
  }

  /** DELETE: delete the Student from the server */
  deleteStudentById(id: number): Observable<IStudent> {
    return this.http.delete<IStudent>(`${this.url}deleteStudent/${id}`)
      .pipe();
  }

  //to add a new Student to DB 
  addStudent(params) {
    return this.http.post(`${this.url}addStudent`, params.request)
      .pipe();
  }


  /** PUT: update the hero on the server */
  updateStudent(params) {
    return this.http.put(`${this.url}updateStudent`, params.request)
    .pipe();
  }

  //to make Request with action and params
  makeRequestWithActionNParams(id: number, action): Observable<IStudent> {
    return this.http.get<IStudent>(`${this.url}${action}${id}`, httpOptions)
      .pipe();
  }

  //to make requests having action and request payload
  makeRequestWithActionNPayload(params, action) {
    return this.http.post(`${this.url}${action}`, params.request, httpOptions)
      .subscribe(res => console.log('res' + res));
  }

}
