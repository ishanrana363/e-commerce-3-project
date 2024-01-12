import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/Home-page.jsx";
import ProductByBrandListPage from "./pages/ProductByBrandListPage.jsx";
import ProductByCategoryList from "./pages/ProductByCategoryList.jsx";
import ProductByKeywordList from "./pages/ProductByKeywordList.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path= "/" element={ <HomePage/> } />
                    <Route path="/by-brand/:id" element={<ProductByBrandListPage/>} />
                    <Route path="/by-category/:id" element={< ProductByCategoryList />} />
                    <Route path="/by-keyword/:keyword" element={< ProductByKeywordList />} />
                    <Route path= "/details/:id" element={<ProductDetailsPage/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
