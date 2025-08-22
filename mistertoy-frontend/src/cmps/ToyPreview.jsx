import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {

    return (
        <article>
            <p>Name: <span>{toy.name}</span></p>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
           
            {/* {toy.owner && <p>Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>} */}
    
        </article>
    )
}