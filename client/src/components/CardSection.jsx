import { useState } from 'react';
import styles from "../pages/home.module.css"


const PlaceBadge = ({ value: i }) => {
  if (i == 0) return <span className={[styles.count, styles["first-place"]].join(" ")}>1</span>
  if (i == 1) return <span className={[styles.count, styles["second-place"]].join(" ")}>2</span>
  if (i == 2) return <span className={[styles.count, styles["third-place"]].join(" ")}>3</span>
  if (i + 1 > 99) return <span className={[styles.count, styles.longCount].join(" ")}>{i + 1}</span>
  return <span className={styles.count}>{i + 1}</span>
}

function MyCard({ movie, i, user, refetch }) {
  const likeButton = (movie) => {
    const [liked, setLiked] = useState(user?.likedMovies?.[movie._id]);
    const handleLikeClick = async () => {
      if (movie.likes <= 0) return
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
          <><span style={{ color: "#f7f7ed" }}>{movie.likes} </span><i style={{ color: "#f7f7ed" }} className="fas fa-thumbs-up" ></i></>) : (<><span onMouseOver={() => setIsHovered(true)} style={{ color: "#f7f7ed" }}>{movie.likes} </span><i style={{ color: "#f7f7ed" }} className="far fa-thumbs-up" /></>
        )}
      </button>
    );
  };

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
