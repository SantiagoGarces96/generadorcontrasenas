document.addEventListener('DOMContentLoaded', () => {
    const d = document;
    const $cantidad = d.getElementById("cantidad");
    const $generar = d.getElementById("generar");
    const $contrasenia = d.getElementById("contrasena");
    const $limpiar = d.getElementById("limpiar");
    const $minusculas = d.getElementById("minusculas");
    const $mayusculas = d.getElementById("mayusculas");
    const $numeros = d.getElementById("numeros");
    const $caracteres = d.getElementById("caracteres");
    const $fortaleza = d.getElementById("textoFortaleza");
    const $debil = d.getElementById("debil");
    const $medioDebil = d.getElementById("medioDebil");
    const $medio = d.getElementById("medio");
    const $medioFuerte = d.getElementById("medioFuerte");
    const $fuerte = d.getElementById("fuerte");

    const cadenaMinusculas = "abcdefghijklmnopqrstuvwxyz";
    const cadenaMayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const cadenaNumeros = "0123456789";
    const cadenaCaracteres = "#$%&_()^*";


    function generarContrasena() {
        const numeroR = parseInt($cantidad.value);


        if (isNaN(numeroR) || numeroR < 8 || numeroR > 128) {
            alert("El número de caracteres debe estar entre 8 y 128.");
            return;
        }

        const arrayCadenas = [];
        if ($minusculas.checked) arrayCadenas.push(cadenaMinusculas);
        if ($mayusculas.checked) arrayCadenas.push(cadenaMayusculas);
        if ($numeros.checked) arrayCadenas.push(cadenaNumeros);
        if ($caracteres.checked) arrayCadenas.push(cadenaCaracteres);

        if (arrayCadenas.length === 0) {
            alert("Debes seleccionar al menos una opción de los requerimientos.");
            return;
        }

        let contrasenia = "";


        arrayCadenas.forEach(element => {
            const caracter = element[Math.floor(Math.random() * element.length)];
            contrasenia += caracter;
        });


        const caracteresDisponibles = arrayCadenas.join('');
        for (let i = contrasenia.length; i < numeroR; i++) {
            const caracter = caracteresDisponibles[Math.floor(Math.random() * caracteresDisponibles.length)];
            contrasenia += caracter;
        }


        contrasenia = mezclarCadena(contrasenia);
        $contrasenia.value = contrasenia;


        evaluarFortaleza(arrayCadenas.length, numeroR);
    }


    function mezclarCadena(cadena) {
        return cadena.split('').sort(() => Math.random() - 0.5).join('');
    }

    function evaluarFortaleza(cantidadTipos, longitud) {
        let fortaleza = "";
        let colorBarras = {
            debil: "gray",
            medioDebil: "gray",
            medio: "gray",
            medioFuerte: "gray",
            fuerte: "gray"
        };

        if (cantidadTipos === 1) {
            fortaleza = longitud < 11 ? "Contraseña débil" : "Contraseña media débil";
            colorBarras.debil = longitud < 11 ? "red" : "orange";
            if (longitud >= 11) colorBarras.medioDebil = "orange";
        } else if (cantidadTipos === 2) {
            fortaleza = longitud < 11 ? "Contraseña media débil" : "Contraseña media";
            colorBarras.debil = "orange";
            colorBarras.medioDebil = "orange";
            if (longitud >= 11) colorBarras.medio = "yellow";
        } else if (cantidadTipos === 3) {
            fortaleza = longitud < 11 ? "Contraseña media" : "Contraseña media fuerte";
            colorBarras.debil = "yellow";
            colorBarras.medioDebil = "yellow";
            colorBarras.medio = "yellow";
            if (longitud >= 11) colorBarras.medioFuerte = "lightgreen";
        } else if (cantidadTipos === 4) {
            fortaleza = longitud < 11 ? "Contraseña media fuerte" : "Contraseña fuerte";
            colorBarras.debil = "lightgreen";
            colorBarras.medioDebil = "lightgreen";
            colorBarras.medio = "lightgreen";
            colorBarras.medioFuerte = "lightgreen";
            if (longitud >= 11) colorBarras.fuerte = "green";
        }

        $fortaleza.textContent = `Fortaleza: ${fortaleza}`;


        $debil.style.backgroundColor = colorBarras.debil;
        $medioDebil.style.backgroundColor = colorBarras.medioDebil;
        $medio.style.backgroundColor = colorBarras.medio;
        $medioFuerte.style.backgroundColor = colorBarras.medioFuerte;
        $fuerte.style.backgroundColor = colorBarras.fuerte;
    }


    function limpiarCampos() {
        $cantidad.value = "";
        $contrasenia.value = "";
        $minusculas.checked = false;
        $mayusculas.checked = false;
        $numeros.checked = false;
        $caracteres.checked = false;
        $fortaleza.textContent = "Fortaleza: ";
        $debil.style.backgroundColor = "gray";
        $medioDebil.style.backgroundColor = "gray";
        $medio.style.backgroundColor = "gray";
        $medioFuerte.style.backgroundColor = "gray";
        $fuerte.style.backgroundColor = "gray";
    }


    $generar.addEventListener("click", generarContrasena);
    $limpiar.addEventListener("click", limpiarCampos);
});
