import React from "react";
import { Route, Navigate, Routes, Outlet } from "react-router-dom";

// const PrivateRoute = ({ element: Component, ...rest }) => {
//   return (
//     <Routes>
//       <Route
//         {...rest}
//         element={(props) => {
//           const token = window.localStorage.getItem("token"); 
         
//           if (token) {
//             return <Component {...props} />;
//           } else {
//             return <Navigate to={"/signin"} />;
//           }
          
         
//         }}
//       />
//     </Routes>
//   );
// };

const useAuth=()=>{
    const token = window.localStorage.getItem("token"); 
    if(token){
      return true
    } else {
      return false
    }
  }
  
  const  PrivateRoute=({props:any}) =>{
  
    const auth=useAuth()
  
    return auth?<Outlet/>: <Navigate to="/signin"/>
  }

export default PrivateRoute;





