export interface ChatQuery {
    id?: number;           // ID único de la consulta (opcional para crear, obligatorio para actualizar)
    query: string;         // La consulta del usuario
    response: string;      // Respuesta de ChatGPT
    createdAt?: Date;      // Fecha de creación (opcional, dependiendo del contexto)
    active?: boolean;      // Estado activo/inactivo para borrado lógico (opcional)
  }
  