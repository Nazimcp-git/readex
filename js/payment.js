window.addEventListener('DOMContentLoaded', function () {
    const quantity = localStorage.getItem('quantity'); // Retrieve the value from local storage
    const unitPrice = 3950; // Unit price
    const totalPrice = unitPrice * quantity;
    if (quantity) {
        document.getElementById('price').innerHTML = `${totalPrice}`; // Display the value
    }
});

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCSerXZZtRlGb63GJd-HefhGfKDZnbjjJc",
  authDomain: "readex-8d80e.firebaseapp.com",
  databaseURL: "https://readex-8d80e-default-rtdb.firebaseio.com",
  projectId: "readex-8d80e",
  storageBucket: "readex-8d80e.firebasestorage.app",
  messagingSenderId: "127711263723",
  appId: "1:127711263723:web:02b1d63d5a7b371828f7ae",
  measurementId: "G-Q2Q59R8WRN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

document.getElementById('buynowbtn').onclick = function(e) {
    e.preventDefault(); // Prevent default form submission

    const quantity = localStorage.getItem('quantity'); // Retrieve the value from local storage
    const unitPrice = 3950; // Unit price
    const totalPrice = unitPrice * quantity;

    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var address = document.getElementById('address').value.trim();
    var pincode = document.getElementById('pincode').value.trim();
    var number = document.getElementById('number').value.trim();
    var country = document.getElementById('country').value.trim();
    var state = document.getElementById('state').value.trim();
    var productPrice = document.getElementById('price').innerHTML;

    if (name === '' || address === '' || number === ''|| email === '') {
        alert('Please fill in all the fields.');
        return;
    }

    var options = {
        "key": "rzp_live_hYulURwK7yq2ES", // Enter the Key ID generated from the Dashboard
        "amount": totalPrice * 100, // Amount is in currency subunits. Default currency is INR. Hence, 500 refers to 500 paise
        "currency": "INR",
        "name": "Readex Craft",
        "description": "Adjustable Quran Stand",
        "image": "https://readex.in/img/favicon.jpg",
        "handler": function(response) {
            alert("Payment Successful. Razorpay Payment ID: " + response.razorpay_payment_id);

            // Send data to Firebase
            var orderData = {
                name: name,
                email: email,
                pincode: pincode,
                address: address,
                number: number,
                country: country,
                state: state,
                payment_id: response.razorpay_payment_id,
                amount: productPrice
            };

            var newOrderKey = firebase.database().ref().child('orders').push().key;
            var updates = {};
            updates['/orders/' + newOrderKey] = orderData;
            firebase.database().ref().update(updates)
                .then(() => {
                    localStorage.setItem('status', 'yes');
                    window.location.href = '/succsess.html';
                })
                .catch((error) => {
                    alert('Error saving order details: ' + error.message);
                });
            
        },
        "prefill": {
            "name": name,
            "email": email,
            "contact": number
        },
        "notes": {
            "address": address
        },
        "theme": {
            "color": "#700000"
        }
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
}
