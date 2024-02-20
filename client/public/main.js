// const thumbText = window.document.querySelectorAll('.no-like')
// const clickedLike = window.document.querySelectorAll('.liked')


// let popUp = window.document.querySelector('.aboutPopup')
// let about = window.document.querySelector('.aboutMenu')

// let addPop = window.document.querySelector('.addMovie')
let addLink = window.document.querySelector('.addLink')

// let theme = window.document.querySelector('#themeSwitch')

// theme.addEventListener('click',changeTheme)

// function changeTheme(){
//     window.document.querySelector('.fa-moon').classList.toggle('hide')
//     window.document.querySelector('.fa-sun').classList.toggle('hide')

//     const body = window.document.querySelector('body')
//     const searchBar = window.document.querySelector('.search')
//     const lightLogo = window.document.querySelector('.mainLogo')
//     const darkLogo = window.document.querySelector('.lightLogo')

//     Array.from(clickedLike).forEach((element)=>{
//         element.classList.toggle('light')
//     })
    
//     Array.from(thumbText).forEach((element)=>{
//         element.classList.toggle('light')
//     })
//     let counts= Array.from(window.document.querySelectorAll('.count'))
//     body.classList.toggle("dark-mode")
//     searchBar.classList.toggle("dark-mode")
//     // body.style.color= "#f7f7ed"
//     lightLogo.classList.toggle('hide')
//     darkLogo.classList.toggle("hide")
//     Atags.forEach(x=>x.classList.toggle("light"))
// }
// window.document.querySelector('.fa-moon').addEventListener('click',()=>{
//     localStorage.removeItem('site-theme')
//     changeTheme()
// })
// window.document.querySelector('.fa-sun').addEventListener('click',()=>{
//     localStorage.setItem('site-theme','light')
// })



// if(localStorage.getItem('site-theme')=='light'){
//     changeTheme()
// }

//modals

addLink.addEventListener('click',()=>{
    console.log("Asdfasf")
    window.document.getElementById("backdrop").style.display = "block"
    window.document.getElementById("exampleModal").style.display = "block"
    window.document.getElementById("exampleModal").classList.add("show")
})

window.document.querySelector("#closeModal").addEventListener('click',closeModal)

function closeModal(){
    window.document.getElementById("backdrop").style.display = "none"
    window.document.getElementById("exampleModal").style.display = "none"
    window.document.getElementById("exampleModal").classList.remove("show")
    window.document.getElementById("aboutBackdrop").style.display = "none"
    window.document.getElementById("aboutModal").style.display = "none"
    window.document.getElementById("aboutModal").classList.remove("show")
}
// Get the modal
const modal = window.document.getElementById('exampleModal');
// const aboutModal =window.document.getElementById('aboutModal');
    
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
    // if (event.target == modal || event.target == aboutModal ) {
        closeModal()
    }
}
//about Modal
// about.addEventListener('click',()=>{
//     window.document.getElementById("aboutBackdrop").style.display = "block"
//     window.document.getElementById("aboutModal").style.display = "block"
//     window.document.getElementById("aboutModal").classList.add("show")

// })

// window.document.querySelector("#closeAboutModal").addEventListener('click',closeModal)
