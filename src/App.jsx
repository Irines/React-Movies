import ErrorPage from "./ErrorPage";
import Home from "./pages/Home/home";
import Contacts from "./pages/Contacts/contacts";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/header";
import "app.sass";

function App() {
    return (
        <div className="app">
            <Header />
            <Routes>
                <Route path="*" element={<ErrorPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/contacts" element={<Contacts />} />
            </Routes>
        </div>
    );
}

export default App;
