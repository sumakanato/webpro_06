"use strict";

let number = 0;
const bbs = document.querySelector("#bbs");

// 投稿処理
document.querySelector("#post").onclick = function () {
  const name = document.querySelector("#name").value;
  const message = document.querySelector("#message").value;

  const params = {
    method: "POST",
    body: "name=" + encodeURIComponent(name) + "&message=" + encodeURIComponent(message),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  fetch("/post", params)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error");
      }
      return response.json();
    })
    .then(() => {
      document.querySelector("#message").value = "";
    });
};

// 投稿チェック処理
document.querySelector("#check").onclick = function () {
  const params = {
    method: "POST",
    body: "",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  fetch("/check", params)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error");
      }
      return response.json();
    })
    .then((response) => {
      const value = response.number;
      if (number !== value) {
        const params = {
          method: "POST",
          body: "start=" + number,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };

        fetch("/read", params)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error");
            }
            return response.json();
          })
          .then((response) => {
            number += response.messages.length;
            response.messages.forEach((mes, index) => {
              displayPost(mes, index);
            });
          });
      }
    });
};

// 投稿を表示
function displayPost(mes, index) {
  const cover = document.createElement("div");
  cover.className = "cover";
  cover.dataset.id = index;

  const name_area = document.createElement("span");
  name_area.className = "name";
  name_area.innerText = mes.name;

  const mes_area = document.createElement("span");
  mes_area.className = "mes";
  mes_area.innerText = mes.message;

  const like_area = document.createElement("span");
  like_area.className = "likes";
  like_area.innerText = `: ${mes.likes}`;

  const like_btn = document.createElement("button");
  like_btn.className = "like";
  like_btn.innerText = "いいね";
  like_btn.onclick = function () {
    likePost(index, like_area);
  };

  const delete_btn = document.createElement("button");
  delete_btn.className = "delete";
  delete_btn.innerText = "削除";
  delete_btn.onclick = function () {
    deletePost(index);
  };

  const edit_btn = document.createElement("button");
  edit_btn.className = "edit";
  edit_btn.innerText = "編集";
  edit_btn.onclick = function () {
    const newMessage = prompt("新しいメッセージを入力してください", mes.message);
    if (newMessage) {
      editPost(index, newMessage, mes_area);
    }
  };

  cover.appendChild(name_area);
  cover.appendChild(mes_area);
  cover.appendChild(like_area);
  cover.appendChild(like_btn);
  cover.appendChild(edit_btn);
  cover.appendChild(delete_btn);
  bbs.appendChild(cover);
}

// 投稿削除
function deletePost(index) {
  const params = {
    method: "POST",
    body: "id=" + encodeURIComponent(index),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  fetch("/delete", params)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error");
      }
      return response.json();
    })
    .then(() => {
      location.reload(); // ページをリロードして投稿を更新
    });
}

// 投稿編集
function editPost(index, newMessage, mes_area) {
  const params = {
    method: "POST",
    body: "id=" + encodeURIComponent(index) + "&message=" + encodeURIComponent(newMessage),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  fetch("/edit", params)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error");
      }
      return response.json();
    })
    .then(() => {
      mes_area.innerText = newMessage; // 編集内容を即時反映
    });
}

// いいね処理
function likePost(index, like_area) {
  const params = {
    method: "POST",
    body: "id=" + encodeURIComponent(index),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  fetch("/like", params)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error");
      }
      return response.json();
    })
    .then((response) => {
      if (response.success) {
        like_area.innerText = `: ${response.likes}`;
      }
    });
}

// 投稿検索
document.querySelector("#search").onclick = function () {
  const keyword = document.querySelector("#searchKeyword").value;

  const params = {
    method: "POST",
    body: "keyword=" + encodeURIComponent(keyword),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  fetch("/search", params)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error");
      }
      return response.json();
    })
    .then((response) => {
      bbs.innerHTML = ""; // 検索結果を表示するためにクリア
      response.results.forEach((mes, index) => {
        displayPost(mes, index);
      });
    });
};