export default function Navbar({movies}){
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
        />
        <p className="num-results">
          Found <strong>{movies?.length}</strong> results
        </p>
      </nav>
    )
}