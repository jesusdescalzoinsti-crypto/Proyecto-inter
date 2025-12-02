

// ==============================================
// 1. RESPUESTAS Y PUNTUACIONES
// ==============================================

const QUIZZES = {
    // CUESTIONARIO 1: Conceptos Básicos (2 Preguntas / Max. 10 Puntos)
    'quiz-1': {
        maxScore: 10,
        questions: {
            q1: { answer: 'b', points: 5 }, // Objetivo de IS
            q2: { answer: 'a', points: 5 }  // Pruebas de software
        }
    },
    // CUESTIONARIO 2: Fases de Desarrollo (7 Preguntas / Max. 7 Puntos)
    'quiz-2': {
        maxScore: 7,
        questions: {
            q3: { answer: 'b', points: 1 }, // 1. Planificación
            q4: { answer: 'b', points: 1 }, // 2. Alcance/Documentación
            q5: { answer: 'a', points: 1 }, // 3. Diseño/Prototipado
            q6: { answer: 'b', points: 1 }, // 4. Desarrollo/Implementación
            q7: { answer: 'a', points: 1 }, // 5. Pruebas y Calidad
            q8: { answer: 'a', points: 1 }, // 6. Soporte y Mantenimiento
            q9: { answer: 'a', points: 1 }  // 7. Análisis y Optimización
        }
    },
    // CUESTIONARIO 3: Perfiles que Intervienen (8 Preguntas / Max. 8 Puntos)
    'quiz-3': {
        maxScore: 8,
        questions: {
            q10: { answer: 'b', points: 1 }, // 1. Hablar con el cliente (Analista)
            q11: { answer: 'a', points: 1 }, // 2. Organiza tiempo/presupuesto (Gestor)
            q12: { answer: 'b', points: 1 }, // 3. Escribir código (Desarrollador)
            q13: { answer: 'a', points: 1 }, // 4. Diseña estructura escalable (Arquitecto/Diseñador)
            q14: { answer: 'a', points: 1 }, // 5. Asegura funcionamiento antes de entrega (Ing. Integración/Pruebas)
            q15: { answer: 'a', points: 1 }, // 6. Corrige errores en uso (Espec. Mantenimiento)
            q16: { answer: 'a', points: 1 }, // 7. Añadir nueva función (Espec. Mantenimiento)
            q17: { answer: 'a', points: 1 }  // 8. Traduce necesidades a requisitos (Analista/Consultor)
        }
    },
    // CUESTIONARIO 4: Modelos de Ciclo de Vida (8 Preguntas / Max. 8 Puntos)
    'quiz-4': {
        maxScore: 8,
        questions: {
            q18: { answer: 'c', points: 1 }, // 1. Cascada: secuencial
            q19: { answer: 'b', points: 1 }, // 2. Modelo en V: Requisitos y pruebas
            q20: { answer: 'c', points: 1 }, // 3. Incremental: Funcionalidad completa
            q21: { answer: 'b', points: 1 }, // 4. Espiral: Gestión de riesgos
            q22: { answer: 'a', points: 1 }, // 5. Iterativo: Versión mejorada
            q23: { answer: 'b', points: 1 }, // 6. Prototipado: Aclarar requisitos
            q24: { answer: 'c', points: 1 }, // 7. DevOps: Desarrollo y operaciones
            q25: { answer: 'b', points: 1 }  // 8. Integración Continua: Probar código frecuente
        }
    },
    // CUESTIONARIO 5: RUP y Metodologías Ágiles (4 Preguntas / Max. 4 Puntos)
    'quiz-5': {
        maxScore: 4,
        questions: {
            q26: { answer: 'c', points: 1 }, // 1. RUP fases: 4
            q27: { answer: 'a', points: 1 }, // 2. Ágiles: ciclos cortos y revisables
            q28: { answer: 'd', points: 1 }, // 3. No es ágil: RUP
            q29: { answer: 'b', points: 1 }  // 4. RUP Construcción: Implementar y probar
        }
    }
};

// ==============================================
// 2. LÓGICA DE CORRECCIÓN (NO NECESITA MODIFICACIÓN)
// ==============================================

function checkQuiz(event) {
    event.preventDefault(); 
    
    const form = event.target;
    const formId = form.id; 
    
    if (!QUIZZES[formId]) return;

    const quizData = QUIZZES[formId];
    const formData = new FormData(form);
    let score = 0;
    let correctCount = 0;
    let totalQuestions = Object.keys(quizData.questions).length;

    for (const [questionId, data] of Object.entries(quizData.questions)) {
        const userAnswer = formData.get(questionId); 
        if (userAnswer === data.answer) {
            score += data.points;
            correctCount++;
        }
    }

    const percentage = (score / quizData.maxScore) * 100;
    
    // Asume que el div de resultados se llama 'results-X'
    const resultsDiv = document.getElementById(`results-${formId.split('-')[1]}`);
    
    if (!resultsDiv) return;

    resultsDiv.innerHTML = `
        <h2>✅ Resultados de ${formId.toUpperCase()} ✅</h2>
        <div class="result-summary">
            <p>Puntuación Total Obtenida: <strong>${score} / ${quizData.maxScore}</strong></p>
            <p>Aciertos: <strong>${correctCount}</strong> de ${totalQuestions} preguntas</p>
            <p>Porcentaje de Aciertos: <strong>${percentage.toFixed(2)}%</strong></p>
        </div>
    `;
    
    form.style.display = 'none';
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

// ==============================================
// 3. INICIALIZACIÓN (ASOCIAR LOS 5 FORMULARIOS)
// ==============================================

document.addEventListener('DOMContentLoaded', () => {
    // Itera sobre todos los IDs de los quizzes para asociar el evento y ocultar los resultados.
    for (let i = 1; i <= 5; i++) {
        const formId = `quiz-${i}`;
        const resultsId = `results-${i}`;
        
        const form = document.getElementById(formId);
        const resultsDiv = document.getElementById(resultsId);

        if (form) {
            form.addEventListener('submit', checkQuiz);
        }
        
        if (resultsDiv) {
            resultsDiv.style.display = 'none';
        }
    }
});