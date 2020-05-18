const content = document.getElementById("content");
const loadingIcon = document.getElementById("loading-container");

const loadingOffset = 10;

const checkUniqueness = false;
const loadedImages = [];

let loading = true;

load(50);

window.onscroll = function() {
    if ((window.innerHeight + window.scrollY + loadingOffset) >= document.body.offsetHeight && !loading) {
        loading = true;
        load(25);
    }
};

function load(count) {
    loadingIcon.style.display = "block";

    fetch("https://randomuser.me/api/?results=" + count, {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    }).then((response) => {
        return response.json();
    }).then(response => {
        response.results.forEach(entry => {
            addImage(entry.picture.large);
        });

        loadingIcon.style.display = "none";
        loading = false;
    });
}

function addImage(src) {
    if(!checkUniqueness || !loadedImages.includes(src)) {
        let icon = document.createElement("img");
        icon.setAttribute("src", src);
        icon.classList.add("icon");
        content.appendChild(icon);

        loadedImages.push(src);
    }
}