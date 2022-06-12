import React, { useState, useEffect } from "react";
import "./TextEditor.css";
import AccordianMenu from "./AccordianMenu";
import { Editor } from "@tinymce/tinymce-react";
const TextEditor = () => {
  const [text, setText] = useState(
    "Write your text here to checkk thr gramar correctom"
  );
  const [matches, setMatches] = useState([]);
  const correctText = (match, index) => {
    // console.log("correct")
    const newText = text.replace(
      text.substr(match.context.offset, match.context.length),
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
  useEffect(() => {
    console.log(text);
  }, [text]);

  return (
    <div className="editor">
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
            value={text}
            init={{
              height: 500,
              menubar: false,
              plugins: "lists link",
              toolbar: " bold italic underline bullist numlist link h1 h2",
              content_style:
                "body{ font-family:Inter,sans-serif; font-size:16px }",
            }}
          />
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
