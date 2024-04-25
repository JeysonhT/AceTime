document.addEventListener("DOMContentLoaded", function() {
    
    function guardarRecordatorio(e) {
        e.preventDefault(); 

        var nombre = document.getElementById("nombre").value;
        var fecha = document.getElementById("fecha").value;
        var hora = document.getElementById("hora").value;

        var recordatorio = {
            nombre: nombre,
            fecha: fecha,
            hora: hora
        };

        var recordatorios = JSON.parse(localStorage.getItem("recordatorios")) || [];

        recordatorios.push(recordatorio);

        localStorage.setItem("recordatorios", JSON.stringify(recordatorios));

        document.getElementById("recordatorioForm").reset();

        actualizarListaRecordatorios();

        
    }

    function actualizarListaRecordatorios() {
        var listaRecordatorios = document.getElementById("listaRecordatorios");
        listaRecordatorios.innerHTML = ""; // Limpiar la lista antes de actualizarla

        // Obtener la lista de recordatorios almacenada en localStorage
        var recordatorios = JSON.parse(localStorage.getItem("recordatorios")) || [];

        // Recorrer la lista de recordatorios y agregar cada uno a la lista en la página
        recordatorios.forEach(function(recordatorio, index) {
            var listItem = document.createElement("div");
            listItem.textContent = "Recordatorio " + (index + 1) + ": " + recordatorio.nombre + " - Hora: " + recordatorio.hora;
            listaRecordatorios.appendChild(listItem);
        });
    }

    document.getElementById("recordatorioForm").addEventListener("submit", guardarRecordatorio);

    actualizarListaRecordatorios();

    eliminarRecordatoriosPasados();
});

function verificarRecordatorios() {
    var recordatorios = JSON.parse(localStorage.getItem("recordatorios")) || [];

    var ahora = new Date();
    var fecha = ahora.getDate();
    var horaActual = ahora.getHours() + ":" + ahora.getMinutes();

    recordatorios.forEach(function(recordatorio) {
        var fechaRecordatorio = recordatorio.Date;
        var horaRecordatorio = recordatorio.hora;
        if (fechaRecordatorio === fecha && horaActual === horaRecordatorio) {
        
            if (Notification.permission === "granted") {
                var notificacion = new Notification("Recordatorio de Medicamento", {
                    body: "Es hora de tomar " + recordatorio.nombre,
                    icon: "./assets/medicina.png" 
                });
            }
        }
    });
}

function eliminarRecordatoriosPasados() {
    var ahora = new Date();
    var horaActual = ahora.getHours() + ":" + ahora.getMinutes();

    // Obtener la lista actual de recordatorios de localStorage
    var recordatorios = JSON.parse(localStorage.getItem("recordatorios")) || [];

    // Filtrar los recordatorios que tienen una hora mayor o igual a la actual
    var recordatoriosFiltrados = recordatorios.filter(function(recordatorio) {
        return recordatorio.hora >= horaActual;
    });

    // Guardar la lista filtrada de recordatorios en localStorage
    localStorage.setItem("recordatorios", JSON.stringify(recordatoriosFiltrados));
    setInterval(verificarRecordatorios, 60000);
}




