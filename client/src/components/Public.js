import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Jot Down!</span></h1>
            </header>
            <main className="public__main">
                <p>Our favorite saying at Jot Down is "Never Forget Again". Our mission here at Jot Down is to help the world become a less forgetful place one note at a time!</p>
                <address className="public__addr">
                    Jot Down<br />
                    20 W 34th St.<br />
                    New York, NY 10001<br />
                    <a href="tel:+18001234567">(800) 123-4567</a>
                </address>
                <br />
            </main>
            <footer>
                <Link to="/login">Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public