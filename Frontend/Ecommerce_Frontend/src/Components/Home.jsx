import React from "react";
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
export default function Home() {
  const handleNavigate = (value) => {
    alert(value);
  };
  return (
    <div className="home">
      <button
        class="button-24"
        role="button"
        onClick={() => {
          handleNavigate("/get");
        }}
      >
        Get Api
      </button>
      <button
        class="button-24"
        role="button"
        onClick={() => {
          handleNavigate("/post");
        }}
      >
        Post APi
      </button>
      <button
        class="button-24"
        role="button"
        onClick={() => {
          handleNavigate("/put");
        }}
      >
        Put APi
      </button>
      <button
        class="button-24"
        role="button"
        onClick={() => {
          handleNavigate("/delete");
        }}
      >
        Delete APi
      </button>
    </div>
  );
}
