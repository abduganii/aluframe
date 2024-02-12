import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../components/layouts/main";
import ControllPage from "../components/page/calontol";
import ClientPage from "../components/page/clinet";
import DetailsServicePage from "../components/page/details-sevice";
import AdminHome from "../components/page/home";
import Login from "../components/page/login";
import MoreServicePage from "../components/page/more-service";
import OpenTypePage from "../components/page/open-type";
import NumberTypePage from "../components/page/open-type-number";
import OrderPage from "../components/page/order";
import PenPage from "../components/page/pen";
import PenPosition from "../components/page/pen-position";
import ColerProfilePage from "../components/page/profile-color";
import TypeProfilePage from "../components/page/profile-type";
import UgilPage from "../components/page/ugil";
import WallColerPage from "../components/page/wall-color";
import { GetMe } from "../services/glabal";

export default function AppRouter() {
  const navigate = useNavigate()
  const pashName = useLocation()

  const [role,setRole] = useState(null)
  const [user,setUser] = useState(null)
  useEffect(() => {
    const fitchMe = async() => {
      await GetMe()
        .then(res => {
          setUser(res?.data?.user)
          setRole(res?.data?.user_role)
          if (pashName?.pathname == '/') {
             navigate(`/order?page=1`);
          }
      })
      .catch(err => {
          navigate("/auth/login")
      })
    }
    if (pashName?.pathname != '/auth/login') {
      fitchMe()
  }
  },
    [pashName])
  return (
    <Routes>
      <Route path="/" element={<MainLayout role={role} user={user} />}>
        <Route path="/" element={<AdminHome />} />
        <Route path="/calt" element={<AdminHome />} />
        <Route path="/order" element={<OrderPage role={role} />} />
        <Route path="/client" element={<ClientPage />} />
        <Route path="/ask/" element={<AdminHome />} />
        <Route path="/ask/type" element={<TypeProfilePage />} />
        <Route path="/ask/coler" element={<ColerProfilePage />} />
        <Route path="/ask/colerWall" element={<WallColerPage />} />
        <Route path="/ask/moreService" element={<MoreServicePage />} />
        <Route path="/ask/cervice" element={<DetailsServicePage />} />
        <Route path="/ask/opneType" element={<OpenTypePage />} />
        <Route path="/ask/numberType" element={<NumberTypePage />} />
        <Route path="/ask/control" element={<ControllPage />} />
        <Route path="/ask/penPosition" element={<PenPosition />} />
        <Route path="/ask/pen" element={<PenPage />} />
        <Route path="/ask/ugil" element={<UgilPage />} />
        <Route path="/setting" element={<AdminHome />} />
      </Route>
      <Route path="/auth/login" element={<Login />} />
    </Routes>
  );
}
