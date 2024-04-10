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
import RequireAuth from "./middleware/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import PersistLogin from "./middleware/PersistLogin";


//try nested Outlet like persistlogin and requireAuth
//mongoose documentarys

//Object Look Up
const ROLES = {
  user:2001,
  editor:1984,
  admin: 5150
}
//Not safe way !

//ADD one more roles and page for this role

function App() {
 //Creating normal routes and procted routes with RequireAuth Middleware
  return (
    <main className="App">
        <Header />
        <Routes>
          <Route path="/" element={ <Layout /> }>

            {/* Puplic Routes */}
            <Route path="register" element={<Register />}/>
            <Route path="login" element={<Login />}/>
            <Route path="linkpage" element={<LinkPage />} />

            {/* Persist Login Control */}
            <Route element={<PersistLogin />}> 

              {/* Private Routes */}
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

            </Route>

            {/* If user role no propiate for desired path-route-page redirect to Unauthorized */}
            <Route path="unauhorized" element={<Unauthorized />} />

            {/* If url path not match upper routes redirect to Missing Page / */}
            <Route path="*" element={<Missing />} />

          </Route>
        </Routes>
    </main>
  );
}

export default App;
