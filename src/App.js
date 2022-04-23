import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import apiConfig from "./api/apiConfig";
import apiEndPoints from "./api/apiEndpoints";
import Footer from "./components/footer/Footer";
import { AUTH_TOKEN } from "./constants/store";
import useErrorHandler from "./error/useErrorHandler";
import Playground from "./pages/playground/Playground";
import RecordHistories from "./pages/recordHistory/RecordHistories";
import Login from "./pages/signup_login/Login";
import Signup from "./pages/signup_login/Signup";
import { setAuthUser, setRecordHistories } from "./redux/slices/userSlice";
import store from "./store/store";

function App() {
  const navigate = useNavigate();
  const { handleError } = useErrorHandler();

  // Redux - Start
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // Redux - End

  // Effect - Start
  useEffect(() => {
    const existingToken = store.getItem(AUTH_TOKEN);
    if (existingToken) {
      dispatch(setAuthUser(existingToken));
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // get histories from api
    if (user.authToken) {
      apiConfig
        .getApiInstance()
        .get(apiEndPoints.recordHistories)
        .then((res) => {
          if (res.status === 200) {
            dispatch(setRecordHistories(res.data.recordHistories));
          }
        })
        .catch((err) => handleError(err));
    }
    // eslint-disable-next-line
  }, [user.authToken]);
  // Effect - End

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recordHistories" element={<RecordHistories />} />
        <Route path="/" element={<Playground />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
