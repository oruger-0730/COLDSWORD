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
        .then(res => res.json())
        .then(res => {
            console.log(res);
            // sleep(1000);
            setTimeout(() => {
                if (res.status === 201) {
                    alert('アカウントが作成されました');
                    location.href = './login.html';
                }
                else {
                    alert(res.data.message);
                }
            }, 1000);
        })
        .catch(err => console.error(err));
}
