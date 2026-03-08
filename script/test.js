//console.log("test functionality coming");

document.getElementById("sign-btn").addEventListener("click", function(event) {
     event.preventDefault(); // stop form reload

    const nameInput = document.getElementById("username");
    const contactName = nameInput.value;

    console.log(contactName);

    const password=document.getElementById("password");
    const pin=password.value;
    console.log(pin);

    if(contactName=="admin" && pin=="admin123"){
        alert("signin successful");

        window.location.replace("/home.html");

    }else{
        alert("signin failed");
        return;
    }

});