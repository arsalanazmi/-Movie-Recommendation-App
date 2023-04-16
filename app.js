(async function () {
  const response = await fetch("./data.json");
  const movies = await response.json();

  const allGenres = [];
  const allYears = [];
  const allLanguages = [];
  const allRatings = [];

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];

    for (let j = 0; j < movie.genres.length; j++) {
      const genre = movie.genres[j];

      if (!allGenres.includes(genre)) {
        allGenres.push(genre);
      }
    }

    const year = new Date(movie.release_date).getFullYear();
    const language = movie.original_language;
    const rating = movie.vote_average;

    if (!allYears.includes(year)) {
      allYears.push(year);
    }

    if (!allLanguages.includes(language)) {
      allLanguages.push(language);
    }

    if (!allRatings.includes(rating)) {
      allRatings.push(rating);
    }
  }

  const genres = document.getElementById("genre");
  const years = document.getElementById("year");
  const languages = document.getElementById("language");
  const ratings = document.getElementById("rating");

  allGenres.forEach((genre) => {
    const genreOption = document.createElement("option");
    genreOption.value = genre;
    genreOption.textContent = genre;
    genres.appendChild(genreOption);
  });

  allYears.forEach((year) => {
    const yearOption = document.createElement("option");
    yearOption.value = year;
    yearOption.textContent = year;
    years.appendChild(yearOption);
  });

  allLanguages.forEach((language) => {
    const languageOption = document.createElement("option");
    languageOption.value = language;
    languageOption.textContent = language;
    languages.appendChild(languageOption);
  });

  allRatings.forEach((rating) => {
    const ratingOption = document.createElement("option");
    ratingOption.value = rating;
    ratingOption.textContent = rating;
    ratings.appendChild(ratingOption);
  });

  const myForm = document.getElementById("myForm");
  myForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const genreValue = genres.value;
    const yearValue = years.value;
    const languageValue = languages.value;
    const ratingValue = ratings.value;

    const combineFilter = movies.filter((movie) => {
      return (
        movie.genres.includes(genreValue) ||
        movie.release_date.includes(yearValue) ||
        movie.original_language.includes(languageValue) ||
        String(movie.vote_average).includes(ratingValue)
      );
    });

    const table = document.querySelector("table");
    if (table) {
      deleteTable();
      displayTable(combineFilter);
    } else {
      displayTable(combineFilter);
    }
  });

  function deleteTable() {
    const table = document.querySelector("table");
    var div = table.parentNode.parentNode;
    div.parentNode.removeChild(div);
  }

  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  const displayTable = (result) => {
    const mainDiv = document.getElementById("main");

    const divElem1 = document.createElement("div");
    divElem1.classList.add("container");
    divElem1.id = "tableContainer";
    mainDiv.appendChild(divElem1);

    const divElem2 = document.createElement("div");
    divElem2.classList.add("display");
    divElem1.appendChild(divElem2);

    const myTable = document.createElement("table");
    const tableHead = document.createElement("thead");

    const headerRow = tableHead.insertRow(0);
    const headerCell1 = headerRow.insertCell(0);
    const headerCell2 = headerRow.insertCell(1);
    const headerCell3 = headerRow.insertCell(2);

    headerCell1.innerHTML = "RANK";
    headerCell2.innerHTML = "MOVIE";
    headerCell3.innerHTML = "YEAR";

    headerCell1.classList.add("rank");
    headerCell2.classList.add("movie");
    headerCell3.classList.add("year");

    tableHead.append(headerRow);
    myTable.append(tableHead);

    const tableBody = document.createElement("tbody");
    myTable.appendChild(tableBody);
    divElem2.appendChild(myTable);

    result.forEach((r, i) => {
      const row = tableBody.insertRow(-1);
      var bodyCell1 = row.insertCell(0);
      var bodyCell2 = row.insertCell(1);
      var bodyCell3 = row.insertCell(2);

      bodyCell1.classList.add("rank");
      bodyCell3.classList.add("year");

      bodyCell1.innerHTML = i + 1;
      bodyCell2.innerHTML = `<div>
      <div>
      <img
         src="https://image.tmdb.org/t/p/w45${r.poster_path}"
      />
    </div>
    <div class="description">
      <p class="title"><b>${r.title}</b></p>
      <span class="certification">${r.certification}</span>
      <span
        >Action.Science,Friction<span class="dot">.</span></span
      >
      <span>${formatTime(r.runtime)}</span>
    </div>
  </div>`;
      bodyCell3.innerHTML = `${new Date(r.release_date).getFullYear()}`;
    });
  };
})();
