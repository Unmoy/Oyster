import { useEffect, useState } from "react";
import { UserAuthProvider } from "../context/UserContext";
import React from "react";
function SimpleEditor() {
  const [text, setText] = useState("thes is a text with som errorrs");
  const [matches, setMatches] = useState([]);
  const correctText = (match, index) => {
    setText(
      text.replace(
        text.substr(match.context.offset, match.context.length),
        match.replacements[0].value
      )
    );
    let newMatches = matches;
    newMatches.splice(index, 1);
    setMatches([]);
    check();
  };
  const check = () => {
    console.log(text);
    const encodedParams = new URLSearchParams();
    encodedParams.append("language", "en-US");
    encodedParams.append("text", text);

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
    <UserAuthProvider>
      <div className="text-center p-3">
        <textarea
          id="textarea"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          rows="10"
          cols="100"
        />
        <br />
        <button onClick={check}>Check</button>
        {matches && matches.length > 0 && (
          <>
            {matches.map((match, index) => (
              <div key={index} className="border border-dark p-1 m-1">
                <span className="text-danger">
                  <s>
                    {text.substr(match.context.offset, match.context.length)}
                  </s>
                </span>
                <span className="text-success">
                  {match.replacements[0].value}
                </span>
                <br />
                <span className="text-warning">{match.message}</span>
                <button
                  onClick={() => {
                    correctText(match, index);
                  }}
                >
                  Correct
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </UserAuthProvider>
  );
}

export default SimpleEditor;
