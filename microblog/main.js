const max = 140;

const load = () => {
    const json = localStorage.getItem('items');
    return JSON.parse(json) || [];
}
const save = () => {
    localStorage.setItem('items', JSON.stringify(items));
}
const clearStorage = () => {
    localStorage.removeItem('items');
    items.length = 0;
    setItems();
}
const addItem = (item) => {
    items.unshift(item);
    save();
}
const setItems = () => {
    const ul = document.querySelector("ul");
    ul.innerHTML = "";
    items.forEach(item => createListItem(item, ul));
}
const createListItem = (item, ul) => {
    const li = document.createElement("li");
    li.textContent = escapeHtml(item.body);
    const dateDiv = document.createElement("div");
    const date = new Date(item.datetime).toLocaleString('ja-JP');
    dateDiv.textContent = date;
    dateDiv.classList.add("date");
    li.appendChild(dateDiv);
    ul.appendChild(li);
}
const escapeHtml = (str) => {
    return str.replace(/&/g, '&amp;')
              .replace(/>/g, '&gt;')
              .replace(/</g, '&lt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#x27;')
              .replace(/`/g, '&#x60;');
}

const items = load();
setItems();

document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    const textarea = document.querySelector("textarea");
    if (textarea.value.length > max) {
        alert(max + "文字以内で入力してください");
        textarea.focus();
    } else if (textarea.value) {
        const item = {
            body: textarea.value,
            datetime: new Date(),
        }
        addItem(item);
        setItems();
        textarea.value = "";
        textarea.focus();
    }
});
document.querySelector("textarea").addEventListener("input", function () {
    const textCount = document.querySelector("#text-count");
    const color = this.value.length > max ? "orange" : "#555";
    textCount.textContent = this.value.length;
    textCount.style.color = color;
});
