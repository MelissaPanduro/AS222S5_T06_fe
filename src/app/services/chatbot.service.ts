import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'https://psychic-space-capybara-44xx67xx9vpfjppx-8080.app.github.dev/api/chatbot/responses';

  constructor(private http: HttpClient) {}

  // Obtener todas las respuestas
  getAllResponses(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Obtener una respuesta por ID
  getResponseById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva respuesta
  createResponse(query: string): Observable<any> {
    return this.http.post(this.apiUrl, query);
  }

  // Editar una respuesta existente
  editResponse(id: number, newQuery: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, newQuery);
  }

  // Eliminar una respuesta
  deleteResponse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
