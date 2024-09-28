// ページロード時に画面の向きを確認する
window.addEventListener("orientationchange", function () {
    if (window.orientation === 0 || window.orientation === 180 || (window.innerHeight > window.innerWidth)) {
        alert("横向きにしてください！このままゲームを進めるとエラーが発生します。 error code **1-001**");
    }
});
