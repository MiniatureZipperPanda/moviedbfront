var token = ``
if ('token' in localStorage) {
    token = localStorage.getItem('token')
}
var options = {
    method: "GET",
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: 'Token ' + token
    },

}
fetch(`http://127.0.0.1:8000/api/v1/movies`, options)
    .then(res => res.json())
    .then(data => {
        populateMovies(data)
    })

function populateMovies(movies) {
    let htmlData = ``
    movies.forEach(movie => {
        htmlData += `
        <div class="col-4 mt-3">
        <div class="card" style="width: 18rem;">
  <img src="${movie.movie_image}" class="card-img-top" alt="no">
  <div class="card-body">
    <h5 class="card-title">${movie.movie_name}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${movie.director_name}</li>
    <li class="list-group-item">Year : ${movie.release_year}</li>
    <li class="list-group-item">${movie.id}</li>
   
  </ul>
  <div class="card-body">
    <button class="btn btn-outline-primary" name="${movie.id}" onclick=" movieDetails(event)">View</button>
    <button class="btn btn-outline-success" name="${movie.id}" onclick="reviewModalBox(event)"> Add Review</button>
    
    
  </div>
</div>
        </div>

        `
    })
    id_movies.innerHTML = htmlData

}
function movieDetails(event) {
    let mId = event.target.name
    fetch(`http://127.0.0.1:8000/api/v1/movies/${mId}/`, options)
        .then(res => res.json())
        .then(data =>

            movieDisplay(data)
        )
}

function movieDisplay(movie) {
    console.log(movie)
    let modelDiv = document.createElement('div')
    modelDiv.innerHTML = `
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${movie.movie_name}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <div class="card" style="width: 100%">
          <img src="${movie.movie_image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h6 class="card-text">${movie.director_name}</h6>
            <p class="card-title"> YEAR : ${movie.release_year}</p>
            
          </div>
        </div>
          </div>
          <div class="modal-footer">
            
          </div>
        </div>
      </div>
    </div>
    
    `
    document.body.append(modelDiv)

    var modal = new bootstrap.Modal(modelDiv.querySelector("#exampleModal"))
    modal.show()
}






function movieEdits(event) {
    let mId = event.target.name
    fetch(`http://127.0.0.1:8000/api/v1/movies/${mId}/`, options)
        .then(res => res.json())
        .then(data =>
            movieUpdate(data)
        )
}
function reviewModalBox(event) {
      let mId = event.target.name
      console.log(mId)
    let modelDiv = document.createElement('div')
    modelDiv.innerHTML = `
    <!-- Modal -->
        <div class="modal" id="editModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        </div>
        <div class="modal-body">
      <!-- form -->
       
            <div class="form-group">
            <label for="" class="mt-2">review</label>
            <input type="text" class="form-control mt-2" id="id_review" aria-describedby="review" placeholder="review">
            </div>
            <div class="form-group">
            <label for="" class="mt-2">rating</label>
            <input type="text" class="form-control mt-2" id="id_rating" aria-describedby="" placeholder="rating out of 5">
            </div>
            
            <button type="submit" class=" mt-4 btn btn-primary" name="${mId}" onclick="submitReview(event)">Submit</button>
        
                    </div>
                </div>
            </div>
        </div>
    `
    document.body.append(modelDiv)

    var modal = new bootstrap.Modal(modelDiv.querySelector("#editModal"))
    modal.show()
}
function submitReview(event) {
  let mId = event.target.name
    console.log(mId)
    let review = id_review.value
    let rating = id_rating.value
    let data = {
        "review": review,
        "rating": rating,
    }
    console.log(token)
    let opn = {
        method: "POST",
        headers: { 'Content-type': 'application/json; charset=UTF-8',
        Authorization: 'Token '+token
      },
        body: JSON.stringify(data),
        

    }
    
    fetch(`http://127.0.0.1:8000/api/v1/movies/${mId}/add_review/`, opn)
        .then(res => res.json())
        .then(data =>{
          let modelWindow= new bootstrap.Modal(document.querySelector('#editModal'))
          modelWindow.hide()
          document.querySelector('#msg_box').innerHTML="review has been Posted"
        })
            
        

}