import { Link } from "react-router-dom";
import Parse from "parse";

const Header = () => {

    const logOut = () => {
        Parse.User.logOut();
        window.location.reload();
    }

    return (
        <ul className="nav">
        <Link className="home" to="/">jeopardy! topics</Link>
        <ul className="links">
            <li><Link to="/stats">stats</Link></li>
            <li><Link to="/settings">settings</Link></li>
            <li><Link onClick={logOut}>Log Out</Link></li>
        </ul>
        </ul>
    );
}
export default Header;