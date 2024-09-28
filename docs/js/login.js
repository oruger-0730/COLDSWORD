if (document.localStorage.getItem('username') && document.localStorage.getItem('sessionID')) {
    location.href = '../';
}
function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    fetch('https://coldsword.jun-suzu.net/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(res => res.json())
        .then(res => {
            if (res.status === 200) {
                localStorage.setItem('username', username);
                localStorage.setItem('sessionID', res.data.sessionID);
                location.href = '../';
            }
        })
        .catch(err => console.error(err));
}
