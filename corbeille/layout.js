import { Outlet, Link } from "react-router-dom";
const Layout = () =>{
    return (
        <>
        <nav>
            <ul>
                <li><Link to='/Maison'>Maison</Link></li>
                <li><Link to='/Test'>Test</Link></li>
                <li><Link to='/Episodes'>Episodes</Link></li>
                <li><Link to='/Serie'>Serie</Link></li>
            </ul>
        </nav>

        <Outlet />
        </>
    )
}
export default Layout ;<end>