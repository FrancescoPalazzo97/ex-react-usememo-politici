import { useState, useEffect, useMemo } from "react";
import Card from "./Card";

const PoliticiansList = () => {
    const [politicians, setPoliticians] = useState(null);
    const [search, setSearch] = useState(``);
    const [selectPosition, setSelectPosition] = useState('')
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
        if (!politicians) return [];
        return politicians.filter(p => {
            const searched = !search.trim() ||
                p.name.toLowerCase().includes(search.trim().toLowerCase()) ||
                p.biography.toLowerCase().includes(search.trim().toLowerCase());
            const selected = !selectPosition || p.position === selectPosition;
            return searched && selected
        });
    }, [search, politicians, selectPosition]);

    const positionsArray = useMemo(() => {
        if (!politicians || !Array.isArray(politicians)) return [];
        return politicians.reduce((arr, p) => {
            if (arr.includes(p.position)) return arr;
            return [...arr, p.position];
        }, [])
        //return [...new Set(filteredPoliticians.map(p => p.position))];
    }, [filteredPoliticians]);

    if (loading)
        return <>Caricamento...</>;

    return (
        <div className="container">
            <div className="d-flex">
                <div className="w-75 position-relative">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Inserisci testo"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <button onClick={() => setSearch('')} className="position-absolute del-search btn bg-transparent border-0 text-danger">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="w-25">
                    <select
                        className="form-select"
                        aria-label="Seleziona un'opzione"
                        value={selectPosition}
                        onChange={e => setSelectPosition(e.target.value)}
                    >
                        <option value=''>Posizioni</option>
                        {positionsArray.map(position => (
                            <option key={position} value={position}>{position}</option>
                        ))}
                    </select>
                </div>
            </div>
            <ul className="list-group py-5">
                {filteredPoliticians.length === 0 ? (
                    <li className="list-group-item">Nessun politico trovato.</li>
                ) : (
                    filteredPoliticians.map((p, i) => (
                        <Card key={i} politicians={p} />
                    )
                    ))}
            </ul>
        </div>
    )
}

export default PoliticiansList
