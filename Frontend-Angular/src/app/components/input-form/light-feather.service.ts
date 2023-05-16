import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LightFeatherServiceService {

  constructor(private http: HttpClient) { }

  fetchManagers(): Observable<any[]> {
    return this.http.get<any[]>('https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers')
  }

  submitForm(formData: any) {
    return this.http.post('https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/submit', formData)
  }
}
