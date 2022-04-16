const max = 140;

const load = () => {
  const json = localStorage.getItem('items');
  return JSON.parse(json) || [];
}
const save = () => {
  localStorage.setItem('items', JSON.stringify(items));
}
const clear = () => {
  localStorage.removeItem('items');
  items.length = 0;
  setItems();
}
const addItem = (item) => {
  items.unshift(item);
  save();
}
const setItems = () => {
  $("ul").text("");
  items.forEach(item => createListItem(item));
}
const createListItem = (item) => {
  let html = '<li>' + escapeHtml(item.body);
  const date = new Date(item.datetime).toLocaleString('ja-JP');
  html += '<div class="date">' + date + '</div></li>';
  $("ul").append(html);
}
const escapeHtml = (str) => {
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/"/g, '&quot;');
  str = str.replace(/'/g, '&#x27;');
  str = str.replace(/`/g, '&#x60;');
  return str;
}

const items = load();
setItems();

$("form").on("submit", function (e) {
  e.preventDefault();
  if ($("textarea").val().length > max) {
    alert(max + "文字以内で入力してください");
    $("textarea").focus();
  } else if ($("textarea").val()) {
    const item = {
      body: $("textarea").val(),
      datetime: new Date(),
    }
    addItem(item);
    setItems();
    $("textarea").val("").focus();
  }
});
$("textarea").on("keyup blur focus", function () {
  const color = $("textarea").val().length > max ? "orange" : "#555";
  $("#text-count").text($(this).val().length).css({color: color});
});
