# slack-emoji-monitor

## 概要

Slack の絵文字に更新があった場合に、特定のチャンネルに通知を行う Slack アプリです

## 通知対象

> A custom emoji has been added or changed

※https://api.slack.com/future/triggers/event#supported-events

## 使用方法

### Deploy & Create Triggers

```
slack deploy
slack triggers create --trigger-def ./triggers/emoji_changed.ts
```

### Set Environment Variables

```
slack env add NOTIFY_CHANNEL_ID [CHANNEL_ID_TO_NOTIFY]
```

## 開発手順

1. VS Code 起動
2. `.env` というファイル名で新規ファイルを作成
   - 以下の内容を記載（ **値は適切なものに変更すること** ）
     ```
     NOTIFY_CHANNEL_ID=C123ABC456
     ```
3. 左下の緑色のアイコンクリック
4. 「Remote-Containersa: Reopen in Container」クリック
5. しばらく待つ
   - 初回の場合コンテナー image の取得や作成が行われる
6. 起動したら開発可能

## その他

- lint
  - `deno lint`
- unittest
  - `deno test`
