import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import "./Meme.css";


export default function Meme() {
  const [meme, setMeme] = useState("");
  const [loading, setLoading] = useState(true);

  const apiURL = "https://meme-api.com/gimme/1";

  const fetchNewMeme = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiURL);
      setMeme(response.data.memes[0].url);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNewMeme();
  }, []); 

  if (loading) {
    return (
      <div className="meme-panel">
        <div className="meme">
          <HashLoader
          color = {"#000000"}
          loading={loading}
          size={50}
          cssOverride={{
            height: "100%",
            display: "flex",
            left: "50%",
            right: "50%"
          }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="meme-panel" onClick={fetchNewMeme}>
      {meme && <img className="meme" src={meme} alt="meme" />}
    </div>
  );
}
