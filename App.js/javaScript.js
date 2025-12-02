
// ==============================================
// 1. RESPUESTAS Y PUNTUACIONES
// ==============================================

const QUIZZES = {
    'quiz-1': {
        // Cuestionario 1: Conceptos Básicos (Max. 10 Puntos)
        maxScore: 10,
        questions: {
            // Pregunta 1: Objetivo de IS (5 Puntos)
            q1: { answer: 'b', points: 5 }, 
            // Pregunta 2: Pruebas de software (5 Puntos)
            q2: { answer: 'a', points: 5 }  
        }
    },
    'quiz-2': {
        // Cuestionario 2: Fases de Desarrollo (Max. 7 Puntos)
        maxScore: 7,
        questions: {
            // Se usan q3, q4, etc., para evitar conflicto con q1 y q2 del primer quiz.
            q3: { answer: 'b', points: 1 }, // 1. Planificación
            q4: { answer: 'b', points: 1 }, // 2. Alcance/Documentación
            q5: { answer: 'a', points: 1 }, // 3. Diseño/Prototipado
            q6: { answer: 'b', points: 1 }, // 4. Desarrollo/Implementación
            q7: { answer: 'a', points: 1 }, // 5. Pruebas y Calidad
            q8: { answer: 'a', points: 1 }, // 6. Soporte y Mantenimiento
            q9: { answer: 'a', points: 1 }  // 7. Análisis y Optimización
        }
    }
};

// ==============================================
// 2.  CORRECCIÓN
// ==============================================

/**
 * Función que corrige un cuestionario específico.
 * @param {Event} event - El evento de submit del formulario.
 */
function checkQuiz(event) {
    event.preventDefault(); 
    
    // Obtiene el ID del formulario que se envió (quiz-1 o quiz-2)
    const form = event.target;
    const formId = form.id; 
    
    // Si el ID del formulario no está en nuestra lista de QUIZZES, salimos.
    if (!QUIZZES[formId]) return;

    const quizData = QUIZZES[formId];
    const formData = new FormData(form);
    let score = 0;
    let correctCount = 0;
    let totalQuestions = Object.keys(quizData.questions).length;

    // Itera sobre las preguntas del cuestionario específico
    for (const [questionId, data] of Object.entries(quizData.questions)) {
        const userAnswer = formData.get(questionId); 

        if (userAnswer === data.answer) {
            score += data.points;
            correctCount++;
        }
    }

    // Calcula el porcentaje
    const percentage = (score / quizData.maxScore) * 100;
    
    // Obtiene el ID del contenedor de resultados correspondiente (results-1 o results-2)
    const resultsDiv = document.getElementById(`results-${formId.split('-')[1]}`);
    
    if (!resultsDiv) return;

    // Muestra los resultados
    resultsDiv.innerHTML = `
        <h2>✅ Resultados de ${formId.toUpperCase()} ✅</h2>
        <div class="result-summary">
            <p>Puntuación Total Obtenida: <strong>${score} / ${quizData.maxScore}</strong></p>
            <p>Aciertos: <strong>${correctCount}</strong> de ${totalQuestions} preguntas</p>
            <p>Porcentaje de Aciertos: <strong>${percentage.toFixed(2)}%</strong></p>
        </div>
    `;
    
    // Oculta el formulario y muestra los resultados
    form.style.display = 'none';
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

// ==============================================
// 3. INICIALIZACIÓN
// ==============================================

// Asocia la función de corrección a ambos formularios
document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener y asociar la función a todos los formularios
    const form1 = document.getElementById('quiz-1');
    const form2 = document.getElementById('quiz-2');
    
    if (form1) {
        form1.addEventListener('submit', checkQuiz);
        // 2. Ocultar los resultados al inicio
        const results1 = document.getElementById('results-1');
        if (results1) results1.style.display = 'none';
    }
    
    if (form2) {
        form2.addEventListener('submit', checkQuiz);
        const results2 = document.getElementById('results-2');
        if (results2) results2.style.display = 'none';
    }
});