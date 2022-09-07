import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  baseURL: string = "http://127.0.0.1:5000";

  constructor(private http: HttpClient) { }

    post_data(input_data: Object[]): Observable<any> {
    return this.http.post(this.baseURL, {input_data})
  }

}
