import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function AdminProtectWrapper({children}){
    const {isLoggedIn,user}=useSelector((state)=>state.auth);
    if(!isLoggedIn||!user||user.role!="admin"){
        return <Navigate to="/admin-login" />;
    }
    return children;
}
export default AdminProtectWrapper;
