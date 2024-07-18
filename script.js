const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
});


document.getElementById('buynow').addEventListener('click', function() {
    window.location.href = '/checkout.html';
});
