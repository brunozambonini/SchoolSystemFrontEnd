import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/Student';

@Injectable()
export class StudentService {
  studentApiUrl = 'http://localhost:4892/api/Alunos';
  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentApiUrl);
  }

  getStudentsFiltering(filter: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.studentApiUrl}/${filter}`);
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentApiUrl, student);
  }

  editStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(this.studentApiUrl, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.studentApiUrl}/${id}`);
  }

  resetDataBase(): Observable<any> {
    return this.http.delete<any>(`${this.studentApiUrl}/all`);
  }
}