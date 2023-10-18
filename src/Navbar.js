import { useEffect, useRef } from "react"

export default function Navbar({query ,movies, onSetQuery}){
  const inputEl = useRef(null);
  
  useEffect(function(){
    function callback(e){
      if(document.activeElement === inputEl.current) return;

      if(e.code === "Enter"){
// console.log("test");
        inputEl.current.focus();
        onSetQuery("")
      }
    }

    document.addEventListener("keydown", callback);
    return()=>document.addEventListener("keydown", callback)
  }, [onSetQuery])

    return(
        <nav className="nav-bar">
        <div className="logo">
          <span role="img">🍿</span>
          <h1>Cinecritic</h1>
        </div>
        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e)=> onSetQuery(e.target.value)}
          ref={inputEl}
        />
        <p className="num-results">
          Found <strong>{movies?.length}</strong> results
        </p>
      </nav>
    )
}