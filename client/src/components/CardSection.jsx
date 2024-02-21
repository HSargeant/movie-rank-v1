import { useEffect, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import styles from "../pages/home.module.css"


const PlaceBadge = ({ value: i }) => {
  if (i == 0) return <span className={[styles.count, styles["first-place"]].join(" ")}>1</span>
  if (i == 1) return <span className={[styles.count, styles["second-place"]].join(" ")}>2</span>
  if (i == 2) return <span className={[styles.count, styles["third-place"]].join(" ")}>3</span>
  if (i + 1 > 99) return <span className={[styles.count, styles.longCount].join(" ")}>{i + 1}</span>
  return <span className={styles.count}>{i + 1}</span>
}

function MyCard({ movie, i, user, refetch }) {
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false)
  const ThumbsIcon = () => {
    // if (isHovered) return <i style={{ fontSize: "1.2em",color:"#eee" }} className="fas fa-thumbs-up" />

    return <i style={{ color: "#f7f7ed" }} className={"far fa-thumbs-up"} />
  }
  const LikeIcon = ({ movie }) => {
    let icon
    if (user?.likedMovies?.[movie._id] || user?.addedMovies?.[movie._id]) {
      icon = (<button className={styles.likeBtn} onClick={(e) => handleUnlike(e, movie._id)}>
        <i style={{ color: "#f7f7ed" }} className={["fas", "fa-thumbs-up"].join(" ")} ></i>
      </button>)
    } else {
      icon = (
        <button
          // onMouseEnter={() => setIsHovered(true)}
          // onMouseLeave={() => setIsHovered(false)}
          className={styles.likeBtn} onClick={(e) => handleLike(e, movie._id)}>

          <ThumbsIcon />
        </button>)
    }
    return (
      <>
        <span>{movie.likes} </span>
        {icon}
      </>
    )
  }

  const likeButton = (movie) => {
    // console.log(user?.likedMovies?.[movie._id] || user?.addedMovies?.[movie._id])
    const [liked, setLiked] = useState(user?.likedMovies?.[movie._id] || user?.addedMovies?.[movie._id]);
    // setLiked(user?.likedMovies?.[movie._id] || user?.addedMovies?.[movie._id])
    const handleLikeClick = async () => {
      if (liked) {
        console.log("unlike call")
        try {
          console.log("unlike call")
          const response = await fetch(`/api/home/removeLike/${movie._id}`, {
            method: "PUT",
            body: {},
            credentials: "include",
          });
          // const data = await response.json();
          setLiked(false);
        } catch (error) {
          console.error(error)
        }
      } else {
        console.log("like call")
        // Add like (call your addLike function)
        // Optimistically update the local state
        try {
          const response = await fetch(`/api/home/addLike/${movie._id}`, {
            method: "PUT",
            body: {},
            credentials: "include",
          });
          setLiked(true);
          // const data = await response.json();
        } catch (error) {
          console.error(error)
        }
      }
      refetch()

    };

    return (
      <button className={styles.likeBtn} onClick={handleLikeClick}>
        {liked ? (
          <><span style={{ color: "#f7f7ed" }}>{movie.likes} </span><i style={{ color: "#f7f7ed" }} className="fas fa-thumbs-up" ></i></>) : (<><span style={{ color: "#f7f7ed" }}>{movie.likes} </span><i style={{ color: "#f7f7ed" }} className="far fa-thumbs-up" /></>

        )}
      </button>
    );
  };

  // const handleUnlike = async (e,id) => {
  //   // e.preventDefault()
  //   // action="home/removeLike/{movie[i]._id%>?_method=PUT"
  //   // method="POST"
  //   // className=""
  //   console.log("unlike",id,e.target.parentNode)
  //   // console.log(e.target.className)
  //   // e.target.className = q"far fa-thumbs-up"
  //   // console.log("after",e.target.className)

  //   try {
  //     const response = await fetch(`/api/home/removeLike/${id}`, {
  //       method: "PUT",
  //       body: {},
  //       credentials: "include",
  //     });
  //     const data = await response.json();
  //     e.target.parentNode = (<button
  //       className={styles.likeBtn} onClick={(e)=>handleLike(e,movie._id)}>

  //       <ThumbsIcon  />
  //     </button>)
  //     refetch()
  //   } catch (error) {
  //     console.error(error)
  //   }

  // }
  // const handleLike = async (e,id) => {
  //   // e.preventDefault()
  //   // action="home/addLike/{movie[i]._id%>?_method=PUT"
  //   // method="POST"
  //   // className=""
  //   console.log("like",id,e)
  //   // console.log(e.target.className)
  //   // e.target.className = "fas fa-thumbs-up"
  //   // console.log("after",e.target.className)
  //   try {
  //     const response = await fetch(`/api/home/addLike/${id}`, {
  //       method: "PUT",
  //       body: {},
  //       credentials: "include",
  //     });
  //     const data = await response.json();
  //     e.target.parentNode=(<button className={styles.likeBtn} onClick={(e)=>handleUnlike(e,movie._id)}>
  //     <i style={{color:"#f7f7ed"}} className={["fas", "fa-thumbs-up"].join(" ")} ></i>
  //   </button>)
  //     refetch()
  //   } catch (error) {
  //     console.error(error)
  //   }


  // }
  const theme = createTheme({
    shadows: ["none"]
  });
  return (
    <section className={styles.card}>
      <PlaceBadge value={i} />
      <img src={movie.image} alt={movie.name + " poster"} loading="lazy" />
      <ul style={{ color: "#eee" }}>
        <li>
          {movie.name.length > 23 ? <h2 className={styles.longName}>{movie.name}</h2> : <h2>{movie.name}</h2>}
        </li>
        <li>{movie.year}</li>
        <li>
          {likeButton(movie)}
        </li>
      </ul>
    </section>
  );
}

export default MyCard;
