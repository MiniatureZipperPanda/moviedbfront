function authenticateUser() {
    let username = id_username.value
    let password = id_password.value
    let data = {
        "username": username,
        "password": password
    }
    let options = {
        method: "POST",
        headers: { 'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(data)
    }
    fetch(`http://127.0.0.1:8000/api/v1/accounts/token`, options)
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("token", data.token)
            window.location.href = "home.html"

        })
    
}
