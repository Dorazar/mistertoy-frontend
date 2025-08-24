import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {

    const timeStamp = toy.createdAt
    const date = new Date(timeStamp)



    return (
        <article>
            <p>Name: <span>{toy.name}</span></p>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>CreatedAt: <span>{date.toLocaleDateString('he-IL')}</span></p>
            {/* {toy.owner && <p>Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>} */}
    
        </article>
    )
}