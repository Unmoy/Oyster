import React, { useState, useEffect, useRef, useMemo } from "react";
import "./TextEditor.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import files from "../../assets/images/files.png";
import downloadcircle from "../../assets/images/arrow-down-circle.png";
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
import { createEditor } from "slate";
import RichTextEditor from "react-rte";
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";
const TextEditor = () => {
  const editor = useState(() => withReact(createEditor()));
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [matches, setMatches] = useState([]);
  const [hover, setHover] = useState(false);
  const [rawText, setRawText] = useState("<u>Hello I am from values</u>");
  const [save, setSave] = useState(false);
  const [plagStatus, setPlagStatus] = useState("none");
  const [plagData, setPlagData] = useState({});
  // const [counter, setCounter] = useState(0);
  // console.log("Start", rawText);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!save) {
      const interval = setInterval(() => {
        // setCounter(counter + 1);
        // console.log(counter);
        console.log("timer");
        if (!save) {
          saveContent(title, text);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [save]);
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
    setRawText(newText);
    let newMatches = matches;
    newMatches.splice(index, 1);
    setMatches([]);
    check(newText);
    // console.log("new", newText);
  };

  const checkWebHook = (scanID) => {
    fetch(`https://oysterbackend.herokuapp.com/document/webhook/${scanID}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.status === "pending") {
          console.log(
            "pending",
            data,
            data.result,
            data.result.internet.length
          );
          setPlagStatus("pending");
          setPlagData(data.result);
          checkWebHook(scanID);
        } else if (data.status === "completed") {
          setPlagStatus("completed");
          console.log("completed", data);
          setPlagData(data.scanResult.results);
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const checkPlagarism = (PlagarismContent) => {
    console.log("PlagCheck", PlagarismContent);
    fetch(`https://oysterbackend.herokuapp.com/document/${id}/plagarism`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: PlagarismContent,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === "SCAN_CREATED_SUCCESSFULLY") {
          checkWebHook(data.scanId);
          console.log(data);
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
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

  const handlekeypress = (e) => {
    // console.log("key", e);
    if (e.keyCode == 32 || e.keyCode == 190 || e.keyCode == 188) {
      // console.log("Space");
      check();
      console.log("SAVE DOC", title, text);
      saveContent(title, text);
      // console.log("key");
    } else {
      // decorateText(matches);
    }
  };

  const saveContent = (heading, Savebody) => {
    console.log("SAVE", heading, Savebody);
    fetch(`https://oysterbackend.herokuapp.com/document/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: heading,
        content: Savebody,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === "DOCUMENT_UPDATED_SUCCESSFULLY") {
          setSave(true);
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
    check();
  }, []);
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
            setRawText(data.content);
            console.log("SET");
          } else {
            console.log(data.message);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [id]);

  // useEffect(() => {
  //   console.log("Content", content);
  // }, [content]);
  // useEffect(() => {
  //   // decorateText(text);
  //   // setContent(text);
  //   console.log("text", text);
  // }, [text]);
  // const [newcontent, setValue] = useState(RichTextEditor.createEmptyValue());
  // const handleTxextEEditor = (value) => {
  //   console.log(value);
  // };
  // const [body, setBody] = useState("");
  // console.log(body);
  const handleBody = (value) => {
    const newText = value.replace(/<[^>]+>/g, "");
    // console.log("HTML", value, newText.length);
    // let span = document.createElement("span");
    // span.innerHTML = value;
    // console.log("InnerHTML", span.innerHTML, span.innerText);
    // setBody(newText);s
    setText(newText);
    setRawText(value);
    setSave(false);
    // console.log("TEXT && RAWTEXT", text, rawText);
    console.log("TextUpdated", newText);
  };
  //   class HeaderBlot extends Block { }
  // HeaderBlot.blotName = 'header';
  //   HeaderBlot.tagName = ['h1', 'h2'];
  //   Quill.register(HeaderBlot);
  const modules = {
      toolbar: [
        // [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
      ],
    },
    formats = [
      "header",
      "bold",
      "italic",
      "underline",

      "list",
      "bullet",
      "link",
    ];
  return (
    <UserAuthProvider>
      <div className="editor">
        <img src={logo} alt="" className="brandlogo" />
        <div>
          <div className="text_editor_header">
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.625 1.5835H6.45C6.15 1.5835 5.85 1.74183 5.625 1.97933C5.4 2.21683 5.25 2.5335 5.25 2.85016V12.9835C5.25 13.3002 5.4 13.6168 5.625 13.8543C5.85 14.0918 6.15 14.2502 6.45 14.2502H13.8C14.1 14.2502 14.4 14.0918 14.625 13.8543C14.85 13.6168 15 13.3002 15 12.9835V5.146L11.625 1.5835Z"
                stroke="#B3B4C5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.25 6.0166V16.1499C2.25 16.4666 2.4 16.7833 2.625 17.0208C2.85 17.2583 3.15 17.4166 3.45 17.4166H10.8"
                stroke="#B3B4C5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.25 1.5835V5.54183H15"
                stroke="#B3B4C5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <input
              type="text"
              value={title}
              placeholder="Document Title..."
              className="document_title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <div className="document_btns">
              <button className="document_copy">
                <img src={files} alt="" className="document_btns_icon" />
                Copy
              </button>
              <button className="document_download">
                <img
                  src={downloadcircle}
                  alt=""
                  className="document_btns_icon"
                />
                Download
              </button>
            </div>
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
            <ReactQuill
              onChange={handleBody}
              onKeyDown={handlekeypress}
              value={rawText}
              preserveWhitespace={true}
              className="text_editor_quill"
              modules={modules}
              formats={formats}
            ></ReactQuill>
            {/* <RichTextEditor value={newcontent} onChange={handleTxextEEditor} /> */}
            {/* <Editor
              toolbarClassName="toolbar-class"
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              defaultEditorState={content}
              onChange={handleChange}
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
          handleHover={handleHover}
          setHover={setHover}
          setRawText={setRawText}
          save={save}
          checkPlagarism={checkPlagarism}
          plagStatus={plagStatus}
          plagData={plagData}
        />
      </div>
    </UserAuthProvider>
  );
};

export default TextEditor;
