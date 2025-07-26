import { memo } from 'react'

const Card = memo(({ politicians }) => {
    const { name, biography, position } = politicians;
    console.log('La card di ' + name + ' si è renderizzata');
    return (
        <li className="list-group-item card">
            <div className="card-body">
                <h4 className="card-title text-uppercase fw-bold">{name}</h4>
                <p className="card-text mt-3">
                    <strong className="d-block">Biography:</strong>
                    <span>{biography}</span>
                </p>
                <p className="card-text mt-3">
                    <strong className="d-block">Position:</strong>
                    <span>{position}</span>
                </p>
            </div>
        </li>
    )
})

export default Card