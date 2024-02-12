const searchBar = document.querySelector('.search')
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

export default function SearchBar() {
  return (
    <section class="search dark-mode" style={{ margin: "20px 0 0 0" }}>
      <input id="search" type="search" placeholder="Search movie list" />
    </section>
  );
}
