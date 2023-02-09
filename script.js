const baseUrl =
  "https://forum-b278a-default-rtdb.europe-west1.firebasedatabase.app/";

let button = document.getElementById("button");
let oldMessages = document.getElementById("oldMessages");

button.addEventListener("click", (event) => {
  event.preventDefault();

  let forumPostOutput = document.getElementById("forumPostOutput");
  let inputUsername = document.getElementById("inputUsername").value;
  let inputTitle = document.getElementById("inputTitle").value;
  let inputComment = document.getElementById("inputComment").value;

  let postObj = {
    username: inputUsername,
    title: inputTitle,
    comment: inputComment,
  };

  const { username, title, comment } = postObj;
  forumPostOutput.innerHTML += `<p>${username} ${title} ${comment}</p>`;

  postForumComments(postObj);
  console.log(postObj);
});

getOldForumPosts();

async function postForumComments(obj) {
  const url = baseUrl + ".json";

  const init = {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await fetch(url, init);
  const data = await response.json();
}

async function getOldForumPosts() {
  const url = baseUrl + ".json";
  const response = await fetch(url);
  const data = await response.json();

  let objEntry = Object.entries(data);
  objEntry.forEach((ele) => {
    oldMessages.innerHTML += `
    <p>${ele[1].username}</br> 
    ${ele[1].title}</br> 
    ${ele[1].comment}</p> `;
  });
}
