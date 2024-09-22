import { useEffect, useState } from 'react';
import { BsTwitter } from 'react-icons/bs';
import { TiSocialTumbler } from 'react-icons/ti';
import { FaQuoteLeft } from "react-icons/fa";

//evn key
const apiKey = import.meta.env.VITE_API_KEY; 


const QuotesPage = () => {
  //state for quote, author, and colors for background/btns/icons
  const [author, setAuthor] = useState('')
  const [quote, setQuote] = useState('')
  const [backgroundColor, setBackgroundColor] = useState('#215CD6');

  //useEffect hook used to generate quote on window load
  useEffect(() => {
    fetchRandomQuoteApi();
  }, []);

  //fetchApi function
  const fetchRandomQuoteApi = async () => {
    try {
      const res = await fetch(
        'https://quotes15.p.rapidapi.com/quotes/random/?language_code=en',
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'quotes15.p.rapidapi.com',
            'Content-Type': 'application/json'
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.error || "Problem with fetching data try again later if can.")
        throw new Error(data.error)
      }
      setQuote(data.content)
      setAuthor(data.originator.name)
     
    } catch (error) {
      console.log(error.message)
      throw error;
    }
  };

  const generateRandomColor = () => {
    return (
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
    );
  };

  const handleClick = () => {
    setBackgroundColor(generateRandomColor);
    fetchRandomQuoteApi()
  };

  return (
    <div
      style={{
        transition: 'all .3s',
        background: backgroundColor,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="container" id="quote-box">
        <div>
          <div className="text" id="text" style={{ color: backgroundColor,  transition: 'all .3s'}}>
          <FaQuoteLeft style={{marginRight: "8px"}} />

            {quote}
          </div>

          <div
            className="author-text"
            id="author"
            style={{ color: backgroundColor, paddingTop: '18px', transition: 'all .3s'}}
          >
            {author}
          </div>
        </div>

        <div className="socialWrapper">
          <div className="socialwebsites">
            <a
              href="twitter.com/intent/tweet"
              target="_blank"
              className="socialContainer"
              id="tweet-quote"
              style={{ backgroundColor: backgroundColor, transition: 'all .3s'}}
            >
              <BsTwitter style={{ color: 'white', fontSize: '20px' }} />
            </a>
            <div className="socialContainer" style={{ backgroundColor: backgroundColor, transition: 'all .3s'}}>
              <TiSocialTumbler style={{ color: 'white', fontSize: '24px' }} />
            </div>
          </div>
          <button
            style={{ color: 'white', backgroundColor: backgroundColor, transition: 'all .3s'}}
            className="socialContainer"
            id="new-quote"
            onClick={() => {
              handleClick();
            }}
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuotesPage;
