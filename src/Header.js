import { useContext } from "react";
import "./App.css"
import { FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";
import DataContext from "./context/DataContext";


function Header({title}){
    const { width } = useContext(DataContext);
    return(
        <header className="head">
            <h1>{title}</h1>
            { 
                width < 768 ? <FaMobileAlt /> : width < 992 ? <FaTabletAlt /> : <FaLaptop />
            }
        </header>
    );
}

Header.defaultProps = {
    title : 'Header'
}

export default Header;