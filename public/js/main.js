let h2s = Array.from(document.querySelectorAll('h2'))
let storage = Object.keys(localStorage)

h2s.forEach((x,i)=>{
    if(storage.includes(x.innerText)){
        // h2s[i].parentNode.parentNode.childNodes[5].childNodes[3].style.color = '#333'
        h2s[i].parentNode.parentNode.childNodes[5].childNodes[3].classList.add('liked')
        h2s[i].parentNode.parentNode.childNodes[5].childNodes[3].classList.remove('no-like')
    }
})

const thumbText = document.querySelectorAll('.no-like')
const deleteText = document.querySelectorAll('.fa-trash')
const clickedLike = document.querySelectorAll('.liked')

Array.from(clickedLike).forEach((element)=>{
    element.addEventListener('click',removeLike)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteMovie)
})

async function addLike(){

    const movieName =this.parentNode.parentNode.childNodes[1].innerText.trim()
    const moviePoster = this.parentNode.parentNode.parentNode.childNodes[3].src.trim()
    const releaseYear = this.parentNode.parentNode.childNodes[3].innerText.trim()
    const currentlikes = Number(this.parentNode.childNodes[1].innerText.trim())

    try{
        const response = await fetch('/addOneLike', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'movieName': movieName,
              'moviePoster': moviePoster,
              'releaseYear': releaseYear,
              'currentLikes': currentlikes
            })
        })
        const data = await response.json()
        // console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
    // store likes
    localStorage.setItem(movieName,"liked")
}

async function removeLike(){

    const movieName =this.parentNode.parentNode.childNodes[1].innerText.trim()
    const moviePoster = this.parentNode.parentNode.parentNode.childNodes[3].src.trim()
    const releaseYear = this.parentNode.parentNode.childNodes[3].innerText.trim()
    const currentlikes = Number(this.parentNode.childNodes[1].innerText.trim())

    if(currentlikes ==0){
        return
    }

    try{
        const response = await fetch('/home/removeLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'movieName': movieName,
              'moviePoster': moviePoster,
              'releaseYear': releaseYear,
              'currentLikes': currentlikes
            })
        })
        const data = await response.json()
        // console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
    // remove like from storage
    localStorage.removeItem(movieName)
}

//delete movie



// let popUp = document.querySelector('.aboutPopup')
let about = document.querySelector('.aboutMenu')
// let login = document.querySelector('.login')

// let addPop = document.querySelector('.addMovie')
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

    Array.from(clickedLike).forEach((element)=>{
        element.classList.toggle('light')
    })
    
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
     searchBar.classList.toggle("dark-mode")

}

document.querySelector('#themeSwitchDark').addEventListener('click',switchDark)
function switchDark(){
    // document.querySelector('.fa-moon').classList.toggle('hide')
    // document.querySelector('.fa-sun').classList.toggle('hide')
    // localStorage.setItem('current theme','dark')
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

//modals

addLink.addEventListener('click',()=>{
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