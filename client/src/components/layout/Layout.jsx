import AppNavBar from "./AppNavBar.jsx";
import Footer from "./Footer.jsx";

const Layout = (props) => {
    return (
        <div>
            <AppNavBar/>
            {
                props.children
            }
            <Footer/>
        </div>
    );
};

export default Layout;