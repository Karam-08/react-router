import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className='card'>
        <h2>Home</h2>
        <p className="small">This is a mini project that demonstrates React Router DOM, routes, params, nested routes, and prtected routes along with page navigation.</p>
        <div className="row">
            <Link to="/courses" className="link active">Browse Courses</Link>
            <Link to="/dashboard" className="link active">Go To Dashboard</Link>
        </div>

        <hr />
        <p className="small">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, repellat vitae. Fuga adipisci quas laboriosam at temporibus animi pariatur in exercitationem quibusdam, soluta aut sunt.
        </p>
    </div>
  )
}

export default Home