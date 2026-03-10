async function sendNote(studentName, type) {
    const parentEmail = "tu-correo@ejemplo.com"; // Aquí iría el correo del padre desde la DB
    
    alert(`Iniciando envío de correo para ${studentName}...`);

    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                studentName: studentName,
                type: type,
                description: "Registro de actividad diaria en el aula.",
                parentEmail: parentEmail
            })
        });

        const result = await response.json();
        if (result.success) {
            alert("¡Correo enviado con éxito al representante!");
        } else {
            alert("Error al enviar: " + result.error);
        }
    } catch (error) {
        alert("Error de conexión con el servidor.");
    }
}
