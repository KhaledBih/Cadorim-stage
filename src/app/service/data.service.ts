import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api/users';
  private authToken: string | null = null;

  constructor(private httpclient: HttpClient) {
    this.authToken = localStorage.getItem('authToken');
  }

  setAuthToken(token: string) {
    this.authToken = token;
    localStorage.setItem('authToken', token);
  }

  clearAuthToken() {
    this.authToken = null;
    localStorage.removeItem('authToken');
  }

  private getRequestHeaders() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (this.authToken) {
      headers = headers.append('Authorization', `Bearer ${this.authToken}`);
    }

    return { headers: headers };
  }

  register(credentials: any): Observable<any> {
    return this.httpclient.post(`${this.apiUrl}/register`, credentials);
  }

  login(credentials: any): Observable<any> {
    return this.httpclient.post(`${this.apiUrl}/login`, credentials);
  }

  getData(): Observable<any> {
    return this.httpclient.get(this.apiUrl, this.getRequestHeaders());
  }

  insertData(data: any): Observable<any> {
    return this.httpclient.post(this.apiUrl, data, this.getRequestHeaders());
  }

  deleteData(id: any): Observable<any> {
    return this.httpclient.delete(
      `${this.apiUrl}/${id}`,
      this.getRequestHeaders()
    );
  }

  getEmployeeByID(id: any): Observable<any> {
    return this.httpclient.get(
      `${this.apiUrl}/${id}`,
      this.getRequestHeaders()
    );
  }

  updateData(id: any, data: any): Observable<any> {
    return this.httpclient.put(
      `${this.apiUrl}/${id}`,
      data,
      this.getRequestHeaders()
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
