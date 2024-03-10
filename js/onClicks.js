document.getElementById("airclick").onclick = function() {
    let localDivs = document.getElementsByClassName("local");
    for (let i = 0; i < localDivs.length; i++) {
      localDivs[i].style.display = "flex";
    }
  }