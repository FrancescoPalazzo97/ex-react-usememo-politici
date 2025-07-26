import { useState, useEffect, useMemo } from "react"

const PoliticiansList = () => {
    const [politicians, setPoliticians] = useState(null);
    const [search, setSearch] = useState(``);
    const [loading, setLoading] = useState(true);

    async function getPoliticians() {
        console.log('Sto recuperando i dati dal server...');
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:3333/politicians`);
            const data = await res.json();
            console.log('Dati recuperati!!!');
            setPoliticians(data);
        } catch (e) {
            console.error('Errore durante il recupero dei dati dal server:\n', e);
        } finally {
            setLoading(false);
            console.log('Ho finito!!!');
        }
    }

    useEffect(() => {
        getPoliticians();
    }, [])

    const filteredPoliticians = useMemo(() => {
        if (!search.trim()) return politicians;
        return politicians.filter(p =>
            p.name.toLowerCase().includes(search.trim().toLowerCase()) ||
            p.biography.toLowerCase().includes(search.trim().toLowerCase())
        );
    }, [search, politicians]);

    if (loading)
        return <>Caricamento...</>;

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
                {filteredPoliticians.length === 0 ? (
                    <li className="list-group-item">Nessun politico trovato.</li>
                ) : (
                    filteredPoliticians.map((p, i) => (
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
                    ))
                )}
            </ul>
        </div>
    )
}

export default PoliticiansList
