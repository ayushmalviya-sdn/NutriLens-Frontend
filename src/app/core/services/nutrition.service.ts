import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GenerateRequest, GenerateResponse, NutritionResponse } from '../../models/food.model';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {
  private baseUrl = 'https://localhost:7110/api/Main';

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<NutritionResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<NutritionResponse>(`${this.baseUrl}/UploadFile`, formData);
  }

  generateResponse(request: GenerateRequest): Observable<GenerateResponse> {
    return this.http.post<GenerateResponse>(`${this.baseUrl}/GenerateResponse`, request);
  }
}