import React, { useState, useEffect } from "react";
import "./TextEditor.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import files from "../../assets/images/files.png";
import downloadcircle from "../../assets/images/arrow-down-circle.png";
import AccordianMenu from "./AccordianMenu";
import { UserAuthProvider } from "../context/UserContext";
import logo from "../../assets/images/O.png";
import { Link, useNavigate, useParams } from "react-router-dom";

const TextEditor = () => {
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
  const [ignoredWords, setIgnoredWords] = useState([]);
  const [ignoredRules, setIgnoredRules] = useState([]);
  const [ignoredCategories, setIgnoredCategories] = useState([]);
  // const [counter, setCounter] = useState(0);
  // console.log("Start", rawText);
  const [loading, setLoading] = useState(false);
  const addIgnoredRule = (match) => {
    setIgnoredRules([...ignoredRules, match.rule.id]);
    check();
  };

  const addIgnoredWord = (match) => {
    const newText = text.substring(match.offset, match.offset + match.length);
    console.log(newText);
    setIgnoredWords([...ignoredWords, newText]);
    console.log(newText);
    setMatches([]);
    check();
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!save) {
      const interval = setInterval(() => {
        // setCounter(counter + 1);
        // console.log(counter);
        console.log("timer");
        if (!save) {
          saveContent(title, text);
          check(text);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [save]);
  const handleHover = (match, index) => {
    // console.log("done", index);
    const newText =
      text.substring(0, match.offset) +
      // '<b style="background-color:red; color:white">' +
      `<span style="background-color: rgb(250, 204, 204);">` +
      text.substring(match.offset, match.offset + match.length) +
      "</span>" +
      // "</b>" +
      text.substring(match.offset + match.length, text.length);
    setRawText(newText);
  };
  const resetHover = () => {
    setRawText(text);
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
    // // setContent(editedText);
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
          // console.log(
          //   "pending",
          //   data,
          //   data.result,
          //   data.result.internet.length
          // );
          setPlagStatus("pending");
          setPlagData(data.result);
          checkWebHook(scanID);
        } else if (data.status === "completed") {
          setLoading(false);
          setPlagStatus("completed");
          // console.log("completed", data);
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
          // console.log(data);
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
    encodedParams.append("disabledRules", ignoredRules);

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
        filterMatches(response.matches);
        // console.log(response.matches);
      })
      .catch((err) => console.error(err));
  };

  const filterMatches = (matches) => {
    let newMatches = matches.filter((match) => {
      if (match.shortMessage === "Spelling mistake") {
        const newText = text.substring(
          match.offset,
          match.offset + match.length
        );
        return !ignoredWords.includes(newText);
      } else {
        return true;
      }
    });
    setMatches(newMatches);
  };

  const handlekeypress = (e) => {
    if (e.keyCode == 32 || e.keyCode == 190 || e.keyCode == 188) {
      // console.log("Space");
      check();
      console.log("SAVE DOC", title, text);
      saveContent(title, text);
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
        // console.log(data);
        if (data.message === "DOCUMENT_UPDATED_SUCCESSFULLY") {
          setSave(true);
          // console.log(data.message);
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
          // console.log(data);
          if (data) {
            // console.log(data);
            setText(data.content);
            setTitle(data.title);
            check(data.content);
            // console.log("hbkvilhvv", data.content);
            setRawText(data.content);
            // console.log("SET");
          } else {
            // console.log(data.message);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [id]);

  const handleBody = (value) => {
    const newText = value.replace(/<[^>]+>/g, "");
    if (!hover && newText !== text) {
      setText(newText);
      setRawText(value);
      setSave(false);
      setMatches([]);
      // console.log("TextUpdated", newText, value);
    }
  };

  const modules = {
      toolbar: [
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
      "strike",
      "list",
      "bullet",
      "link",
      "background",
    ];
  return (
    <UserAuthProvider>
      <div className="editor">
        <Link to="/dashboard" className="dashboard_brand_link">
          <img src={logo} alt="" className="brandlogo" />
        </Link>
        <div>
          <div className="text_editor_header">
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
                  alt="downloadcircle"
                  className="document_btns_icon"
                />
                Download
              </button>
            </div>
          </div>
          <div className="editor_container">
            <ReactQuill
              onChange={handleBody}
              onKeyDown={handlekeypress}
              value={rawText}
              preserveWhitespace={true}
              className="text_editor_quill"
              modules={modules}
              formats={formats}
            />
            {text && (
              <span className="save_text">
                {save ? (
                  <p>
                    <svg
                      width="13"
                      height="13"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      className="save_doc_icon"
                    >
                      <path d="M384 128h-128V0L384 128zM256 160H384v304c0 26.51-21.49 48-48 48h-288C21.49 512 0 490.5 0 464v-416C0 21.49 21.49 0 48 0H224l.0039 128C224 145.7 238.3 160 256 160zM255 295L216 334.1V232c0-13.25-10.75-24-24-24S168 218.8 168 232v102.1L128.1 295C124.3 290.3 118.2 288 112 288S99.72 290.3 95.03 295c-9.375 9.375-9.375 24.56 0 33.94l80 80c9.375 9.375 24.56 9.375 33.94 0l80-80c9.375-9.375 9.375-24.56 0-33.94S264.4 285.7 255 295z" />
                    </svg>
                    Document Saved
                  </p>
                ) : (
                  <p>
                    <svg
                      width="13"
                      height="13"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      className="save_doc_icon"
                    >
                      <path d="M352 0C369.7 0 384 14.33 384 32C384 49.67 369.7 64 352 64V74.98C352 117.4 335.1 158.1 305.1 188.1L237.3 256L305.1 323.9C335.1 353.9 352 394.6 352 437V448C369.7 448 384 462.3 384 480C384 497.7 369.7 512 352 512H32C14.33 512 0 497.7 0 480C0 462.3 14.33 448 32 448V437C32 394.6 48.86 353.9 78.86 323.9L146.7 256L78.86 188.1C48.86 158.1 32 117.4 32 74.98V64C14.33 64 0 49.67 0 32C0 14.33 14.33 0 32 0H352zM111.1 128H272C282.4 112.4 288 93.98 288 74.98V64H96V74.98C96 93.98 101.6 112.4 111.1 128zM111.1 384H272C268.5 378.7 264.5 373.7 259.9 369.1L192 301.3L124.1 369.1C119.5 373.7 115.5 378.7 111.1 384V384z" />
                    </svg>
                    Saving Document...
                  </p>
                )}
              </span>
            )}
          </div>
        </div>
        <div className="accordian_menu">
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
            resetHover={resetHover}
            save={save}
            checkPlagarism={checkPlagarism}
            plagStatus={plagStatus}
            plagData={plagData}
            addIgnoredWord={addIgnoredWord}
            addIgnoredRule={addIgnoredRule}
            setLoading={setLoading}
            loading={loading}
          />
        </div>
      </div>
    </UserAuthProvider>
  );
};

export default TextEditor;
