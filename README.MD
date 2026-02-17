# Metodología de maquetación

## La estructura base

En la mayoría de secciones uso **3 divs con responsabilidades divididas**:

```html
<section class="seccion" id="seccion">        <!-- Contenedor principal -->
    <div class="seccion_wrapper">             <!-- Delimitador de ancho -->
        <div class="seccion_structure">     <!-- Estructurador de layout-->
            <!-- contenido -->
        </div>
    </div>
</section>
```

Cada div tiene una única responsabilidad:

| Div | Responsabilidad |
|-----|----------------|
| Contenedor principal | Ocupa el 100% del ancho, maneja color de fondo, padding vertical |
| Wrapper | Limita el ancho máximo (ej: 1200px) y centra el bloque con `margin: 0 auto` |
| Structure | Define el layout interno (columnas, grid, flex) |

### Ejemplo: sección "Nosotros"

```css
.nosotros {
    background-color: #f5f5f5;
    padding: 6rem 0;
}

[class*="wrapper"] {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
}

.nosotros_structure {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}
```

Aquí los 3 divs tienen sentido porque hay contenido complejo: el wrapper limita el ancho y el structure organiza las columnas.

---

## Por qué en el Login no se usa esta estructura

El formulario de login es un caso especial: **solo hay un elemento centrado en pantalla**, sin columnas ni layout complejo.

Usar los 3 divs aquí generaría redundancia:

```css
/* ❌ Con los 3 divs: el centrado ocurre dos veces */
.login {
    display: flex;
    align-items: center;
    justify-content: center; /* ya centra aquí */
}

[class*="wrapper"] {
    max-width: 1200px; /* innecesario para un formulario de 400px */
}

.login_structure {
    display: flex;
    justify-content: center; /* vuelve a centrar → redundante */
}
```

Por eso en el login se simplifica a **un solo contenedor**, aplicando enfoque **mobile first**:

```css
/* BASE: móvil → ocupa todo el ancho */
.login {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

.form {
    width: 100%;
    /* sin max-width en móvil */
}

/* TABLET: 480px en adelante → ahora sí se limita el ancho */
@media (min-width: 480px) {
    .form {
        max-width: 400px;
    }
}
```

Los estilos base definen la experiencia móvil y cada media query escala hacia arriba. El `max-width: 400px` aparece desde 480px porque en móvil el formulario debe ocupar todo el ancho disponible.

---

## Regla general

> Usa los 3 divs cuando la sección tiene **contenido complejo o múltiples columnas**.
> Simplifica a 1 div cuando solo hay **un elemento centrado**.

| Caso | Estructura recomendada |
|------|----------------------|
| Hero, Nosotros, Servicios, Contacto | 3 divs |
| Login, Register, 404 | 1 div (solo contenedor) |