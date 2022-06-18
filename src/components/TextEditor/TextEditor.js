import React, { useState, useEffect } from "react";
import "./TextEditor.css";
import AccordianMenu from "./AccordianMenu";
import { Editor } from "@tinymce/tinymce-react";
import { UserAuthProvider } from "../context/UserContext";
import logo from "../../assets/images/O.png";
import { useNavigate } from "react-router-dom";
const TextEditor = () => {
  const navigate = useNavigate();
  const [text, setText] = useState(
    "Write your text here to checkk thr gramar correctom"
  );
  const [title, setTitle] = useState("");
  const [matches, setMatches] = useState([]);
  console.log(matches);
  const correctText = (match, index) => {
    const newText = text.replace(
      text.substring(match.context.offset, match.context.length),
      match.replacements[0].value
    );
    setText(newText);
    let newMatches = matches;
    newMatches.splice(index, 1);
    setMatches([]);
    check(newText);
  };
  const check = (newText) => {
    console.log(text);
    const encodedParams = new URLSearchParams();
    encodedParams.append("language", "en-US");
    encodedParams.append("text", newText ? newText : text);

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "323e638a24msh5f8034283f80f81p178f86jsncf85c3231f40",
        "X-RapidAPI-Host": "dnaber-languagetool.p.rapidapi.com",
      },
      body: encodedParams,
    };

    fetch("https://dnaber-languagetool.p.rapidapi.com/v2/check", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMatches(response.matches);
      })
      .catch((err) => console.error(err));
  };
  // useEffect(() => {
  //   console.log(text);

  //   // function wrapText(elem, start, length) {
  //   //   console.log(elem);
  //   //   var before = text.substring(0, start);
  //   //   var after = text.substring(start + length, text.length);
  //   //   var letters = text.substring(start, start + length);
  //   //   elem.innerHTML = "";
  //   //   var text1 = document.createTextNode(before);
  //   //   var text2 = document.createElement("span");
  //   //   text2.style.color = "red";
  //   //   text2.innerHTML = letters;
  //   //   var text3 = document.createTextNode(after);
  //   //   elem.appendChild(text1);
  //   //   elem.appendChild(text2);
  //   //   elem.appendChild(text3);
  //   //   console.log(text3);
  //   // }

  //   var elem = document.getElementById("grammertext");
  //   // wrapText(elem, text.length - 6, 6);

  //   matches.map((match) => {
  //     // wrapText(elem, match.context.offset, match.context.length);
  //   });
  // }, []);

  const handlesubmit = () => {
    const token = localStorage.getItem("token");
    console.log(title, text);
    fetch("https://oysterbackend.herokuapp.com/document", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        content: text,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === "DOCUMENT_CREATED_SUCCESSFULLY") {
          navigate("/dashboard");
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <UserAuthProvider>
      <div className="editor">
        <img src={logo} alt="" className="brandlogo" />
        <div>
          <div>
            <input
              type="text"
              value={title}
              placeholder="Document Title..."
              className="document_title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="editor_container">
            <Editor
              apiKey="qh47kjs2yf3ekhprumfxo739eefze0v3t0d7op6hffim2s77"
              onEditorChange={(newValue, editor) => {
                setText(editor.getContent({ format: "text" }));
              }}
              initialValue={text}
              init={{
                height: 500,
                menubar: false,
                plugins: "lists link",
                toolbar: " bold italic underline bullist numlist link h1 h2",
                content_style: "body{font-size:16px}",
              }}
            />
            {/* <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
          /> */}
          </div>
        </div>
        <AccordianMenu
          matches={matches}
          correctText={correctText}
          text={text}
          title={title}
          check={check}
          handlesubmit={handlesubmit}
        />
      </div>
    </UserAuthProvider>
  );
};

export default TextEditor;
