import { useEffect, useState } from "react";
import './Meme.css'
export default function Meme() {
  const [meme, getMeme] = useState([]);

  const apiIRL = "https://meme-api.com/gimme/1";
  async function memeData() {
    try {
      const response = await fetch(apiIRL);
      const data = await response.json();
      getMeme(data.memes[0].url);
    } catch (error) {
      console.error("error while fetching meme: ", error);
    }
  }

  useEffect(() => {
    memeData();
  }, []);

  return (
    <div className="meme-panel">
      {meme && <img className="meme" src={meme} alt="meme" />}
      <button
        className="next-meme-button"
        onClick={() => {
          memeData();
        }}
      >
        NEXT
      </button>
    </div>
  );
}
