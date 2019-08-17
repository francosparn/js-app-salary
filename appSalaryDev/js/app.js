class Sueldo {
    constructor(lenguaje, categoria) {
        this.lenguaje = lenguaje;
        this.categoria = categoria;
    }
    cotizarSueldo() {

        let cantidad;
        let totalSueldo;
        const base = 22000;

        switch (this.lenguaje) {
            case '1':
                cantidad = base * 1.3;
                break;
            case '2':
                cantidad = base * 2.0;
                break;
            case '3':
                cantidad = base * 1.2;
                break;
            case '4':
                cantidad = base * 1.6;
                break;
            case '5':
                cantidad = base * 2.1;
                break;
            case '6':
                cantidad = base * 1.8;
                break;
            case '7':
                cantidad = base * 1.2;
                break;
            case '8':
                cantidad = base * 1.7;
                break;
            case '9':
                cantidad = base * 1.4;
                break;
            case '10':
                cantidad = base * 1.1;
                break;
        }

        // Leer categoría
        switch (this.categoria) {
            case 'Trainee':
                totalSueldo = cantidad * 1.1;
                break;
            case 'Junior':
                totalSueldo = cantidad * 1.3;
                break;
            case 'Semi Senior':
                totalSueldo = cantidad * 1.5;
                break;
            case 'Senior':
                totalSueldo = cantidad * 1.8;
                break;
        }

        const p = document.createElement('p');
        // Insertar la información
        p.innerHTML = `
                <h4 class="text-center text-light bg-success p-2">Promedio: $${Math.round(totalSueldo)} ARS</h4>
           `;
        p.style.display = 'none';
        setTimeout(function() {
            p.style.display = 'block';
            resultado.appendChild(p);
        }, 3000);
    }
}

// Todo lo que se muestra
class Interfaz {
    mostrarMensaje(mensaje, tipo) {
        const div = document.createElement('div');

        if (tipo === 'error') {
            div.classList.add('mensaje', 'error');
        } else {
            div.classList.add('mensaje', 'correcto');
        }
        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div, document.querySelector('.form-group'));

        setTimeout(function() {
            document.querySelector('.mensaje').remove();
        }, 3000);
    }
    mostrarResultado(sueldo, total) {
        const resultado = document.getElementById('resultado');
        let lenguaje;
        switch (sueldo.lenguaje) {
            case '1':
                lenguaje = 'C';
                break;
            case '2':
                lenguaje = 'C#';
                break;
            case '3':
                lenguaje = 'C++';
                break;
            case '4':
                lenguaje = 'Go';
                break;
            case '5':
                lenguaje = 'Java';
                break;
            case '6':
                lenguaje = 'JavaScript';
                break;
            case '7':
                lenguaje = 'PHP';
                break;
            case '8':
                lenguaje = 'Python';
                break;
            case '9':
                lenguaje = 'Ruby';
                break;
            case '10':
                lenguaje = 'Visual Basic .NET';
                break;
        }
        // Crear div
        const div = document.createElement('div');
        // Insertar la información
        div.innerHTML = `
                <p class='text-center'><b>Lenguaje</b>: ${lenguaje}</p>
                <p class='text-center pb-3'><b>Categoría</b>: ${sueldo.categoria}</p>
           `;
        // Spinner
        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        setTimeout(function() {
            spinner.style.display = '';
            resultado.appendChild(div);
        }, 3000);
    }
}

// EventListener
const formulario = document.getElementById('cotizar');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    // Leer el lenguaje seleccionado
    const lenguaje = document.getElementById('lenguaje');
    const lenguajeSeleccionado = lenguaje.options[lenguaje.selectedIndex].value;

    // Leer experiencia
    const categoria = document.getElementById('categoria');
    const categoriaSeleccionada = categoria.options[categoria.selectedIndex].value;

    // Crear instancia de interfaz
    const interfaz = new Interfaz();

    // Revisar que los campos no estén vacíos
    if (lenguajeSeleccionado === '' || categoriaSeleccionada === '') {
        // Interfaz imprimiendo un error
        interfaz.mostrarMensaje('Faltan datos, revise el formulario e inténtelo enviar nuevamente.', 'error');
    } else {
        // Limpiar resultados anteriores
        const resultadoUno = document.querySelector('#resultado div');
        const resultadoDos = document.querySelector('#resultado p');
        if (resultadoUno != null || resultadoDos != null) {
            resultadoUno.remove();
            resultadoDos.remove();
        }
        // Instanciar seguro y mostrar interfaz
        const sueldo = new Sueldo(lenguajeSeleccionado, categoriaSeleccionada);
        // Cotizar el sueldo
        const cantidad = sueldo.cotizarSueldo();
        // Mostrar resultado
        interfaz.mostrarResultado(sueldo, cantidad);
        interfaz.mostrarMensaje('Procesando...', 'correcto');
    }
});
