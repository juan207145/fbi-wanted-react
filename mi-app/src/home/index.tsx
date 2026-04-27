import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./style.css";

function Home() {
  const [data, setData] = useState<any[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('')

  useEffect(() => {
    fetch("https://api.fbi.gov/@wanted?page=1")
      .then(res => res.json())
      .then(res => setData(res.items))
  }, [])

  const filtrados = data.filter(item =>
    item.title.toLowerCase().includes(busqueda.toLowerCase())
  )

  const resultadoFinal = filtrados.filter(item =>
    filtro === '' || item.status?.toLowerCase() === filtro
  )

 
  const esFavorito = (item:any) => {
    const fav = JSON.parse(localStorage.getItem("favoritos") || "[]")
    return fav.some((f:any) => f.uid === item.uid)
  }

  
  const toggleFavorito = (item:any) => {
    let fav = JSON.parse(localStorage.getItem("favoritos") || "[]")

    const existe = fav.find((f:any) => f.uid === item.uid)

    if (existe) {
      fav = fav.filter((f:any) => f.uid !== item.uid)
    } else {
      fav.push(item)
    }

    localStorage.setItem("favoritos", JSON.stringify(fav))
    setData([...data]) // refresca
  }

  return (
    <>
      <h2>Personas buscadas</h2>

      <input
        type="text"
        placeholder="Buscar..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="filtros">
        <button onClick={() => setFiltro('')}>Todos</button>
        <button onClick={() => setFiltro('na')}>Activos</button>
        <button onClick={() => setFiltro('captured')}>Capturados</button>
      </div>

      <div className="contenedor">
        {resultadoFinal.map((item) => (
          <div key={item.uid} className="card">

            <img src={item.images?.[0]?.original} />

            <h3>{item.title}</h3>

            <p>{item.status}</p>

            <Link to={`/detalle/${item.uid}`} state={item}>
              Ver más
            </Link>

           <button onClick={() => toggleFavorito(item)}>
              {esFavorito(item) ? "❤️" : "🤍"}
            </button>

          </div>
        ))}
      </div>
    </>
  )
}

export default Home;