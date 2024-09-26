const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const resetButton = document.getElementById('reset');
const bookingForm = document.getElementById('booking-form');
const moviePoster = document.getElementById('movie-poster');

let ticketPrice = +movieSelect.value;

// Update the total and seat count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Update the movie poster and price
function updateMovieDetails() {
    const selectedMovie = movieSelect.options[movieSelect.selectedIndex];
    ticketPrice = +selectedMovie.value;
    moviePoster.src = selectedMovie.dataset.image;
    updateSelectedCount();
}

// Movie select event
movieSelect.addEventListener('change', updateMovieDetails);

// Seat click event
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

// Reset seat selection
resetButton.addEventListener('click', () => {
    seats.forEach(seat => seat.classList.remove('selected'));
    count.innerText = 0;
    total.innerText = 0;
});

// Handle booking form submission
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent the form from submitting

    const selectedSeatsCount = document.querySelectorAll('.row .seat.selected').length;

    if (selectedSeatsCount === 0) {
        alert("Please select at least one seat to book.");
        return;
    }

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const movie = movieSelect.options[movieSelect.selectedIndex].text;
    const totalCost = selectedSeatsCount * ticketPrice;

    // Display a confirmation message
    alert(`Booking Confirmed!\nName: ${name}\nEmail: ${email}\nMovie: ${movie}\nSeats: ${selectedSeatsCount}\nTotal Price: $${totalCost}`);

    // Clear the form and seat selection after booking
    bookingForm.reset();
    seats.forEach(seat => seat.classList.remove('selected'));
    count.innerText = 0;
    total.innerText = 0;
});

// Initialize the movie details on page load
updateMovieDetails();
