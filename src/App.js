import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import Login from './views/authUser/components/Login';
import Registration from "./views/authUser/components/Registration";
import Overview from "./views/overview/components/Overview";
import ProtectedRoutes from "./Core/Common/components/ProtectedRoutes";
import BillForm from "./views/overview/components/Bill/BillForm";
import Settings from "./views/settings/components/Settings";
import Category from "./views/settings/components/Category";
import CategoryForm from "./views/settings/components/Category/CategoryForm";
import Bills from "./views/overview/components/Bills";


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/registration" element={<Registration />}/>
            <Route exact path="/login" element={<Login />}/>
            <Route path="/" element={<ProtectedRoutes/>}>
                <Route path="/" element={<Overview />}/>
                <Route path="/bills" element={<Bills />}/>
                <Route path="/add-new-bill" element={<BillForm/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/category" element={<Category/>}/>
                <Route path="/add-new-category" element={<CategoryForm/>}/>
            </Route>
        </Routes>
    </BrowserRouter>);
}

export default App;
