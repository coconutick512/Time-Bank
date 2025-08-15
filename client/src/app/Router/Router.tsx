import SignPage from "@/pages/SignPage";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router";


export default function Router() {
  


  return (
    <Routes>

      <Route path='/' element={<SignPage />} />
    </Routes>
  );
}
