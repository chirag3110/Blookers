import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  //var percPlag;
  function getDataFromApi() {
    console.log("Loading Data...");
    console.log(desc)
    const data = JSON.stringify({
      "text": desc,
      "language": "en",
      "includeCitations": false,
      "scrapeSources": false
    });

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        console.log(JSON.parse(this.responseText));
        console.log(JSON.parse(this.responseText)["percentPlagiarism"]);
        // percPlag = JSON.parse(this.responseText)["percentPlagiarism"];
        alert("Plagiarism % is : " + JSON.parse(this.responseText)["percentPlagiarism"])
        console.log("Data Loaded")
      }
    });

    xhr.open("POST", "https://plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com/plagiarism");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-rapidapi-host", "plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "dfde047140msh6a7ad1c767e7bf5p11179fjsnb8cab0c157a3");

    xhr.send(data);
  }
  
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={e=>setDesc(e.target.value)}
          ></textarea>
        </div>
        <div>
        <button type="button" className="writeSubmit plagButton" onClick={getDataFromApi} >
          Plagiarism
        </button>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
        </div>
      </form>
    </div>
  );
}
