function navLinksFn() {
    const navLinks = document.querySelectorAll("#nav-list > a");
    console.log(navLinks);
    
    navLinks.forEach(link => {
        link.addEventListener("click",() => {
            navLinks.forEach(link => link.classList.remove('actived'))
            link.classList.add('actived')
            console.log(link.classList); 
        })
    })
}