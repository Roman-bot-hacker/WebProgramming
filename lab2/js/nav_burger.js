function nav_burger_click() {
    if (document.getElementById("nav_menu").style.display === "none") {
        document.getElementById("nav_menu").style.display = "inline-block";
    }
    else {document.getElementById("nav_menu").style.display = "none";}
}