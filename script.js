// Configuración de Supabase
const SUBAPASE_URL = "https://slngipevncuhjmuonrtg.supabase.co"; 
const SUPABASE_KEY = "PEGA_AQUÍ_TU_ANON_PUBLIC_KEY";

async function loadStudents() {
    const response = await fetch(`${SUBAPASE_URL}/rest/v1/Students?select=*`, {
        headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`
        }
    });
    const students = await response.json();
    renderStudents(students);
}

function renderStudents(students) {
    const container = document.getElementById('students-container');
    container.innerHTML = ""; // Limpiar carga

    students.forEach(student => {
        const card = `
            <div class="card">
                <h3>${student.first_name} ${student.last_name}</h3>
                <p>ID: ${student.student_id}</p>
                <button onclick="sendNote('${student.student_id}', 'Positive')">Refuerzo +</button>
                <button onclick="sendNote('${student.student_id}', 'Improvement')">Nota Mejora</button>
            </div>
        `;
        container.innerHTML += card;
    });
}

// Llamar a la función al cargar la página
window.onload = loadStudents;
