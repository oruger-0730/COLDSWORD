let username = localStorage.getItem('username');
let sessionID = localStorage.getItem('sessionID');
if (username && sessionID) {
    fetch('https://coldsword.jun-suzu.net/auth-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, sessionID })
    })
        .then(res => res.json())
        .then(data => {
        if (data.status === 200)
            alert(data.message);
        else
            alert(data.message);
    })
        .catch(err => console.error(err));
}
else {
    location.href = './../login';//TODO: ログインページのURLに変更
}
