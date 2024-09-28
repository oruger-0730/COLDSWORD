const { stat } = require('fs');
const Database = require('../db');
const db = new Database();
module.exports = function (url, data, ipadr) {
    if (url === '/create-account') {
        const { username, password } = data;
        // trivia: upper,lower,number 10 char will be hacked in 7 months
        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) return { status: 400, data: { message: 'パスワードは大文字、小文字、数字を含む必要があります' } };
        if (password.length < 10) return { status: 400, data: { message: 'パスワードは10文字以上である必要があります' } };
        if (password.includes(username)) return { status: 400, data: { message: 'パスワードにユーザー名を含めることはできません' } };
        db.read('account');
        if (db.accountData[username]) return { status: 409, data: { message: 'ユーザー名が既に存在します' } };
        db.accountData[username] = { password, sessions: {} };
        db.write('account');
        return { message: 'アカウントが作成されました', status: 201 };
    }
    else if (url === '/login') {
        const { username, password } = data;
        db.read('account');
        // trivia: which username or password is wrong? we should not tell the user
        if (!db.accountData[username] || db.accountData[username].password !== password) return { status: 401, data: { message: 'ユーザー名またはパスワードが間違っています' } };
        let sessionID = Math.random().toString(36).substr(10);
        db.accountData[username].sessions[sessionID] = { "ipAddress": ipadr, "time": new Date().toISOString() };
        db.write('account');
        return { status: 200, data: { message: 'ログインに成功しました', sessionID } };
    }
    else if (url === '/auth-session') {
        const { username, sessionID } = data;
        db.read('account');
        if (db.auth(username, sessionID)) return { status: 200, data: { message: '認証に成功しました' } };
        return { status: 401, data: { message: '認証に失敗しました' } };
    }
    else if (url === '/logout') {
        const { username, sessionID } = data;
        db.read('account');
        if (db.auth(username, sessionID)) {
            delete db.accountData[username].sessions[sessionID];
            db.write('account');
            return { status: 200, data: { message: 'ログアウトしました' } };
        }
        return { status: 401, data: { message: '認証に失敗しました' } };
    }
    return { message: 'POST method is not implemented' };
}
