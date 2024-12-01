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
                    this.queries = data.map((item: any, index: number) => ({
                        id: item.id || index + 1, // Asigna un ID único si no está presente
                        query: item.query || '',
                        response: item.response || '',
                    }));
                    this.errorMessage = null;
                } else {
                    this.setError('Error al cargar las consultas');
                }
            },
            error: () => {
                this.setError('Error al cargar las consultas');
            },
        });
    }

    
    startEditing(query: ChatQuery): void {
        this.newQuery = { ...query };  // Carga la consulta en el formulario
        this.editingQueryId = query.id || null;  // Establece el ID de edición
    }
    
    submitQuery(): void {
        if (!this.newQuery.query.trim()) {
            this.setError('Por favor, ingresa una consulta válida.');
            return;
        }
    
        // Si estamos editando, usamos el id correcto en la actualización
        if (this.editingQueryId !== null) {
            this.newQuery.id = this.editingQueryId; // Asegúrate de que el id esté presente
        }
    
        const action = this.editingQueryId
            ? this.chatbotService.updateQuery(this.editingQueryId, this.newQuery)
            : this.chatbotService.createQuery(this.newQuery);
    
        console.log('Datos enviados:', this.newQuery); // Verifica los datos
        console.log('Endpoint:', action); // Verifica la URL
    
        action.subscribe({
            next: () => {
                this.loadQueries();
                this.resetForm();
                this.setSuccess(this.editingQueryId ? 'Consulta actualizada.' : 'Consulta creada.');
            },
            error: (error) => {
                console.error('Error del servidor:', error); // Muestra detalles del error
                this.setError('Ocurrió un error durante la operación.');
            },
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
        if (query.id && confirm('¿Estás seguro de que deseas eliminar esta consulta?')) {
          this.chatbotService.deleteQuery(query.id).subscribe({
            next: () => {
              this.queries = this.queries.filter(q => q.id !== query.id);
              this.setSuccess('Consulta eliminada exitosamente.');
            },
            error: () => {
              this.setError('Error al eliminar la consulta.');
            },
          });
        }
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



  
}




