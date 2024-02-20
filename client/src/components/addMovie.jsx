import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";


export default function AddMovie() {
  const [name, setName] = useState("")
  const [year, setYear] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("sent")
    try {
      const form = event.currentTarget;
      const response = await fetch(form.getAttribute("action"), {
        method: form.method,
        body: new FormData(form),
        credentials: "include",
      });
      const data = await response.json();
    } catch (err) {
      console.log("Error:" + err);
    }
    // if (data.messages) setMessages(data.messages);
    navigate(0);
  };

  return (
    <>
    <div className="modal fade" id="exampleModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title" id="exampleModalLabel">Add a Movie</h2>
          </div>
          <div className="modal-body">
            <span>**Tip: Including the release year is helpful when dealing with a movie that has sequels or has been
              remade**</span><br /><br /><br />
            <form action="/api/home/addMovie" method="POST" onSubmit={handleSubmit}>
              <input type="text" value={name} placeholder="Movie Name" name="name" id="name" onChange={(e) => setName(e.target.value)} />
              <input type="number" value={year} placeholder="Release Year (optional)" name="year" id="year" onChange={(e) => setYear(e.target.value)} />
              <input type="submit" id="submitMovie" value="Submit" className="btn btn-primary" />
            </form>
          </div>

          <div className="modal-footer">
            <button type="button" id="closeModal" className="btn btn-secondary">Close</button>
          </div>
        </div>
      </div>
    </div>
      <div class="modal-backdrop fade show" id="backdrop" style={{display: "none"}}></div>

      </>
  )
}