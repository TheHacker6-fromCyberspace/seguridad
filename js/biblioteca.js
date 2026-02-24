/**
 * Biblioteca.js - Lógica del catálogo y reservas
 */

document.addEventListener('DOMContentLoaded', () => {
    // Cargar recomendaciones iniciales
    loadRecommendations();
});

function searchCatalog() {
    const query = document.getElementById('searchQuery').value;
    const resultsContainer = document.getElementById('searchResults');

    // Usar ServiceManager (simulado)
    const books = window.serviceManager.searchBooks(query);

    if (books.length === 0) {
        resultsContainer.innerHTML = '<p>No se encontraron libros.</p>';
        return;
    }

    resultsContainer.innerHTML = books.map(book => `
        <div class="book-card">
            <div>
                <h4 style="margin: 0; color: #2c3e50;">${book.title}</h4>
                <p style="margin: 5px 0 0; color: #7f8c8d; font-size: 0.9rem;">
                    <i class="fas fa-user"></i> ${book.author} &bull; 
                    <span style="background: #eef2f3; padding: 2px 8px; border-radius: 4px;">${book.category}</span>
                </p>
            </div>
            <button class="btn btn-secondary" onclick="reserveBook('${book.id}', '${book.title}')" style="padding: 5px 15px; font-size: 0.9rem;">
                Reservar
            </button>
        </div>
    `).join('');
}

function reserveBook(id, title) {
    const studentName = prompt("Para reservar '" + title + "', por favor ingresa tu nombre:");
    if (studentName) {
        window.serviceManager.reserveBook({
            bookId: id,
            bookTitle: title,
            studentName: studentName
        });
        alert(`✅ Libro reservado exitosamente. Puedes recogerlo en la biblioteca.`);
    }
}

function loadRecommendations() {
    // Simulación de recomendación básica
    const recommendations = [
        "100 Años de Soledad - Realismo Mágico",
        "Hábitos Atómicos - Desarrollo Personal",
        "Brevísima Historia del Tiempo - Ciencias"
    ];

    const list = document.getElementById('aiBookRecommendations');
    if (list) {
        list.innerHTML = recommendations.map(r => `<li>${r}</li>`).join('');
    }
}
