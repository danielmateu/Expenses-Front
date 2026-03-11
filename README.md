# Control de Gastos - FrontEnd

Aplicación frontend para la gestión de gastos personales construida con:
 **Next.js 16**, **React 19** y **TypeScript**  

 ## Descripción

Frontend intuitivo para la aplicación de gestión de gastos. Permite crear, actualizar, eliminar y visualizar gastos con validación en tiempo real

## Stack Tecnológico

- **Framework**: Next.js 16.1.6 (sin Turbopack)
- **React**: 19.2.4
- **Lenguaje**: TypeScript 5.9.3
- **Validación Frontal**: Zod + React Hook Form
- **UI Components**: ShadCN/ui
- **Estilos**: Tailwind CSS 4.1.18, CVA
- **Notificaciones**: Sonner
- **Desarrollo**: ESLint, Prettier

## Instalación y Setup

### Requisitos previos
- **Node.js** (v18 o superior)
- **npm** o yarn

### Pasos de Instalación

#### 1️⃣ Clonar el repositorio

```bash
# Clonar el repositorio
git clone https://github.com/danielmateu/Expenses-Front.git

# Acceder a la carpeta del frontend
cd Expenses-Front
```

#### 2️⃣ Instalar dependencias

```bash
# Instalar todas las dependencias
npm install
```

#### 3️⃣ Configurar variables de entorno

Crear archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## ▶️ Ejecución del Proyecto

### Iniciar el Frontend

```bash
# Modo desarrollo (hot reload)
npm run dev

```

### Validación de Datos

El frontend valida todos los campos con **Zod**

### 1. React Hook Form + Zod vs Alternativas

**Decisión:** Usar React Hook Form + Zod en el frontend

**Ventajas:**
- Performance optimizado
- Validación declarativa con Zod
- Integración perfecta con formularios HTML
- Pequeño bundle size
- Documentación excelente

**Trade-offs:**
- Curva de aprendizaje para controller pattern

**Por qué:** Es el estándar de facto para formularios en React moderno.

---

### 2. ShadCN/ui 

**Decisión:** Usar ShadCN/ui (custom Base UI components)

**Ventajas:**
- Fully customizable
- No vendor lock-in
- Código propietario en el repositorio
- Excelente accessibility
- Composable y reusable

**Trade-offs:**
- Más componentes personalizables = más código

**Por qué:** Control total y flexibilidad para un proyecto técnico.

---

### 3. next-themes para Dark Mode

**Decisión:** next-themes + hotkey D

**Ventajas:**
- Persiste preferencia del usuario
- Hotkey para toggle rápido
- Respeta preferencias del OS

**Trade-offs:**
- Flash de contenido en primer render (mitigado con script inline)

---

### 4. Sin Cache / SWR

**Decisión:** Fetch simple sin SWR o React Query

**Ventajas:**
- Simplicidad
- Menor bundle
- Control explícito del flujo de datos

**Trade-offs:**
- No hay revalidación automática
- Sin optimistic updates