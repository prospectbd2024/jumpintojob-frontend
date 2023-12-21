"use client";
import { SkillContext } from "@/UserContext/SkillContext";
import React, { useCallback, useContext, useEffect, useState } from "react";
import SkillListView from "./SkillListView";

function SearchSkills({onSkillClick,type ,search_title ,searchKey,setSearchKey,currentSkill}) {
  const [showSearchSuggestion, setShowSearchSuggestion] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const handleSearch = useCallback((e) => {
    setSearchKey(e.target.value);
    // console.log(e.target.value)
    setShowSearchSuggestion(true);
  }, []);
  const handleSearchFocus = useCallback(() => {
    setShowSearchSuggestion(true);
  }, []);
  const handleSearchBlur = useCallback(() => {
    setTimeout(() => {
      setShowSearchSuggestion(false);
    }, 100);
  });
  //get skill when search for skill
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/${type}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ key: searchKey }),
    })
      .then((rsp) => rsp.json())
      .then((data) => {
        setSearchSuggestions(data.data);
      });
      console.log('here is your ',searchSuggestions)
  }, [searchKey]);



  useEffect(()=>{
    setSearchKey(currentSkill.name)
  },[currentSkill])
  return (
    <div>
      <label htmlFor="skill">{search_title} </label>
      <input
        type="text"
        value={searchKey || ''}
        onChange={(e) => {
          handleSearch(e);
        }}
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
      />
      {showSearchSuggestion && (
        <div>
          <SkillListView
            skills={searchSuggestions}
              onSkillClick={onSkillClick}
          />
        </div>
      )}
    </div>
  );
}

export default SearchSkills;
