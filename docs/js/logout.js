function logout() {
    let username = localStorage.getItem('username');
    let sessionID = localStorage.getItem('sessionID');
    if (!username || !sessionID) return;
    fetch('https://coldsword.jun-suzu.net/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, sessionID })
    })
        .then(res => res.json())
        .then(res => {
            localStorage.removeItem('username');
            localStorage.removeItem('sessionID');
            location.href = './../login/';
        })
        .catch(err => console.error(err));
}
