import { useState, useEffect } from "react"

const PoliticiansList = () => {

    const [politicians, setPoliticians] = useState(null);

    async function getPoliticians() {
        const res = await fetch(`http://localhost:3333/politicians`);
        const data = await res.json();
        setPoliticians(data);
    }

    useEffect(() => {
        console.log(`Recupero politici.....`)
        getPoliticians();
    }, []);

    if (!politicians)
        <>Caricamento...</>

    return (
        <ul className="list-group py-5 px-2">
            {politicians.map((p, i) => (
                <li key={i} className="list-group-item card">
                    <div className="card-body">
                        <h4 className="card-title text-uppercase fw-bold">{p.name}</h4>
                        <p className="card-text mt-3">
                            <h6 className="fw-bold">Biography:</h6>
                            <span>{p.biography}</span>
                        </p>
                        <p className="card-text mt-3">
                            <h6 className="fw-bold">Position:</h6>
                            <span>{p.position}</span>
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default PoliticiansList
