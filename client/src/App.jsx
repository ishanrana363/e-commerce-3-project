import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/Home-page.jsx";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path= "/" element={ <HomePage/> } />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;