// src/app/services/chatbot.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ChatQuery } from '../models/chat-query';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ChatbotService {


  private apiUrl: string = environment.chatbot_be;
  constructor(private http: HttpClient) {}
  
  // Crear una nueva consulta
  createQuery(query: ChatQuery): Observable<ChatQuery | { error: string }> {
    return this.http.post<ChatQuery>(this.apiUrl, query).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  // Obtener todas las consultas
  getQueries(): Observable<ChatQuery[]> {
    return this.http.get<ChatQuery[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al obtener las consultas:', error);
        return throwError(error);
      })
    );
  }
  

  
  updateQuery(id: number, query: ChatQuery): Observable<ChatQuery | { error: string }> {
    // Asegúrate de que 'query.id' tenga el valor correcto
    return this.http.put<ChatQuery>(`${this.apiUrl}/${id}`, query).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }
  

  // Borrado lógico de una consulta
  deleteQuery(id: number): Observable<void | { error: string }> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  // Manejo de errores en caso de respuestas en texto plano
  private handleError(error: HttpErrorResponse): Observable<{ error: string }> {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ProgressEvent) {
      errorMessage = 'No response from the server';
    } else if (typeof error.error === 'string') {
      errorMessage = error.error;
    }
    return throwError({ error: errorMessage });
  }

  
}
