const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

let apiQuotes = [];

const setColor = () => {
  const body = document.querySelector('body');
  body.removeAttribute('class');
  body.classList.add('clr'+Math.floor(Math.random() * 12+1));
}

//? Show new quote
const newQuote = () => {
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  setColor();

	if (!quote.author) authorText.textContent = "Unknown";
	else authorText.textContent = quote.author;

	if (quote.text.length > 50) quoteText.classList.add("long-quote");
	else quoteText.classList.remove("long-quote");

	quoteText.textContent = quote.text;
};

const getQuotes = async () => {
	const api = "https://type.fit/api/quotes";

	try {
		const resp = await fetch(api);
		apiQuotes = await resp.json();

		newQuote();
	} catch (err) {
		console.log(err);
	}
};

// Tweet quotes
const tweetQuote = () => {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, "_blank");
};

// Event listener
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
setColor();
