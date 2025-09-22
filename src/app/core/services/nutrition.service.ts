import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GenerateRequest, GenerateResponse, NutritionResponse } from '../../models/food.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<NutritionResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<NutritionResponse>(`${environment.baseUrl}/UploadFile`, formData);
  }

  generateResponse(request: GenerateRequest): Observable<GenerateResponse> {
    return this.http.post<GenerateResponse>(`${environment.baseUrl}/GenerateResponse`, request);
  }
}