$("form").on("submit", (e) => {
  e.preventDefault();
  if ($("textarea").val()) {
    const li = document.createElement("li");
    $("li").text($("textarea").val());
    $("ul").prepend(li);
    $("textarea").val("").focus();
  }
});
