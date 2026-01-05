const navLinks = document.querySelectorAll("#task-nav-list > a");
// console.dir(navLinks);

// old
navLinks.forEach(navLink => {
    navLink.addEventListener("click", (e)=> {
        e.preventDefault()
        navLinks.forEach(navLink => navLink.classList.remove("actived"))
        console.log("hii")
        e.target.classList.add("actived")
    })
});