const API_KEY ="f6b0b0bdad114155a1df3eb97d884fdd";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () =>fetchNews("India"));
function reload() {
    window.location.reload();
}

async function fetchNews (query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json();
    console.log(data);
    bindData(data.articles);

}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';
    articles.forEach(article => {
        if(!article.urlToImage) return; // if no images are present, not showing the news
        const cardClone = newsCardTemplate.content.cloneNode(true); // cloning template card
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
} 
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timezone: "Asia/Jakarta", 
    }); // timezone values from google

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    }); // when clicked on image, user will be directed to link
}

let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('saerch-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
});