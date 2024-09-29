if (localStorage.getItem('username') && localStorage.getItem('sessionID')) {
    location.href = './../';
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
        .then(res => {
            if (res.status === 201) {
                res.json().then(data => {
                    alert('Account created successfully! Please log in.');
                    location.href = './../login/';
                });
            }
        })
}
