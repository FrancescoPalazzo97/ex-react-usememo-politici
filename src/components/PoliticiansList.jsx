import { useState, useEffect, useMemo } from "react"

const PoliticiansList = () => {

    const [politicians, setPoliticians] = useState(null);
    const [filteredPoliticians, setFilteredPoliticians] = useState([]);
    const [search, setSearch] = useState(``);

    fetch(`http://localhost:3333/politicians`)
        .then(res => res.json())
        .then(data => setPoliticians(data))
        .catch(e => console.error(`Errore durante il recupero dei dati dal server:\n`, e))

    if (!politicians)
        return <>Caricamento...</>

    return (
        <div className="container">
            <input
                type="text"
                className="form-control"
                placeholder="Inserisci testo"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <ul className="list-group py-5">
                {politicians.map((p, i) => (
                    <li key={i} className="list-group-item card">
                        <div className="card-body">
                            <h4 className="card-title text-uppercase fw-bold">{p.name}</h4>
                            <p className="card-text mt-3">
                                <strong className="d-block">Biography:</strong>
                                <span>{p.biography}</span>
                            </p>
                            <p className="card-text mt-3">
                                <strong className="d-block">Position:</strong>
                                <span>{p.position}</span>
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PoliticiansList
