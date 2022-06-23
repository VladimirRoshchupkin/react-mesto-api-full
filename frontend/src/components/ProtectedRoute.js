import React, {useEffect} from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"; //Redirect==>Navigate

const ProtectedRoute = ({ loggedIn, children, path }) => {
  const navigate = useNavigate();
  useEffect(() => {
    !loggedIn && navigate('/sign-in')
  }, [window.location.pathname]); //починил так, из за того что <Navigate to="/sign-in" /> в рендере не работает в 6-м r-r-d, не знаю угадал или нет. ошибки в консоли отсутствуют, всё работает

  return (
    <Routes>
      <Route
        path={path}
        element={loggedIn ? children : <Navigate to="/sign-in" />}//похоже в 6-м r-r-d такая запись не работает.
      />
    </Routes>
  );
};

export default ProtectedRoute;

{
  /* <Route path={path}>
        {loggedIn ? children : <Navigate to="/login"/>}
      </Route> */
}
