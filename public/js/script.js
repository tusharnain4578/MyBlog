function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

let themeSwitch = document.querySelector("#flexSwitchCheckDefault");

let nav = document.querySelector("NAV");
let card = document.querySelectorAll(".card");
let inputs = document.querySelectorAll(".inputs");
function tswitch() {
  if (this.checked == true) {
    nav.classList.replace("bg-light", "bg-dark");
    nav.classList.replace("navbar-light", "navbar-dark");
    document.querySelector(".themeText").classList.replace("text-dark", "text-light");

    for (let i = 0; i < document.querySelectorAll(".themeT").length; i++) {
      document.querySelectorAll(".themeT")[i].classList.replace("text-dark", "text-light");
    }
    document.body.style.backgroundColor = "#495057";
    for (let i = 0; i < card.length; i++) {
      card[i].style.backgroundColor = "#212529";
      card[i].style.color = "#FFFFFF";
    }
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style.backgroundColor = "#212529";
      inputs[i].style.color = "#FFFFFF";
    }

    setCookie("darkmode", "on", 1000);
  } else {
    nav.classList.replace("bg-dark", "bg-light");
    nav.classList.replace("navbar-dark", "navbar-light");
    document.querySelector(".themeText").classList.replace("text-light", "text-dark");
    for (let i = 0; i < document.querySelectorAll(".themeT").length; i++) {
      document.querySelectorAll(".themeT")[i].classList.replace("text-light", "text-dark");
    }
    document.body.style.backgroundColor = "#FFFFFF";
    for (let i = 0; i < card.length; i++) {
      card[i].style.backgroundColor = "#FFFFFF";
      card[i].style.color = "#000000";
    }
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style.backgroundColor = "#FFFFFF";
      inputs[i].style.color = "#000000";
    }

    setCookie("darkmode", "off", 1000);
  }
}

themeSwitch.addEventListener("click", tswitch);
if (document.cookie == "darkmode=on") {
  themeSwitch.click();
}
