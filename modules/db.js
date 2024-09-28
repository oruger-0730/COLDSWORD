const fs = require('fs');

class Database {
    constructor() {
        this.accountData = JSON.parse(fs.readFileSync('./db/account.json', 'utf8'));
        this.blacklistData = JSON.parse(fs.readFileSync('./db/blacklist.json', 'utf8'));
    }

    read(kind) {
        switch (kind) {
            case 'account':
                this.accountData = JSON.parse(fs.readFileSync('./db/account.json', 'utf8'));
            case 'blacklist':
                this.blacklistData = JSON.parse(fs.readFileSync('./db/blacklist.json', 'utf8'));

        }
    }

    write(kind) {
        switch (kind) {
            case 'account':
                fs.writeFileSync('./db/account.json', JSON.stringify(this.accountData, null, 4));
            case 'blacklist':
                fs.writeFileSync('./db/blacklist.json', JSON.stringify(this.blacklistData, null, 4));
        }
    }

    auth(username, sessionID) {
        if (this.accountData[username] && this.accountData[username].sessions.includes(sessionID)) {
            return true;
        }
        return false;
    }
}

module.exports = Database;
