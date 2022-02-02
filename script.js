const quoteContainer = document.getElementById("container")
const quoteText = document.getElementById("quote")
const quoteAuthor = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById("loader")
let apiQuotes = [];



// Show Loader
function loading(){
    loader.hidden = false
    quoteContainer.hidden = true
}

// hide loader 
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
   
}

//show new quote
function newquote(){
    loading()
    // prick random quote from api quotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check for author
    if(!quote.author) {
        quoteAuthor.textContent = "Unknown"
    } else {
        quoteAuthor.textContent = quote.author
    }


    // check quote length
    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote")
    } else {
        quoteText.classList.remove("long-quote")
    }

    complete()
    quoteText.textContent = quote.text;
    complete()
}

// get quotes from API
async function getQuotes() {
    loading();
    const apiurl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiurl);
        apiQuotes = await response.json();
        newquote();
        
    } catch (error) {
        // catch error here
    }
}

// To tweet a quote

function tweetquote() {
    const twitterurl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterurl, '_blank');
}

// New quote for new quote
newQuoteBtn.addEventListener('click', newquote)
twitterBtn.addEventListener('click', tweetquote)



// on load
getQuotes();

