import { Route, Routes } from "react-router-dom";
import Feed from "../pages/Feed";
import Post from "../pages/Post";
import Update from "../pages/Update";
import More from "../pages/More";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";

export default function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/feed"
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />
        <Route
          path="/posts"
          element={
            <PrivateRoute>
              <Post />
            </PrivateRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <PrivateRoute>
              <Update />
            </PrivateRoute>
          }
        />
        <Route
          path="/more/:id"
          element={
            <PrivateRoute>
              <More />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}