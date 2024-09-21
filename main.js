const cantidad = document.getElementById('cantidad');
const botonGenerar = document.getElementById('generar');
const contrasena = document.getElementById('contrasena');
const botonLimpiar = document.getElementById('limpiar');
const seguridadTexto = document.getElementById('seguridad');
const checkIcon = document.getElementById('check-icon');

const cadenaCaracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

const generar = () => {
    const numeroDigitado = parseInt(cantidad.value, 10);

    if (isNaN(numeroDigitado) || numeroDigitado < 8) {
        8
        alert("La cantidad de caracteres debe ser un número mayor o igual a 8");
        return;
    }

    let password = '';
    for (let i = 0; i < numeroDigitado; i++) {
        const caracterAleatorio = cadenaCaracteres.charAt(Math.floor(Math.random() * cadenaCaracteres.length));
        password += caracterAleatorio;
    }

    contrasena.value = password;
    verificarSeguridad(password);
    mostrarCheck();
};


const limpiar = () => {
    contrasena.value = '';
    cantidad.value = '';
    seguridadTexto.textContent = '';
    seguridadTexto.classList.remove('seguridad-fuerte', 'seguridad-media', 'seguridad-debil');
    ocultarCheck();
};
const verificarSeguridad = (password) => {
    let seguridad = 'Débil';
    let claseSeguridad = 'seguridad-debil';

    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /\d/.test(password);
    const tieneCaracterEspecial = /[!@#$%^&*()]/.test(password);
    const esLarga = password.length >= 9;

    if (tieneMayuscula && tieneMinuscula && tieneNumero && tieneCaracterEspecial && esLarga) {
        seguridad = 'Fuerte';
        claseSeguridad = 'seguridad-fuerte';
    } else if ((tieneMayuscula || tieneMinuscula) && tieneNumero && esLarga) {
        seguridad = 'Media';
        claseSeguridad = 'seguridad-media';
    }

    seguridadTexto.textContent = `Seguridad de la contraseña: ${seguridad}`;

    seguridadTexto.classList.remove('seguridad-fuerte', 'seguridad-media', 'seguridad-debil');

    seguridadTexto.classList.add(claseSeguridad);
};

const mostrarCheck = () => {
    checkIcon.style.display = 'inline-block';
    setTimeout(() => {
        checkIcon.style.display = 'none';
    }, 3000);
};

const ocultarCheck = () => {
    checkIcon.style.display = 'none';
};

botonGenerar.addEventListener('click', generar);
botonLimpiar.addEventListener('click', limpiar);

document.addEventListener('DOMContentLoaded', ocultarCheck);
