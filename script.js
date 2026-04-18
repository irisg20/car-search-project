const searchInput = document.querySelector(".search input");
const carWrap = document.querySelector(".car__wrap");
const button = document.querySelector(".search__btn");

let triggered = false;

searchInput.addEventListener("focus", () => {
    if (!triggered) {
        carWrap.classList.add("show-car");
        triggered = true;
    }
});


function handleSearch() {
    const searchValue = searchInput.value.trim();

    if (!searchValue) return;

    button.classList.add("loading");
    setTimeout(() => {
        window.location.href = `cars.html?search=${encodeURIComponent(searchValue)}`;

    }, 2000);
}

button.addEventListener("click", handleSearch);

searchInput.addEventListener("keydown",(event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});


