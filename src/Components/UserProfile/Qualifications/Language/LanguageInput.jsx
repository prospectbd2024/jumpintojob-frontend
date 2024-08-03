import React, { useState, useCallback, useEffect } from "react"; 

function LanguageInput({ props }) {
  const { selectedLanguage, setLanguage, selectedLanguages } = props;
  const [showSearchSuggestion, setShowSearchSuggestion] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [suggestedLanguages, setSuggestedLanguages] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/languages`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setAllLanguages(data.data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  useEffect(() => {
    const filteredLanguages = allLanguages.filter((lang) =>
      lang.language.toLowerCase().includes(searchKey.toLowerCase()) &&
      !selectedLanguages.some(selectedLang => selectedLang.language === lang.language)
    );
    setSuggestedLanguages(filteredLanguages.slice(0, 5));
  }, [searchKey, allLanguages, selectedLanguages]);

  const handleSearchFocus = useCallback(() => {
    setShowSearchSuggestion(true);
  }, []);

  const handleSearchBlur = useCallback(() => {
    setTimeout(() => {
      setShowSearchSuggestion(false);
    }, 200);
  }, []);

  const handleChange = (e) => {
    setSearchKey(e.target.value);
    setLanguage((prev) => ({ ...prev, language: e.target.value }));
  };

  const onLanguageClick = (language) => {
    setLanguage((prev) => ({ ...prev, language: language.language, proficiency: 'Beginner' }));
    setSearchKey(language.language);
    setShowSearchSuggestion(false);
  };

  useEffect(() => {
    setSearchKey(selectedLanguage.language || "");
  }, [selectedLanguage]);

  return (
    <div className="relative">
      <label htmlFor="language" className="font-bold text-lg">
        Select Language
      </label>
      <input
        type="text"
        id="language"
        className="w-full p-2 mt-1 border border-secondary rounded box-border outline-none"
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
        value={searchKey}
        onChange={handleChange}
      />
      {showSearchSuggestion && suggestedLanguages.length > 0 && (
        <div className="absolute top-full left-0 w-full min-h-10 bg-white border border-secondary border-t-0 rounded-b overflow-hidden z-10">
          <ul className="list-none p-0 m-0">
            {suggestedLanguages.map((language, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer transition-colors duration-300 hover:bg-gray-100"
                onMouseDown={() => onLanguageClick(language)}
              >
                {language.language}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LanguageInput;
