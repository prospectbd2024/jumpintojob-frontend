// LanguageInput.jsx
import React, { useState, useCallback, useEffect } from "react";
import "./LanguageInput.css";

function LanguageInput({ props }) {
  const { setLanguage } = props;
  const [showSearchSuggestion, setShowSearchSuggestion] = useState(false);
  const [isTyping, setTyping] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [suggestedLanguages, setSuggestedLanguages] = useState([]);

  useEffect(() => {
    searchKey &&
      !isTyping &&
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/languages/search/${searchKey}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          setSuggestedLanguages(data.data);
          console.log(data.data);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
  }, [isTyping, searchKey]);

  const handleSearchFocus = useCallback(() => {
    setShowSearchSuggestion(true);
  }, []);

  const handleSearchBlur = useCallback(() => {
    setTimeout(() => {
      setShowSearchSuggestion(false);
    }, 100);
  }, []);

  const handleChange = (e) => {
    setSearchKey(e.target.value);
    setTyping(true);
  };

  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setTyping(false);
    }, 500); // Adjust the timeout value as needed

    return () => clearTimeout(typingTimeout);
  }, [searchKey]);

  const onLanguageClick = (language) => {
    setLanguage((prev) => ({ ...prev, language: language.language, proficiency : 'Beginner' }));
    setSearchKey(language.language)
    // setSuggestedLanguages([]);
  };


  useEffect(()=>{
   console.log(suggestedLanguages);  
  },[suggestedLanguages])

  return (
    <div className="language-input-container">
      <label htmlFor="language" className="language-label">
        Select Language
      </label>
      <input
        type="text"
        id="language"
        className="language-input"
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
        value={searchKey || ""}
        onChange={handleChange}
      />
      <div className="language-suggestions-container" hidden={!showSearchSuggestion}>
        <ul className="language-suggestions-list">
          {suggestedLanguages &&
            suggestedLanguages.map((language, index) => (
              <li key={index} onClick={() => onLanguageClick(language)}>
                {language.language}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default LanguageInput;
