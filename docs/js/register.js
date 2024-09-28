if (localStorage.getItem('username') && localStorage.getItem('sessionID')) {
    location.href = '../';
}
function register() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let birthday = document.getElementById('dob').value;
    fetch('https://coldsword.jun-suzu.net/create-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, birthday })
    })
        .then(res => res.json())
        .then(res => {
            if (res.status === 201) {
                localStorage.setItem('username', username);
                localStorage.setItem('sessionID', res.data.sessionID);
                location.href = '../';
            }
            else
                alert(res.data.message);
        })
        .catch(err => console.error(err));
}
