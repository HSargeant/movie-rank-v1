let h2s = Array.from(document.querySelectorAll('h2'))
let storage = Object.keys(localStorage)

h2s.forEach((x,i)=>{
    if(storage.includes(x.innerText)){
        h2s[i].parentNode.parentNode.childNodes[5].childNodes[3].style.color = '#333'
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

    const movieName =this.parentNode.parentNode.childNodes[1].innerText
    const currentlikes = Number(this.parentNode.childNodes[1].innerText)
    console.log(movieName,currentlikes)
    // store likes
    localStorage.setItem(movieName,"liked")

    try{
        const response = await fetch('/addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'movieName': movieName,
              'currentLikes': currentlikes
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

 async function removeLike(){
    console.log('click to remove')

    const movieName =this.parentNode.parentNode.childNodes[1].innerText
    const currentlikes = Number(this.parentNode.childNodes[1].innerText)
    console.log(movieName,",",currentlikes)

    if(currentlikes ==0){
        return
    }
    // remove like from storage
    localStorage.removeItem(movieName)

    try{
        const response = await fetch('/removeLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'movieName': movieName,
              'currentLikes': currentlikes
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

//delete movie
async function deleteMovie(){
    const mName = this.parentNode.parentNode.childNodes[1].innerText
    console.log(mName)
    
    try{
        const response = await fetch('/deleteMovie', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'movieName': mName
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
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

let popUp = document.querySelector('.aboutPopup')
let about = document.querySelector('.aboutMenu')

let addPop = document.querySelector('.addMovie')
let addLink = document.querySelector('.addLink')

about.addEventListener('click',()=>{
    console.log('click')
    popUp.classList.remove('hide')
})

document.querySelector('.closeAbout').addEventListener('click',()=>{
    popUp.classList.add('hide')
})

addLink.addEventListener('click',()=>{
    addPop.classList.remove('hide')
})

document.querySelector('.closeAdd').addEventListener('click',()=>{
    addPop.classList.add('hide')

})