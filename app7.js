"use strict";
const express = require("express");
const app = express();

let bbs = [];  // 本来はDBMSを使用するが，今回はこの変数にデータを蓄える

app.use(express.json());

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  let judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/get_test", (req, res) => {
  res.json({
    answer: 0
  })
});

app.get("/add", (req, res) => {
  console.log("GET");
  console.log( req.query );
  const num1 = Number( req.query.num1 );
  const num2 = Number( req.query.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

app.post("/add", (req, res) => {
  console.log("POST");
  console.log( req.body );
  const num1 = Number( req.body.num1 );
  const num2 = Number( req.body.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

// これより下はBBS関係
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

// 投稿数を確認
app.post("/check", (req, res) => {
  res.json({ number: bbs.length });
});

// 投稿を読み取る
app.post("/read", (req, res) => {
  const start = Number(req.body.start);
  if (start === 0) {
    res.json({ messages: bbs });
  } else {
    res.json({ messages: bbs.slice(start) });
  }
});

// 新しい投稿を作成
app.post("/post", (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  bbs.push({ name: name, message: message, likes: 0 }); 
  res.json({ number: bbs.length });
});

// 投稿を編集
app.post("/edit", (req, res) => {
  const id = Number(req.body.id);
  const newMessage = req.body.message;

  if (id < 0 || id >= bbs.length) {
    res.status(404).json({ success: false, message: "Post not found" });
    return;
  }

  bbs[id].message = newMessage;
  res.json({ success: true, message: "Post updated successfully" });
});

// 投稿を削除
app.post("/delete", (req, res) => {
  const id = Number(req.body.id);
  if (id < 0 || id >= bbs.length) {
    res.status(404).json({ success: false, message: "Post not found" });
    return;
  }

  bbs.splice(id, 1);
  res.json({ success: true, message: "Post deleted successfully" });
});

// 投稿を検索
app.post("/search", (req, res) => {
  const keyword = req.body.keyword.toLowerCase();
  const results = bbs.filter(
    (post) =>
      post.name.toLowerCase().includes(keyword) ||
      post.message.toLowerCase().includes(keyword)
  );
  res.json({ results });
});

// いいねを増加
app.post("/like", (req, res) => {
  const id = Number(req.body.id);

  if (id < 0 || id >= bbs.length) {
    res.status(404).json({ success: false, message: "Post not found" });
    return;
  }

  bbs[id].likes += 1;
  res.json({ success: true, likes: bbs[id].likes });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));