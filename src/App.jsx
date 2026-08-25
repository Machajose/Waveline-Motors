import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./hooks/useAuth"
import PublicLayout from "./components/layout/PublicLayout"
import ProtectedRoute from "./components/layout/ProtectedRoute"
import AdminLayout from "./components/layout/AdminLayout"

import Home from "./pages/Home"
import Vehicles from "./pages/Vehicles"
import Evolution from "./pages/Evolution"
import Brands from "./pages/Brands"
import BrandDetail from "./pages/BrandDetail"
import News from "./pages/News"
import Placeholder from "./pages/Placeholder"


import AdminLogin from "./pages/admin/Login"
import AdminVehicleList from "./pages/admin/VehicleList"
import AdminVehicleForm from "./pages/admin/VehicleForm"

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/vehicles/:slug" element={<Placeholder title="Vehicle Detail" />} />
            <Route path="/evolution" element={<Evolution />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/brands/:slug" element={<BrandDetail />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<Placeholder title="Article" />} />
            <Route path="/videos" element={<Placeholder title="Waveline Media" />} />
            <Route path="/for-sale" element={<Placeholder title="Vehicles For Sale" />} />
            <Route path="/dealers" element={<Placeholder title="Dealers" />} />
            <Route path="/garage" element={<Placeholder title="Waveline Garage" />} />
            <Route path="/kenya" element={<Placeholder title="Waveline Kenya" />} />
            <Route path="/creative" element={<Placeholder title="Waveline Creative" />} />
            <Route path="/partner-with-us" element={<Placeholder title="Partner With Us" />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminVehicleList />} />
            <Route path="vehicles/new" element={<AdminVehicleForm />} />
            <Route path="vehicles/:id" element={<AdminVehicleForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
   
  )
}