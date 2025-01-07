

```mermaid
sequenceDiagram
  autonumber
  participant Webブラウザ
  participant Webサーバ
  participant BBSクライアント
  participant BBSサーバ

  Webブラウザ ->> Webサーバ: Webページの取得
  Webサーバ ->> Webブラウザ: HTML, JS, CSS
  Webブラウザ ->> BBSクライアント: 起動

  BBSクライアント ->> BBSサーバ: Post(書き込み)
  BBSサーバ ->> BBSクライアント: 全書き込み数

  BBSクライアント ->> BBSサーバ: Read(読み込み)
  BBSサーバ ->> BBSクライアント: 掲示データ

  BBSクライアント ->> BBSサーバ: Check(新規チェック)
  BBSサーバ ->> BBSクライアント: 全書き込み数

  BBSクライアント ->> BBSサーバ: Edit(編集, id, newMessage)
  BBSサーバ ->> BBSクライアント: 編集成功レスポンス

  BBSクライアント ->> BBSサーバ: Delete(削除, id)
  BBSサーバ ->> BBSクライアント: 削除成功レスポンス

  BBSクライアント ->> BBSサーバ: Search(検索, keyword)
  BBSサーバ ->> BBSクライアント: 検索結果

  BBSクライアント ->> BBSサーバ: Like(いいね, id)
  BBSサーバ ->> BBSクライアント: 更新後のいいね数
  ```