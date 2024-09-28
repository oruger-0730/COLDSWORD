function register(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    fetch('https://coldsword.jun-suzu.net/auth-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(res => res.json())
        .then(res => {
        if (res.status === 200) {
            localStorage.setItem('username', username);
            localStorage.setItem('sessionID', data.data.sessionID);
            location.href = '../';
        }
        else
            alert(res.data.message);
    })
        .catch(err => console.error(err));
}
