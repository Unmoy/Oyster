import React, { useState } from "react";
import "./TextEditor.css";
import AccordianMenu from "./AccordianMenu";
import { Editor } from "@tinymce/tinymce-react";
const TextEditor = () => {
  const [text, setText] = useState("");
  console.log(text);

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
      <AccordianMenu />
    </div>
  );
};

export default TextEditor;
