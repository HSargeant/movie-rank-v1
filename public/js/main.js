const thumbText = document.querySelectorAll('.no-like')
const clickedLike = document.querySelectorAll('.liked')
let about = document.querySelector('.aboutMenu')
let addLink = document.querySelector('.addLink')
let theme = document.querySelector('#themeSwitch')
theme.addEventListener('click',changeTheme)
function changeTheme(){
    document.querySelector('.fa-moon').classList.toggle('hide')
    document.querySelector('.fa-sun').classList.toggle('hide')
    const body = document.querySelector('body')
    const lightLogo = document.querySelector('.mainLogo')
    const darkLogo = document.querySelector('.lightLogo')
    const searchBar = document.querySelector('.search')
    Array.from(thumbText).forEach((element)=>{
        element.classList.toggle('light')
    })
    let counts= Array.from(document.querySelectorAll('.count'))
    body.classList.toggle("dark-mode")
    lightLogo.classList.toggle('hide')
    darkLogo.classList.toggle("hide") 
    document.querySelectorAll('a').forEach(x=>x.classList.toggle('light'))
    counts.forEach(x=>{
        x.classList.toggle('light')
     })
     if(window.location.pathname=="/home") searchBar.classList.toggle("dark-mode")
}
document.querySelector('.fa-moon').addEventListener('click',()=>{
    localStorage.removeItem('site-theme')
    changeTheme()
})
document.querySelector('.fa-sun').addEventListener('click',()=>{
    localStorage.setItem('site-theme','light')
})
if(localStorage.getItem('site-theme')=='light'){
    changeTheme()
}
// Filter Movies
if(window.location.pathname=="/home"){
    let input = document.querySelector('#search')
    input.addEventListener('keyup',filterCards)

    function filterCards(){
    let section=document.querySelectorAll('.card')
    let txtValue;
    let filter = input.value.toUpperCase();
    let h2 = document.querySelectorAll('h2')
    for (i = 0; i < h2.length; i++) {
        txtValue=h2[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
        section[i].style.display = "";
        } else {
            section[i].style.display = "none";
        }
    }
    }
}
//modals
addLink.addEventListener('click',()=>{
    console.log("click")
    document.getElementById("backdrop").style.display = "block"
    document.getElementById("exampleModal").style.display = "block"
    document.getElementById("exampleModal").classList.add("show")
})
document.querySelector("#closeModal").addEventListener('click',closeModal)
function closeModal(){
    document.getElementById("backdrop").style.display = "none"
    document.getElementById("exampleModal").style.display = "none"
    document.getElementById("exampleModal").classList.remove("show")
    document.getElementById("aboutBackdrop").style.display = "none"
    document.getElementById("aboutModal").style.display = "none"
    document.getElementById("aboutModal").classList.remove("show")
}
// Get the modal
const modal = document.getElementById('exampleModal');
const aboutModal =document.getElementById('aboutModal');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal || event.target == aboutModal ) {
        closeModal()
    }
}
//about Modal
about.addEventListener('click',()=>{
    document.getElementById("aboutBackdrop").style.display = "block"
    document.getElementById("aboutModal").style.display = "block"
    document.getElementById("aboutModal").classList.add("show")
})
document.querySelector("#closeAboutModal").addEventListener('click',closeModal)
document.querySelector('.logout').addEventListener('click',()=>{
    document.querySelector('#logoutForm').submit()
})