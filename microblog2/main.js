const form = document.querySelector("form");
const textarea = document.querySelector("textarea");
const ul = document.querySelector("ul");
const textCount = document.querySelector("#text-count");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const body = textarea.value;
  textarea.value = "";
  textCount.innerHTML = "";
  createItem(body);
  textarea.focus();
});
textarea.addEventListener("keyup", function () {
  textCount.innerHTML = this.value.length;
});

function createItem(body) {
  const li = document.createElement("li");
  li.append(escapeHtml(body));
  li.append(createDate());
  ul.prepend(li);
}
function createDate() {
  const div = document.createElement("div");
  div.className = "date";
  const date = new Date();
  div.innerHTML = date.toLocaleString('ja-JP');
  return div;
}
function escapeHtml(str){
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/"/g, '&quot;');
  str = str.replace(/'/g, '&#x27;');
  str = str.replace(/`/g, '&#x60;');
  return str;
}
