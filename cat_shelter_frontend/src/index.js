document.addEventListener("DOMContentLoaded", () => {
    getCats();
    Cat.newCatForm()
 })

 function toggleHideDisplay(element) {
    if (element.style.display === "none") {
        element.style.display = "block"
    } else {
        element.style.display = "none"
    }
}