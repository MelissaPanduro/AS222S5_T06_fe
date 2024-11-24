export interface ChatQuery {
    id?: number;           // ID único de la consulta
    query: string;     // La consulta del usuario
    response: string;      // Respuesta de ChatGPT
    createdAt?: Date;      // Fecha de creación
    active?: boolean;      // Estado activo/inactivo para borrado lógico
}
