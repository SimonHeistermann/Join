function init() {
  console.log("test");
}

function openNav() {
  document.getElementById("popup").style.display = "block";
  document.getElementById("overlay_popup").style.display = "block";
  console.log("Hello World");
}

function closeNav() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("overlay_popup").style.display = "none";
}

function openpopup() {
  document.getElementById("popup_card").style.display = "block";

  console.log("Hello World");
  document.getElementById("cover_all").style.display = "block";
}

function closepopup() {
  document.getElementById("popup_card").style.display = "none";
  document.getElementById("cover_all").style.display = "none";
}

function popupTodo() {
  let popupConten = document.getElementById("create_popup");
}
