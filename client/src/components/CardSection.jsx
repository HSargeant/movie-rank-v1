import { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { createTheme } from '@mui/material/styles';
import styles from "../pages/home.module.css"


const PlaceBadge = ({ value: i }) => {
  if (i == 0) return <span className={[styles.count, styles["first-place"]].join(" ")}>1</span>
  if (i == 1) return <span className={[styles.count, styles["second-place"]].join(" ")}>2</span>
  if (i == 2) return <span className={[styles.count, styles["third-place"]].join(" ")}>3</span>
  if (i + 1 > 99) return <span className={[styles.count, styles.longCount].join(" ")}>{i + 1}</span>
  return <span className={styles.count}>{i + 1}</span>
}

function MyCard({ movie, i, user }) {
  const [filter, setFilter] = useState("")
  const LikeIcon = ({ movie }) => {
    let icon
    if (user.likedMovies[movie._id] || user.addedMovies[movie._id]) {
      icon = (<button className={styles.likeBtn} type="submit" onClick={handleUnlike}>
        <i className={["fas", "fa-thumbs-up", styles.liked].join(" ")} ></i>
      </button>)
    } else {
      icon = (<button className={styles.likeBtn} type="submit" onClick={handleLike}>
        <i className={["fas", "fa-thumbs-up", styles["no-like"]].join(" ")} ></i>
        {/* <ThumbUpIcon/> */}
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
          <LikeIcon movie={movie} />
        </li>
      </ul>
    </section>
  );
}

export default MyCard;
