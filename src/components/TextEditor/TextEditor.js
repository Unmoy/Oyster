import React, { useState, useEffect, useRef, useMemo } from "react";
import "./TextEditor.css";
import AccordianMenu from "./AccordianMenu";
// import { Editor } from "@tinymce/tinymce-react";
import { UserAuthProvider } from "../context/UserContext";
import logo from "../../assets/images/O.png";
import { useNavigate, useParams } from "react-router-dom";
// import { EditorState } from "draft-js";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
// import JoditEditor from "jodit-react";
// import "draft-js/dist/Draft.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("Hello I am from initial value");
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [matches, setMatches] = useState([]);
  const [hover, setHover] = useState(false);
  const [rawText, setRawText] = useState("<u>Hello I am from values</u>");
  // console.log("Start", rawText);
  const token = localStorage.getItem("token");

  const handleHover = (match, index) => {
    // console.log("done");
    // const newText =
    //   text.substring(0, match.offset) +
    //   '<span style="background-color:red; color:white">' +
    //   text.substring(match.offset, match.offset + match.length) +
    //   "</span>" +
    //   text.substring(match.offset + match.length, text.length);
    // setRawText(newText);
  };

  const decorateText = (matches) => {
    // let editText = text;
    // let editedText = "";
    // let index = 0;
    // // console.log(editText, editedText, index);
    // matches?.forEach((match) => {
    //   let neweditedText;
    //   if (match.offset - index === 0) {
    //     neweditedText =
    //       "<span style='text-decoration:underline; text-decoration-thickness: 3px; text-decoration-color:red'>" +
    //       editText.substring(
    //         match.offset - index,
    //         match.offset + match.length - index
    //       ) +
    //       "</span>";
    //   } else {
    //     neweditedText =
    //       editText.substring(0, match.offset - index) +
    //       "<span style='text-decoration:underline; text-decoration-thickness: 3px; text-decoration-color:red'>" +
    //       editText.substring(
    //         match.offset - index,
    //         match.offset + match.length - index
    //       ) +
    //       "</span>";
    //   }
    //   editText = editText.substring(
    //     match.offset + match.length - index,
    //     editText.length
    //   );
    //   index = match.offset + match.length;
    //   editedText = editedText + neweditedText;
    //   // con/sole.log(editText, editedText, index);
    // });
    // editedText = editedText + editText;
    // // console.log(editText, editedText, index);
    // setRawText(editedText);
    // setContent(editedText);
  };

  const correctText = (match, index) => {
    const newText =
      text.substring(0, match.offset) +
      match.replacements[0].value +
      text.substring(match.offset + match.length, text.length);

    // const newText = text.replace(
    //   text.substring(match.offset, match.offset + match.length),
    //   match.replacements[0].value
    // );
    setText(newText);
    let newMatches = matches;
    newMatches.splice(index, 1);
    setMatches([]);
    check(newText);
    // console.log("new", newText);
  };

  const check = (newText) => {
    // console.log(text);
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
        // console.log(response);
        setMatches(response.matches);
        // decorateText(response.matches);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    check();
  }, []);
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
    console.log("key");
    if (e.keyCode == 32 || e.keyCode == 46 || e.keyCode == 44) {
      // console.log("Space");
      check();
      saveContent(title, text);
      console.log("key");
    } else {
      // decorateText(matches);
    }
  };

  useEffect(() => {
    if (id) {
      fetch(`https://oysterbackend.herokuapp.com/document/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data) {
            // console.log(data);
            setText(data.content);
            setTitle(data.title);
            check(data.content);
            // console.log("hbkvilhvv", data.content);
            setContent(data.content);
          } else {
            console.log(data.message);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [id]);

  const saveContent = (heading, body) => {
    console.log("SAVE", heading, body);
    fetch(`https://oysterbackend.herokuapp.com/document/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: heading,
        content: body,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === "DOCUMENT_UPDATED_SUCCESSFULLY") {
          console.log(data.message);
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handlesubmit = (status) => {
    // console.log(title, text);
    if (id) {
      fetch(`https://oysterbackend.herokuapp.com/document/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content: text,
          status,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.message === "DOCUMENT_UPDATED_SUCCESSFULLY") {
            navigate("/dashboard");
          } else {
            console.log(data.message);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
    // else {
    // fetch("https://oysterbackend.herokuapp.com/document", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify({
    //     title,
    //     content: text,
    //     status,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.message === "DOCUMENT_CREATED_SUCCESSFULLY") {
    //       navigate("/dashboard");
    //     } else {
    //       console.log(data.message);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
    // }
  };

  // console.log(content);
  // const handleChange = (newContent) => {
  //   const text2 = JSON.stringify(newContent);
  //   console.log(text2);
  // };
  const [content, setContent] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(text))
    )
  );
  // console.log(content);
  const handleChange = (content) => {
    // setContent(content.blocks[0].text);
    setText(content.blocks[0].text);
    setContent(content.blocks[0].text);
    // console.log(content);
  };

  useEffect(() => {
    console.log("Content", content);
  }, [content]);
  useEffect(() => {
    // decorateText(text);
    // setContent(text);
    console.log("text", text);
  }, [text]);
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
            {/* <Editor
              apiKey="qh47kjs2yf3ekhprumfxo739eefze0v3t0d7op6hffim2s77"
              onEditorChange={(newValue, editor) => {
                setText(editor.getContent({ format: "text" }));
                setRawText(editor.getContent());
              }}
              initialValue={rawText}
              onKeyPress={handlekeypress}
              init={{
                height: 500,
                menubar: false,
                plugins: "lists link",
                toolbar: "bold italic underline bullist numlist link h1 h2",
                content_style: "body{font-size:16px}",
              }}
              value={rawText}
            /> */}
            <Editor
              toolbarClassName="toolbar-class"
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              defaultEditorState={content}
              onChange={handleChange}
              onKeyPress={handlekeypress}
              // value={rawText}
              toolbar={{
                options: ["inline", "list", "blockType"],
                inline: {
                  inDropdown: false,
                  options: ["bold", "italic", "underline"],
                },
                list: {
                  inDropdown: false,
                  options: ["unordered", "ordered"],
                },
                link: { inDropdown: false },
                blockType: {
                  inDropdown: false,
                  options: ["H1", "H2"],
                },
              }}
            />
          </div>
        </div>
        <AccordianMenu
          matches={matches}
          correctText={correctText}
          text={text}
          title={title}
          check={check}
          handlesubmit={handlesubmit}
          handleHover={handleHover}
          setHover={setHover}
          setRawText={setRawText}
        />
      </div>
    </UserAuthProvider>
  );
};

export default TextEditor;
