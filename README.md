# Sección de Comentarios - Cronoss

Prototipo funcional de una sección de comentarios para la plataforma educativa Cronoss.

## Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd list_of_comments

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Configuración de Supabase (Opcional)

Por defecto, los comentarios se guardan en `sessionStorage`. Para usar Supabase:

1. Crear un proyecto en [supabase.com](https://supabase.com)
2. Crear la tabla `comments`:

```sql
create table comments (
  id uuid primary key,
  author text not null,
  content text not null,
  created_at timestamp with time zone default now(),
  status text default 'confirmed'
);
```

3. Configurar las variables de entorno en `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=tu-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-key
```

## Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── comments/           # Componentes de la sección
│   │   ├── CommentsSection # Contenedor principal
│   │   ├── CommentForm     # Formulario de nuevo comentario
│   │   ├── CommentList     # Lista de comentarios
│   │   ├── CommentItem     # Comentario individual
│   │   └── EmptyState      # Estado vacío
│   └── ui/
│       └── Toast           # Notificación flotante
├── hooks/
│   ├── useComments         # Lógica de comentarios y estados
│   └── useRelativeTime     # Formato de tiempo relativo
├── lib/
│   ├── persistence/        # Capa de persistencia
│   │   ├── sessionStorage  # Implementación sessionStorage
│   │   └── supabase        # Implementación Supabase
│   ├── utils/
│   │   └── formatRelativeTime
│   └── validation/
│       └── commentSchema   # Validación con Zod
└── types/
    └── comment.ts          # Tipos TypeScript
```

## Decisiones Técnicas

### Arquitectura

- **Patrón Factory para persistencia**: `createPersistence()` decide automáticamente si usar Supabase o sessionStorage según las variables de entorno. Esto permite cambiar la implementación sin modificar los componentes.

- **Custom hooks**: Separé la lógica de estado (`useComments`) de los componentes UI para mantener los componentes puros y facilitar testing.

- **Optimistic UI**: Los comentarios aparecen inmediatamente con estado `pending`, se confirman como `confirmed`, o muestran `error` con opciones de reintentar/descartar.

### Validación

- **Zod**: Validación del lado cliente antes de enviar. Errores específicos por campo que se muestran inline.

### UX

- **Toast de confirmación**: Notificación flotante cuando el comentario se publica correctamente.
- **Contador de caracteres**: Límite de 300 caracteres con indicador visual.
- **Tiempo relativo + fecha**: Muestra "28 ene 2026 · hace 5 minutos" para contexto completo.
- **Preservación de datos en error**: Si la validación falla, el contenido del formulario no se borra.
- **Polling con caché**: Fetch automático cada 20 segundos para mantener los comentarios actualizados. Usa una clave de caché generada desde IDs y timestamps para detectar cambios y solo actualiza el estado si hay datos nuevos (evita re-renders innecesarios). Los errores durante el polling se silencian para no interrumpir la experiencia.
- **Botón "Cargar más"**: Muestra 5 comentarios inicialmente y carga 5 más con cada click. Evita renderizar listas largas de golpe.

### Estilos

- **CSS Modules**: Estilos encapsulados por componente.
- **Variables CSS**: Sistema de diseño consistente con colores, espaciado y radios definidos en `globals.css`.

## Features Implementadas

- [x] Lista de comentarios ordenada por más reciente
- [x] Formulario con validación (nombre y contenido requeridos)
- [x] Estados: idle, submitting, success, error
- [x] Optimistic UI con indicador de guardado
- [x] Persistencia en sessionStorage (+ Supabase opcional)
- [x] Tiempo relativo que se actualiza cada minuto
- [x] Fecha de publicación visible
- [x] Estado vacío cuando no hay comentarios
- [x] Reintentar/Descartar comentarios fallidos
- [x] Toast de confirmación
- [x] Límite de caracteres con contador
- [x] Polling automático cada 20 segundos con caché inteligente
- [x] Botón "Cargar más" para paginación local

## Mejoras Futuras

Con más tiempo, agregaría:

- **Paginación del servidor**: Actualmente la paginación es local; con muchos comentarios convendría paginar desde el backend
- **Respuestas anidadas**: Threads de conversación
- **Likes/Reacciones**: Interacción adicional con los comentarios
- **Autenticación**: Integrar con sistema de usuarios de Cronoss

## Scripts

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Ejecutar ESLint
```
