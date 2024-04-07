import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Missing from "./components/Missing";
import Layout from "./route/Layout";
import Editor from "./components/Editor"
import Admin from "./components/Admin";
import Lounge from "./components/Lounge";
import LinkPage from "./components/LinkPage"
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Unauthrized from "./components/Unauthrized";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { axiosPrivate } from "./api/axios";



//Object Look Up
const ROLES = {
  user:2001,
  editor:1984,
  admin: 5150
}
//Not safe way !

//ADD one more roles and page for this role

function App() {
 
  return (
    <main className="App">
        <Header />
        <Routes>
          <Route path="/" element={ <Layout /> }>

            <Route path="register" element={<Register />}/>
            <Route path="login" element={<Login />}/>
            <Route path="linkpage" element={<LinkPage />} />

            <Route element={<RequireAuth allowedRoles={[ROLES.user]}/>}>
              <Route path="/" element={<Home />}></Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.editor]}/>}>
              <Route path="editor" element={<Editor />}></Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
              <Route path="admin" element={<Admin />}></Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.editor, ROLES.admin]} />}>
              <Route path="lounge" element={<Lounge/>}></Route>
            </Route>

            <Route path="unauhorized" element={<Unauthrized />} />

            <Route path="*" element={<Missing />} />

          </Route>
        </Routes>
    </main>
  );
}

export default App;
