import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../services/chatbot.service';
import { ChatQuery } from '../../models/chat-query';

@Component({
    selector: 'app-chat-queries',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chat-queries.component.html',
    styleUrls: ['./chat-queries.component.css'],
})
export class ChatQueriesComponent implements OnInit {
    queries: ChatQuery[] = [];
    newQuery: ChatQuery = { query: '', response: '' };
    editingQueryId: number | null = null;  // Propiedad para manejar la edición
    errorMessage: string | null = null;
    successMessage: string | null = null;

    constructor(private chatbotService: ChatbotService) {}

    ngOnInit(): void {
        this.loadQueries();
    }

    loadQueries(): void {
        this.chatbotService.getQueries().subscribe({
          next: (data) => {
            if (Array.isArray(data)) {
              this.queries = data;  // Aquí data debe ser un array de objetos ChatQuery sin comillas escapadas
              this.errorMessage = null;
            } else {
              this.setError('Error al cargar las consultas');
            }
          },
          error: () => {
            this.setError('Error al cargar las consultas');
          }
        });
      }
      
      

    addOrUpdateQuery(): void {
        if (this.editingQueryId !== null) {  // Si estamos en modo edición
            this.updateQuery(this.newQuery);  // Actualiza la consulta
        } else {
            this.addQuery();  // Si no se está editando, agrega una nueva consulta
        }
    }

    addQuery(): void {
        if (this.newQuery.query) {
            this.chatbotService.createQuery(this.newQuery).subscribe({
                next: (data) => {
                    if (data && !('error' in data)) {
                        this.queries.push(data);
                        this.resetForm();  // Restablece el formulario
                        this.setSuccess('Consulta creada exitosamente');
                    } else {
                        this.setError('Error al crear la consulta');
                    }
                },
                error: () => {
                    this.setError('Error al crear la consulta');
                },
            });
        }
    }

    updateQuery(query: ChatQuery): void {
        if (this.editingQueryId !== null) {
            this.chatbotService.updateQuery(this.editingQueryId, query).subscribe({
                next: (updatedQuery) => {
                    if (updatedQuery && !('error' in updatedQuery)) {
                        const index = this.queries.findIndex(q => q.id === this.editingQueryId);
                        if (index !== -1) {
                            this.queries[index] = updatedQuery;  // Actualiza la consulta en la lista
                        }
                        this.setSuccess('Consulta actualizada exitosamente');
                        this.resetForm();  // Restablece el formulario
                    } else {
                        this.setError('Error al actualizar la consulta');
                    }
                },
                error: () => {
                    this.setError('Error al actualizar la consulta');
                },
            });
        }
    }

    deleteQuery(query: ChatQuery): void {
        if (query.id) {
            this.chatbotService.deleteQuery(query.id).subscribe({
                next: () => {
                    this.queries = this.queries.filter(q => q.id !== query.id); // Elimina de la lista
                    this.setSuccess('Consulta eliminada exitosamente');
                },
                error: () => {
                    this.setError('Error al eliminar la consulta');
                },
            });
        }
    }

    startEditing(query: ChatQuery): void {
        this.newQuery = { ...query };  // Carga la consulta en el formulario
        this.editingQueryId = query.id || null;  // Establece el ID de edición
    }

    resetForm(): void {
        this.newQuery = { query: '', response: '' };  // Restablece el formulario
        this.editingQueryId = null;  // Limpia el ID de edición
        this.errorMessage = null;  // Limpia mensajes de error
        this.successMessage = null;  // Limpia mensajes de éxito
    }

    private setError(message: string): void {
        this.errorMessage = message;
        this.successMessage = null;
        console.error(message);
    }

    private setSuccess(message: string): void {
        this.successMessage = message;
        this.errorMessage = null;
    }

    submitQuery(): void {
        if (this.newQuery.query.trim()) {
            this.chatbotService.createQuery(this.newQuery).subscribe({
                next: (data) => {
                    if (data && !('error' in data)) {
                        this.queries.push(data);
                        this.newQuery.query = ''; // Limpiar el campo de entrada
                        this.setSuccess('Consulta enviada');
                    } else {
                        this.setError('Error al enviar la consulta');
                    }
                },
                error: () => {
                    this.setError('Error al enviar la consulta');
                },
            });
        } else {
            this.setError('Por favor, ingresa una consulta.');
        }
    }
    
   // Método para editar una pregunta existente
  editQuery(query: { query: string }) {
    this.newQuery.query = query.query;  // Rellenar el campo de entrada con la pregunta a editar
    // Aquí podrías agregar la lógica para editar el mensaje en tu backend si es necesario
  } 
    
}


