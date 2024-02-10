import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import AddMovie from "../components/addMovie"
import { useQuery } from '@tanstack/react-query'
import "./App.css"
import logo from "../logo.png"
import lightLogo from "../logo-light.png"

const placeBadge = (i) => {
  if (i == 0) return <span className="count first-place">1</span>
  if (i == 1) return <span className="cout second-place">2</span>
  if (i == 2) return <span className="count third-place">3</span>
  if (i + 1 > 99) return <span className="count longCount">{i + 1}</span>
  return <span className="count">{i + 1}</span>
}


export default function Home() {
  // const [movies,setMovies] = useState([])
  const getMovies = async () => {
    const res = await fetch("/api/home")
    const data = await res.json()
    console.log(data)
    return data
  }
  const { isPending, error, data: movies, isFetching } = useQuery({
    queryKey: ['movies'],
    queryFn: getMovies,
    refetchOnWindowFocus: false,

  })

  // const { data: personsData, status } = useQuery(
  //   "personsData",
  //   getPersonsInfo,
  //   {
  //     onSuccess: () => {
  //       setPersons(personsData.data);
  //     },
  //     onError: (error) => {
  //       console.log(error);
  //     }
  //   }
  // );
  const { user } = useOutletContext()

  const likeIconRender = (movie) => {
    if (user.likedMovies[movie._id] || user.addedMovies[movie._id]) {
      return (
        <>
          <span>{movie.likes}</span>
          <button className="likeBtn" type="submit" onClick={handleUnlike}>
            <i className='fa fa-thumbs-up liked' ></i>
          </button>
        </>
      )
    }

    return (
      <>
        <span>{movie.likes}</span>
        <button className="likeBtn" type="submit" onClick={handleLike}>
          <i className='fa fa-thumbs-up no-like' ></i>
        </button>
      </>
    )

  }
  const handleUnlike = (e) => {
    e.preventDefault()
    // action="home/removeLike/{movie[i]._id%>?_method=PUT"
    // method="POST"
    // className=""

  }
  const handleLike = (e) => {
    e.preventDefault()
    // action="home/addLike/{movie[i]._id%>?_method=PUT"
    // method="POST"
    // className=""

  }

  const handleLogout = (e) => {
    e.preventDefault()
    // naviagteTo ("/logout")
    // <li><a className="logout">Logout</a></li>
    // <form action="/logout" method="POST" id="logoutForm" className="hide"></form>
  }
  if (isPending) return <>Loading...</>

  return (
    <>
      <div className="container">
        <header className="center">
          <nav>
            <ul>
              {user && <li><a href="/profile" className="login">Profile</a></li>}
              <li><a className="addLink" id="addMovie">Add Your Favorite Movies</a></li>
              <li><a className="aboutMenu">About</a></li>
              {
                !user ? <li><a href="/login" className="login">Login</a></li>
                  : <li><a className="logout">Logout</a></li>
              }

              {user && <li><a className="logout" onClick={handleLogout}>Logout</a></li>}

              <li id="themeSwitch" className="fa fa-solid fa-sun"></li>
              <li id="themeSwitchDark" className="fa fa-solid fa-moon hide" ></li>
            </ul>
          </nav>
          <h1 className="hide">Movie Rank</h1>
          <div className="logos">
            <img className="mainLogo hide" src={logo} alt="Movie Rank logo" />
            <img className="mainLogo lightLogo" src={lightLogo} alt="Movie Rank logo" />
          </div>
        </header>
        <div>
          <section className="search dark-mode">
            <input id="search" type="text" placeholder="Search movie list" />
          </section>
          <section className="cards" >

            {
              movies.map((movie, i) => (
                <section className="card1" key={movie._id}>
                  {placeBadge(i)}
                  <img src={movie.image} alt={`${movie.name} movie poster`} />
                  <ul>
                    {
                      movie.name.length > 23 ? <li> <h2 className="longName">{movie.name}</h2></li> : <li> <h2>{movie.name}</h2></li>
                    }
                    <li>{movie.year}</li>
                    <li>{likeIconRender(movie)}</li>
                  </ul>
                </section>
              ))
            }
          </section>
        </div >
        {/*       
                      // <% - include('partials/header') -%>
      
      
                      < !--end of container-- > */}
        <AddMovie />
      </div>
    </>
  )
  // }
}
// <div className="modal fade" id="aboutModal">
//   <div className="modal-dialog">
//     <div className="modal-content">
//       <div className="modal-header">
//         <h1 className="modal-title" id="aboutModalLabel">Welcome to Movie Rank</h1>
//       </div>
//       <div className="modal-body">
//         <p> Movie Rank is where you can help build a list of great movies and with your 'likes' help the communty to rank them.</p><br>

//           <p>Don't see your favorite movies on the site? Click 'Add Your Favorite Movies' in the menu to add them. Be sure to browse the movies and give a like to Movies that are some of your favorites. </p><br>

//             <p>The goal of Movie Rank is to gather a collection of everyones favorite movies and see which one comes out on top!</p><br>

//               <p>--More updates coming soon---</p>
//             </div>
//             <div className="modal-footer">
//               <button type="button" id="closeAboutModal" className="btn btn-secondary">Close</button>
//             </div>
//           </div>
//       </div>
//     </div>
//     <div className="modal-backdrop fade show" id="aboutBackdrop" style="display: none;"></div>
//     <%- include('partials/footer') -%></div>