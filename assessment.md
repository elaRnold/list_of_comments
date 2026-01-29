# Prueba Técnica: Sección de Comentarios

> **Posición:** Frontend Developer @ Cronoss

---

## Contexto

En Cronoss estamos construyendo una plataforma educativa donde los usuarios pueden ver programas y clases. Próximamente necesitamos agregar una **sección de comentarios** para que los usuarios puedan interactuar con el contenido.

Tu tarea es construir un prototipo funcional de esta feature.

---

## El Reto

Construir una **Sección de Comentarios** que incluya:

1. **Lista de comentarios** existentes
2. **Formulario** para agregar un nuevo comentario
3. **Persistencia** de datos
4. **Manejo de estados** (loading, error, success)
5. **Optimistic UI** - el comentario aparece inmediatamente

---

## Requerimientos Funcionales

### Lista de Comentarios
- Mostrar comentarios con: autor, contenido, fecha
- Ordenar por más reciente primero
- Mostrar mensaje cuando no hay comentarios
- Mostrar tiempo relativo (ej: "hace 2 horas")

### Formulario
- Campos: nombre del autor, comentario
- Validación de campos requeridos
- Botón de submit con estados claros

### Estados
- Estados claros: idle, submitting, success, error
- Feedback visual durante el envío
- Manejo de errores con opción de reintentar

### Persistencia
- **Mínimo:** sessionStorage (comentarios persisten al recargar)
- **Bonus:** Integración con Supabase u otra base de datos real

### Optimistic UI
- El comentario aparece en la lista inmediatamente (antes de confirmar guardado)
- Si hay error: revertir el cambio y mostrar mensaje de error
- Indicador visual mientras se "confirma" el guardado

---

## Requerimientos Técnicos

| Tecnología | Requerido | Notas |
|------------|-----------|-------|
| **Next.js App Router** | Sí | No Pages Router |
| **TypeScript** | Sí | Tipado estricto, evitar `any` |
| **CSS Modules** | Sí | Estilos en archivos `.module.css` |
| **Zod** | Sí | Para validación del formulario |
| **Tests** | Bonus | En puntos críticos (ej: schema de validación) |
| **Supabase** | Bonus | Gran plus si integras una DB real |

---

## Calidad de Código

- [ ] Commits descriptivos y atómicos (no un solo commit con todo)
- [ ] README con instrucciones claras de setup
- [ ] TypeScript compila sin errores
- [ ] Errores manejados correctamente

---

## Entrega

1. **Repositorio público en GitHub** con tu solución
2. **README.md** que incluya:
   - Instrucciones de instalación y ejecución
   - Decisiones técnicas que tomaste y por qué
   - Qué mejorarías si tuvieras más tiempo
3. Enviar el link del repo por email

---

## Sesión en Vivo (Después de Entregar)

Una vez que entregues la prueba, agendaremos una sesión de 60-90 minutos donde:

1. **Compartirás pantalla** via tunnel (ngrok, cloudflare, localtunnel, etc.)
2. **Te pediremos algunos cambios** en vivo
3. **Puedes usar herramientas de IA** (Cursor, Copilot, etc.) - queremos ver cómo las usas
4. **Discutiremos** tus decisiones y approach

### Preparación para la Sesión
- Tener el proyecto corriendo localmente
- Tener configurado un tunnel para compartir localhost
- Tener lista tu herramienta de IA preferida

---

## Preguntas

Si tienes dudas sobre los requerimientos, no dudes en escribirnos. Preferimos que preguntes a que asumas incorrectamente.

**Contacto:** [esteban@cronoss.com](mailto:esteban@cronoss.com)

---

## Tips

- **No sobre-diseñes**: La simplicidad es valorada. Enfócate en que funcione bien.
- **Commits frecuentes**: Queremos ver cómo desarrollas, no solo el resultado final.
- **UX matters**: Piensa en la experiencia del usuario en cada estado.
- **TypeScript**: Aprovecha el tipado para documentar tu código.

---

¡Éxitos!
