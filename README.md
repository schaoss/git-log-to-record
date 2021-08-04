# Git Log To Record
> env: Node.js >14

依據 git log 資訊及 JIRA API，將過往一段時間內帶有 JIRA issue tag 的 commit，整理成帶有連結的 markdown 無序清單。

## 安裝

- 參考 `.env.example` 的格式建立 `.env`
- 執行指令：
```sh
$ npm i
```

## 使用

- 執行指令：
```sh
$ npm run start
```

- 執行結束後，結果會產出在 `.env` 中指定的 `FILE_NAME` 檔案內：
```md
Complete the following issues:
- [[ISSUE-124] Add Button In Navbar ](link/to/ISSUE-124)
- [[ISSUE-126] Fix Minor Bugs ](link/to/ISSUE-126)
...
```

