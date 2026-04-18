let currentMovies = [];

const carsPageInput = document.getElementById("searchInput");
const carsPageButton = document.getElementById("searchBtn");
const carsPageList = document.getElementById("carsList");
const sortSelect = document.getElementById("sortSelect");


if (carsPageInput) {
    
    function renderMovies(movieArray) {
        carsPageList.innerHTML = "";

        if (movieArray.length === 0) {
          carsPageList.innerHTML =`<p class="no-results">No results found</p>`;
          return;
        }

        movieArray.forEach((movie) => {
        carsPageList.innerHTML += 
         `<article class="cars-page__card">
         <img src="${movie.Poster !== "N/A" ?
          movie.Poster : "./assets/img-placeholder.webp"}
         
         alt="${movie.Title}"
         onerror="this.onerror=null;
         this.src='./assets/img-placeholder.webp';">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        </article>` 
        ;
        });
      }
   


      async function searchMovies(keyword) {
        const searchValue = keyword || carsPageInput.value.trim();
        
        if (searchValue === "") {
          return;
        }
        carsPageButton.classList.add("loading");
        carsPageButton.disabled = true;
        renderSkeletons();

        await new Promise((resolve) => setTimeout(resolve, 2000));
          
        const response = await fetch(`https://www.omdbapi.com/?apikey=b877b43b
          &s=${searchValue}`);
          
          const data = await response.json();
          
          console.log(data);
          
          if (!data.Search) {
            renderMovies([]);
              carsPageButton.classList.remove("loading");
             carsPageButton.disabled = false;
            return;
          }

        const filteredMovies = data.Search.filter((movie) => {
          return movie.Poster !== "N/A"
        });

        currentMovies = filteredMovies;
        sortMovies();

        carsPageButton.classList.remove("loading");
        carsPageButton.disabled = false;
           return;
    }
        
    carsPageButton.addEventListener("click", () => searchMovies());

    carsPageInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        searchMovies();
      }
    });
    
    sortSelect.addEventListener("change", () => {
      sortMovies();
    });
    
    
    window.addEventListener("load", () => {
      const params = new URLSearchParams(window.location.search);
      const searchQuery = params.get("search");
      
      if (searchQuery && searchQuery.trim() !== "") {
        carsPageInput.value =  searchQuery;
        searchMovies(searchQuery);
      } else {
        renderMovies([]);
      }
    });
    
  }
    

function sortMovies() {
  const sorted = [...currentMovies];

  if (sortSelect.value === "newest") {
    sorted.sort((a, b) => {
      const yearA = parseInt(a.Year) || 0;
      const yearB = parseInt(b.Year) || 0;
      return yearB - yearA;
    });
  }

  if (sortSelect.value === "oldest") {
    sorted.sort((a, b) => {
      const yearA = parseInt(a.Year) || 0;
      const yearB = parseInt(b.Year) || 0;
      return yearA - yearB;
    });
  }
  const firstSix = sorted.slice(0, 6);
 
  renderMovies(firstSix);
}

function renderSkeletons() {
carsPageList.innerHTML = "";

for (let i = 0; i < 6; i++) {
  carsPageList.innerHTML += `
  <article class= "cars-page__card skeleton-image"></div>
  <div class="skeleton skeleton-year"></div>
  </article>
  `;
}
}
