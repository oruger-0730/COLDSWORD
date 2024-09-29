if (localStorage.getItem('username') && localStorage.getItem('sessionID')) {
    location.href = './../';
}
function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    fetch('https://coldsword.jun-suzu.net/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    localStorage.setItem('username', username);
                    localStorage.setItem('sessionID', data.sessionID);
                    location.href = './../';
                });
            }
        })
}
