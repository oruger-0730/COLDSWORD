// ページロード時に画面の向きを確認する
window.addEventListener("orientationchange", function () {
    if (window.orientation === 0 || window.orientation === 180 || (window.innerHeight > window.innerWidth)) {
        alert("横向きにしてください！このままゲームを進めるとエラーが発生します。 error code **1-001**");
    }
});
let username = localStorage.getItem('username');
if (username) {
    // iconimage url
    document.getElementById('userIcon').src = "../img/user-icon/" + username + ".png";
    document.getElementById('userName').innerText = username;
    document.getElementById('loginButton').style.display = 'none';
    document.getElementById('registerButton').style.display = 'none';
}
