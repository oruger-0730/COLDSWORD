const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// JSONデータをパースするためのミドルウェア
app.use(bodyParser.json());

// 静的ファイルの提供
app.use(express.static("public"));

// ルートエンドポイント (GET /)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"), (err) => {
    if (err) {
      console.error(`エラーページの読み込み時にエラーが発生しました。${err}`);
      res.status(err.status).end();
    }
  });
});

// アカウント作成用の POST エンドポイント
app.post("/create-account", (req, res) => {
  const newAccount = req.body;
  const accountsFilePath = path.join(__dirname, "public", "account.json");

  // バリデーション
  if (newAccount.password.length < 6) {
    return res
      .status(400)
      .json("パスワードは6文字以上にしてください。error code *2-001*");
  }
  if (newAccount.password.includes(newAccount.nickname)) {
    return res
      .status(400)
      .json("パスワードにアカウント名を含めないでください。error code *2-002*");
  }
  if (!/[a-z]/.test(newAccount.password) || !/\d/.test(newAccount.password)) {
    return res
      .status(400)
      .json("パスワードには数字と小文字を含めてください。error code *2-003*");
  }

  fs.readFile(accountsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(
        `アカウントデータの読み込み時にエラーが発生しました。${err}`
      );
      return res
        .status(500)
        .json("アカウントデータの読み込みに失敗しました。error code *2-004*");
    }

    let accounts = [];
    if (data) {
      accounts = JSON.parse(data);
    }

    // アカウント名の重複チェック
    const existingAccount = accounts.find(
      (acc) => acc.nickname === newAccount.nickname
    );
    if (existingAccount) {
      return res
        .status(400)
        .json("このアカウント名は既に使用されています。error code *2-005*");
    }

    accounts.push(newAccount);

    fs.writeFile(accountsFilePath, JSON.stringify(accounts, null, 2), (err) => {
      if (err) {
        console.error(`アカウント作成時にエラーが発生しました。${err}`);
        return res
          .status(500)
          .json("アカウントデータの保存に失敗しました。error code *2-006*");
      }
      res.status(200).json({ message: "アカウント作成に成功しました。" });
    });
  });
});

//ログインリクエスト
app.post('/login', async (req, res) => {
    const { nickname, password } = req.body;
    try {
        const data = await fs.promises.readFile('public/account.json', 'utf8');
        const accounts = JSON.parse(data);
        const account = accounts.find(acc => acc.nickname === nickname);

        if (account && account.password === password) {
            return res.status(200);
        } else {
            return res.status(401).json({ message: 'ニックネームまたはパスワードが違います' });
        }
    } catch (error) {
        console.error(`アカウントデータの読み込み中にエラーが発生しました: ${error}`);
        res.status(500).json({ message: '予期せぬエラーが発生しました' });
    }
});

// サーバーの起動
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
