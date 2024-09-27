// ページロード時に画面の向きを確認する
window.addEventListener("orientationchange", function() {
    if (window.orientation === 0 || window.orientation === 180) {
      alert("横向きにしてください！このままゲームを進めるとエラーが発生します。 error code **1-001**");
    }
  });
  
  // ログインページへの遷移
  function goToLogin() {
    window.location.href = "login.html";
  }
  
  // 新規登録ページへの遷移
  function goToSignup() {
    window.location.href = "signup.html";
  }
  
//画面右上にユーザーネームを表示
const username = localStorage.getItem('loggedInUser');
if (username) {
    document.getElementById('username').textContent = 'ユーザー: ' + username;
} else {
    document.getElementById('username').textContent = 'ログインしていません';
}

//ログインしている際は表示するボタンを変更
document.addEventListener('DOMContentLoaded', () => {

    // localStorage からユーザーネームを取得
    const username = localStorage.getItem('loggedInUser');

    // ログイン状態かを確認
    if (username) {

        // ユーザーネームを表示
        document.getElementById('username').textContent = 'ユーザー: ' + username;

        // ログインとサインアップボタンを非表示に
        document.getElementById('login-button').style.display = 'none';
        document.getElementById('register-button').style.display = 'none';

        // "プレイ" ボタンを作成して表示
        const playButton = document.createElement('button');
        playButton.textContent = 'プレイ';
        playButton.className = 'btn';  // ボタンのスタイルを適用
        playButton.onclick = goToPlay; // ボタンが押された時の動作
        document.getElementById('login-area').appendChild(playButton);

    } else {

        // ユーザーネームがない場合は「ログインしていません」と表示

        document.getElementById('username').textContent = 'ログインしていません';

    }

});