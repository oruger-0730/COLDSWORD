const Database = require('../db');
const db = new Database();
module.exports = function (url, data, ipadr) {
    if (url === '/delete-account') {
        const { username, sessionID } = data;
        db.read('account');
        if (!db.auth(username, sessionID)) return { status: 401, data: { message: '認証に失敗しました' } };
        delete db.accountData[username];
        db.write('account');
        return { status: 200, data: { message: 'アカウントが削除されました' } };
    }
    return { message: 'DELETE method is not implemented' };
}
