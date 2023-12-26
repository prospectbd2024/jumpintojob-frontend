"use client";
import React, { useCallback, useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

function SkillRating({ setCurrentSkill, currentSkill, rate_title }) {
  const increase_rating = useCallback(() => {
    if (currentSkill.rating < 5) {
      setCurrentSkill((prev) => {
        return { ...prev, rating: prev.rating + 0.5 };
      });
      console.log(currentSkill);
    }
  }, [currentSkill]);
  const decrease_rating = useCallback(() => {
    if (currentSkill.rating > 0) {
      setCurrentSkill((prev) => {
        return { ...prev, rating: prev.rating - 0.5 };
      });
    }
  }, [currentSkill]);
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "200px 50px 50px 50px" }}
    >
      <div>
        <label htmlFor="rating">{rate_title}</label>
      </div>
      <div style={{ marginInline: "auto",cursor : 'pointer' }} onClick={decrease_rating}>
        <HiMinus />
      </div>
      <input
        style={{ textAlign: "center", height: "10px", marginTop: "10px" }}
        type="text"
        value={currentSkill.rating}
        readOnly
      />
      <div style={{ marginInline: "auto",cursor : 'pointer' }} onClick={increase_rating}>
        <HiPlus />
      </div>
    </div>
  );
}

export default SkillRating;
