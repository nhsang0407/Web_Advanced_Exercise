import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Fashion {
  _id?: string;
  title: string;
  details: string;
  thumbnail: string;
  style: string;
  createdAt?: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FashionService {
  private apiUrl = 'http://localhost:4000/api/fashions';

  constructor(private http: HttpClient) { }

  // Get all fashions
  getAllFashions(): Observable<ApiResponse<Fashion[]>> {
    return this.http.get<ApiResponse<Fashion[]>>(this.apiUrl);
  }

  // Get fashions by style
  getFashionsByStyle(style: string): Observable<ApiResponse<Fashion[]>> {
    return this.http.get<ApiResponse<Fashion[]>>(`${this.apiUrl}/style/${style}`);
  }

  // Get fashion by ID
  getFashionById(id: string): Observable<ApiResponse<Fashion>> {
    return this.http.get<ApiResponse<Fashion>>(`${this.apiUrl}/${id}`);
  }

  // Create new fashion
  createFashion(fashion: Fashion): Observable<ApiResponse<Fashion>> {
    return this.http.post<ApiResponse<Fashion>>(this.apiUrl, fashion);
  }

  // Update fashion
  updateFashion(id: string, fashion: Fashion): Observable<ApiResponse<Fashion>> {
    return this.http.put<ApiResponse<Fashion>>(`${this.apiUrl}/${id}`, fashion);
  }

  // Delete fashion
  deleteFashion(id: string): Observable<ApiResponse<Fashion>> {
    return this.http.delete<ApiResponse<Fashion>>(`${this.apiUrl}/${id}`);
  }
}
