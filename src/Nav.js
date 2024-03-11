import { useContext } from 'react';
import { Link } from 'react-router-dom';
import DataContext from './context/DataContext';

function Nav(){
    const { search, setSearch } = useContext(DataContext);
    return(
        <nav className='nav'>
            <form onSubmit={(e)=> e.preventDefault()} className='formClass'>
                <input 
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}
                />
            </form>
            <ul className='menuNav'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='post'>Posts</Link></li>
                <li><Link to='about'>About</Link></li>
            </ul>
        </nav>
    );
}

export default Nav;