import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [url, setUrl] = useState("");

  function inputHandler(e) {
    setPrompt(e.target.value);
  }

  //sets config for API, key in separate file
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPEN_API_Key,
  });

  const openai = new OpenAIApi(configuration);

  //async func for request, from documentation
  const generateImg = async () => {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    const generatedImgUrl = response.data.data[0].url;
    //data in object response saved as state
    setUrl(generatedImgUrl);
  };

  return (
    <div className="main">
      <h1>Generate Image</h1>
      <input
        className="input"
        type="text"
        onChange={inputHandler}
        placeholder="type a request to generate"
      />
      <button onClick={generateImg}>GENERATE</button>

      {url.length > 0 ? <img className="img" src={url} alt="" /> : <></>}
    </div>
  );
}

export default App;
