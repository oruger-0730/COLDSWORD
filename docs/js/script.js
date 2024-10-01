let username = localStorage.getItem('username');
if (username) {
    // iconimage url
    document.getElementById('userIcon').src = "./../img/user-icon/" + username + ".png";
    document.getElementById('userName').innerText = username;
    document.getElementById('loginButton').style.display = 'none';
    document.getElementById('registerButton').style.display = 'none';
}
