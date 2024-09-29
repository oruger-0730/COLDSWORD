//画面右上にユーザーネームを表示
const username = localStorage.getItem('loggedInUser');

if (username) {
    document.getElementById('username').textContent = 'ユーザー: ' + username;
} else {
    document.getElementById('username').textContent = 'ログインしていません';
}
