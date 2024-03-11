import Feed from "./Feed";
import './App.css'
import { useContext } from "react";
import DataContext from "./context/DataContext";


function Home(){
    const { searchResult } = useContext(DataContext);
    return(
        <main >
            {
                searchResult.length ? (
                    <Feed 
                        posts={searchResult}
                    />
                    
                ):
                (
                    <p>No posts to display</p>
                )
            }
        </main>
    );
}

export default Home;