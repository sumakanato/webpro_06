const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

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
  let judgement = '';
  if (hand == cpu) {
    judgement = '引き分け';
  } else if (
    (hand == 'グー' && cpu == 'チョキ') ||
    (hand == 'チョキ' && cpu == 'パー') ||
    (hand == 'パー' && cpu == 'グー')
  ) {
    judgement = '勝ち';
    win += 1;
  } else {
    judgement = '負け';
  }
  
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

let num = Math.floor( Math.random() * 100 + 1 );

app.get("/high", (req, res) => {
  let hand = req.query.hand;
  let good = Number( req.query.good );
  let total = Number( req.query.total );
  console.log( {hand});

  let judgement = '';
      if (hand == num) {
    judgement = 'ピッタリ！';
    good +=1;
    num = Math.floor( Math.random() * 100 + 1 );
    
  } else if (
    hand > num
  ) {
    judgement = 'その数より低いです！';
  } else if (
    hand < num
  ){
    judgement = 'その数より高いです！';
  }
  

  total += 1;
  
  const display = {
    your: hand,
    num: num,
    judgement: judgement,
    good: good,
    total: total
  }
  res.render( 'high', display );
});

app.get("/unn", (req, res) => {
  const value = req.query.radio;
  console.log( {value});
  const e = Math.floor( Math.random() * 5 + 1 );

  const a = Math.floor( Math.random() * 5 + 1 );

  const b = Math.floor( Math.random() * 5 + 1 );
 
  const c = Math.floor( Math.random() * 5 + 1 );
  
  const d = Math.floor( Math.random() * 5 + 1 );

  const f = Math.floor( Math.random() * 5 + 1 );
  let cpu = '';
  if( f==1 ) cpu = 'グミ';
  else if( f==2 ) cpu = 'メガネ';
  else if( f==3 ) cpu = '折りたたみ傘';
  else if( f==4 ) cpu = 'ノート';
  else cpu = 'お守り';

  let judgement = '';
  let imi = '';
  if (e + a + b + c + d <= 10) { 
    judgement = '凶';
    imi = 'とても運が悪いです．気を付けて過ごそう！';
  } else if (e + a + b + c + d <= 15) {
    judgement = '末吉';
    imi = 'そこそこです．何もありません'
  } else if (e + a + b + c + d <= 18) {
    judgement = '小吉';
    imi = '普通です．いつもどおりです'
  }  else if (e + a + b + c + d <= 21) {
    judgement = '中吉';
    imi = '結構良いです．なにか良いことがあるかも！？'
  }  else if (e + a + b + c + d <= 25) {
    judgement = '大吉';
    imi = 'とても運がいいです．なにか良いことがあるでしょう！'
  }  
  
  const display = {
    a: a,
    b: b,
    c: c,
    d: d,
    e: e,
    f: f,
    cpu: cpu,
    judgement: judgement,
    imi: imi,
  }
  res.render( 'unn', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));