import { Outlet } from "react-router-dom"

export const Layout = () => {
    return (
        <div>
            <header>
                {/*KATODO:Gör en navigation*/}
            </header>
            <main>
                <Outlet/> 
            </main>
            <footer>
                
            </footer>
        </div>
    )
}