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
            console.log(res);
            return res.json();
        })
        .then(res => {
            console.log(res);
            if (res.status === 201) {
                alert('Account created successfully!');
                location.href = './../';
            }
            else {
                alert(res.message);
            }
        })
        .catch(err => console.error(err));
}
