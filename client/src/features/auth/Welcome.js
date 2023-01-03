import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {

    const { username, isManager, isAdmin } = useAuth()

    //Setting up Date
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome {username}!</h1>
            
            {/*links */}

            <p><Link to="/dash/notes">View Jot Downs</Link></p>

            <p><Link to="/dash/notes/new">Add New Jot Down</Link></p>

            {/*If user is Manager or Admin they will have access to these links  */}
            {(isManager || isAdmin) && <p><Link to="/dash/users">View User Settings</Link></p>}

            {(isManager || isAdmin) && <p><Link to="/dash/users/new">Add New User</Link></p>}


        </section>
    )

    return content
}
export default Welcome