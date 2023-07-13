import ErrorPage from "./ErrorPage";
import Home from "./pages/Home/home";
import Contacts from "./pages/Contacts/contacts";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="" element={<ErrorPage />} />
            </Routes>
        </div>
    );
}

export default App;
