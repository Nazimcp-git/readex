const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');
const Links = document.querySelector('.links');

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
});


document.getElementById('buynow').addEventListener('click', function() {
    window.location.href = '/product.html';
});
document.getElementById('buynow1').addEventListener('click', function() {
    window.location.href = '/product.html';
});


function close1() {
    Links.classList.add("close-animation");
    setTimeout(()=>{
        navbarLinks.classList.remove('active');
        Links.classList.remove("close-animation");
    },400);
}
