import styles from "../pages/home.module.css"

export default function SearchBar() {
  function filterCards(e) {
    let section = window.document.querySelectorAll(`.${styles.card}`)
    let txtValue;
    let filter = e.currentTarget.value.toUpperCase()
    let h2 = window.document.querySelectorAll('h2')
    for (let i = 0; i < h2.length; i++) {
      txtValue = h2[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        section[i].style.display = "";
      } else {
        section[i].style.display = "none";
      }
    }
  }

  return (
    <section className={[styles.search, styles["dark-mode"]].join(" ")} style={{ margin: "20px 0 0 0" }} z>
      <input id="search" type="search" placeholder="Search movie list" onKeyUp={filterCards} />
    </section>
  );
}
