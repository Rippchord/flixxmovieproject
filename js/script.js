const global = {
    currentPage: window.location.pathname
}

// Highlight Active Link
function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if (link.getAttribute('href') === global.currentPage){
            link.classList.add('active');
        }
    })
}


// Display 20 most popular movies 
async function displayPopularMovies() {
    const {results} = await fetchAPIData('movie/popular');
    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `;

    document.querySelector('#popular-movies').appendChild(div);
  });
}

// Display Movie Details
async function displayMovieDetails() {
    const movieID = window.location.search.split('=')[1];

    const movie = await fetchAPIData(`movie/${movieID}`);

    // Overlay for background image
    displayBackgroundImage('movie', movie.backdrop_path);

    const div = document.createElement('div');

    div.innerHTML = `<div class="details-top">
          <div>
          ${
            movie.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`
              : `<img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="${movie.title}"
        />`
          }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date:  ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
                ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join(' ')}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies.map((company) => `<span>${company.name}</span>`).join(', ')}</div>
        </div>`

    document.querySelector('#movie-details').appendChild(div)
}

//Display Show Details
async function displayShowDetails() {
    const showID = window.location.search.split('=')[1];

    const show = await fetchAPIData(`tv/${showID}`);

    // Overlay for background image
    displayBackgroundImage('tv', show.backdrop_path);

    const div = document.createElement('div');

    div.innerHTML = `<div class="details-top">
          <div>
          ${
            show.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />`
              : `<img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="${show.name}"
        />`
          }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date:  ${show.first_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
                ${show.genres.map((genre) => `<li>${genre.name}</li>`).join(' ')}
            </ul>
            <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes}</li>
            <li><span class="text-secondary">Last Episode:</span> ${show.last_episode_to_air.name}</li>
            <li><span class="text-secondary">Last Air Date:</span> ${show.last_air_date}</li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies.map((company) => `<span>${company.name}</span>`).join(', ')}</div>
        </div>`

    document.querySelector('#show-details').appendChild(div)
}

function addCommasToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}



// Display 20 most popular TV shows
async function displayPopularTVShows() {
    const {results} = await fetchAPIData('tv/popular');
    results.forEach(show => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${show.name}"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${show.first_air_date}</small>
            </p>
          </div>
        `;

    document.querySelector('#popular-shows').appendChild(div);
  });
}


function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

// Display Backdrop On Details Pages
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

// Display Slider Movies

async function displaySlider() {
    const { results } = await fetchAPIData('movie/now_playing');

    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');

        div.innerHTML= `
          <div class="swiper-slide">
            <a href="tv-details.html?id=${movie.id}">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
            </h4>
          </div> `;

          document.querySelector('.swiper-wrapper').appendChild(div);

          initSwiper();
    })
}


async function displayTVSlider() {
    const { results } = await fetchAPIData('tv/top_rated');

    results.forEach((show) => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');

        div.innerHTML = div.innerHTML= `
        <div class="swiper-slide">
          <a href="movie-details.html?id=${show.id}">
            <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name}" />
          </a>
          <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${show.vote_average} / 10
          </h4>
        </div> `;

        document.querySelector('.swiper-wrapper').appendChild(div);

        initSwiper();
        
    })
}

function initSwiper() {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        breakpoints: {
            500: {
                slidesPerView: 2
            },
            700: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 4,
            }
        },
    })
}

// Fetch Data from TMBD API
async function fetchAPIData(endpoint){
   
    // Fetch API key from json doc
    const res = await fetch('./js/env.json');
    const data = await res.json();
    const API = data.APIKEY;

    const API_URL = 'https://api.themoviedb.org/3/';

    showSpinner();

    const response = await fetch(
        `${API_URL}${endpoint}?api_key=${API}&language=en-US`
    );

    const data2 = await response.json();
    hideSpinner();

    return data2;
}


// Init App
function init() {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            console.log('Home');
            displayPopularMovies();
            displaySlider();
            break;
        case '/shows.html':
            console.log('shows');
            displayTVSlider();
            displayPopularTVShows();
            break;
        case '/movie-details.html':
            displayMovieDetails();
            break;
        case '/tv-details.html':
            displayShowDetails();
            break;
        case "/search.html":
            console.log("Search")
            break;
    }

    highlightActiveLink()
    fetchAPIData()
}

init()
