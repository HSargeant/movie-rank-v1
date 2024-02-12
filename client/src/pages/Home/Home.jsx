import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import AddMovie from "../../components/addMovie"
import { useQuery } from '@tanstack/react-query'
// import "./home.css"
import logo from "../../logo.png"
import lightLogo from "../../logo-light.png"

const PlaceBadge = ({ value: i }) => {
  if (i == 0) return <span className="count first-place">1</span>
  if (i == 1) return <span className="count second-place">2</span>
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

  const LikeIcon = ({ movie }) => {
    let icon
    if (user.likedMovies[movie._id] || user.addedMovies[movie._id]) {
      icon = (<button className="likeBtn" type="submit" onClick={handleUnlike}>
        <i className='fa fa-thumbs-up liked' ></i>
      </button>)
    } else {
      icon = (<button className="likeBtn" type="submit" onClick={handleLike}>
        <i className='fa fa-thumbs-up no-like' ></i>
      </button>)
    }
    return (
      <>
        <span>{movie.likes} </span>
        {icon}
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
      <div class="container">
        <header class="center">
          <nav>
            <ul>
              {user && <li><a href="/profile" class="login">Profile</a></li>}
              <li><a class="addLink" id="addMovie">Add Your Favorite Movies</a></li>
              <li><a class="aboutMenu">About</a></li>
              {!user && <li><a href="/login" class="login">Login</a></li>}
              {user && <li><a class="logout" onClick={handleLogout}>Logout</a></li>}
              <li id="themeSwitch" class="fa fa-solid fa-sun"></li>
              <li id="themeSwitchDark" class="fa fa-solid fa-moon hide"></li>
            </ul>
          </nav>
          <h1 class="hide">Movie Rank</h1>
          <div class="logos">
            <img class="mainLogo hide" src={logo} alt="Movie Rank logo" />
            <img class="mainLogo lightLogo" src={lightLogo} alt="Movie Rank logo" />
          </div>
        </header>
        <section class="search dark-mode">
          <input id="search" type="search" placeholder="Search movie list" />
        </section>
        <section class="cards">
          {
            movies.map((movie, i) => (
              <section class="card">
                <PlaceBadge value={i} />
                <img src={movie.image} alt={movie.name + " movie poster"} />
                <ul>
                  <li>
                    {movie.name.length > 23 ? <h2 class="longName">{movie.name}</h2> : <h2>{movie.name}</h2>}
                  </li>
                  <li>{movie.year}</li>
                  <li>
                    <LikeIcon movie={movie} />
                  </li>
                </ul>
              </section>
            ))
          }
        </section>
      </div>
      <AddMovie />
      {/* <div class="modal fade" id="exampleModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title" id="exampleModalLabel">Add a Movie</h2>
            </div>
            <div class="modal-body">
              <span>**Tip: Including the release year is helpful when dealing with a movie that has sequels or has been
                remade**</span><br /><br /><br />
              <form action="/home/addMovie" method="POST">
                <input type="text" placeholder="Movie Name" name="name" id="name" />
                <input type="number" placeholder="Release Year (optional)" name="year" id="year" />
                <input type="submit" id="submitMovie" value="Submit" class="btn btn-primary" />
              </form>
            </div>

            <div class="modal-footer">
              <button type="button" id="closeModal" class="btn btn-secondary">Close</button>
            </div>
          </div>
        </div>
      </div> */}
      <div class="modal-backdrop fade show" id="backdrop" style={{ display: "none" }}></div>
      <div class="modal fade" id="aboutModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title" id="aboutModalLabel">Welcome to Movie Rank</h1>
            </div>
            <div class="modal-body">
              <p> Movie Rank is where you can help build a list of great movies and with your 'likes' help the communty to
                rank them.</p><br />

              <p>Don't see your favorite movies on the site? Click 'Add Your Favorite Movies' in the menu to add them. Be
                sure to browse the movies and give a like to Movies that are some of your favorites. </p><br />

              <p>The goal of Movie Rank is to gather a collection of everyones favorite movies and see which one comes out
                on top!</p><br />

              <p>--More updates coming soon---</p>
            </div>
            <div class="modal-footer">
              <button type="button" id="closeAboutModal" class="btn btn-secondary">Close</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show" id="aboutBackdrop" style={{ display: "none" }}></div>


      <footer id="footer">
        <p class="copyright">&copy; <a href="https://hendersonsargeant.netlify.app" target="_blank"
          class="profile">Henderson Sargeant</a>All rights reserved.</p>
      </footer>
    </>
  )
}