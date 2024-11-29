import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Home from "./components/Dashboard/Home";
import Login from "./components/Auth/Login";
import { AdminRoute, ModeratorRoute } from './utils/RoleRoutes';
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import Register from "./components/Auth/Register";
import ModeratorDashboard from "./components/Dashboard/ModeratorDashboard";
import UserDashboard from "./components/Dashboard/UserDashboard";
function App() {

  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth/login" element={<Login/>} />
        <Route path="/auth/register" element={<Register/>} />
        <Route path="/user-dashboard" element={<UserDashboard/>}/>
        <Route path="/admin-dashboard" element={<AdminRoute component={AdminDashboard}/>}/>
        <Route path="/moderator-dashboard" element={<ModeratorRoute component={ModeratorDashboard}/>}/>

        
      </Routes>
    </Router>
  )
}

export default App;
