import React, { useState, useEffect } from "react";
import "./TextEditor.css";
import AccordianMenu from "./AccordianMenu";
import { Editor } from "@tinymce/tinymce-react";
import logo from "../../assets/images/O.png";
const TextEditor = () => {
  const [text, setText] = useState(
    "Write your text here to checkk thr gramar correctom"
  );
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
  const handlekeypress = (e) => {
    console.log(e);
    if (e.keyCode == 32) {
      console.log("Space");
    }
    if (e.keyCode == 46) {
      console.log("stopo");
    }
  };
  return (
    <div className="editor">
      <img src={logo} alt="" className="brandlogo" />
      <div>
        <div>
          <input
            type="text"
            placeholder="Document Title..."
            className="document_title"
          />
        </div>
        <div className="editor_container">
          <Editor
            apiKey="qh47kjs2yf3ekhprumfxo739eefze0v3t0d7op6hffim2s77"
            onEditorChange={(newValue, editor) => {
              setText(editor.getContent({ format: "text" }));
            }}
            // value={text}
            initialValue="<p>Hello I am from initial value</p>"
            onKeyPress={handlekeypress}
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
        check={check}
      />
    </div>
  );
};

export default TextEditor;
