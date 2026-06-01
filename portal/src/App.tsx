import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { ApplyPage } from "./pages/ApplyPage";
import { ContactPage } from "./pages/ContactPage";
import { SimplePage } from "./pages/SimplePage";
import { StaffPage } from "./pages/StaffPage";
import { AdminPage } from "./pages/AdminPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:slug" element={<ServiceDetailPage />} />
        <Route path="apply/:slug" element={<ApplyPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route
          path="collections"
          element={
            <SimplePage
              title="Архивные фонды"
              text="Сведения о фондах, описях и единицах хранения ЦГА ВКО. Каталог пополняется."
            />
          }
        />
        <Route
          path="digital"
          element={
            <SimplePage
              title="Электронный архив"
              text="Доступ к оцифрованным документам и электронным описаниям фондов."
            />
          }
        />
        <Route
          path="map"
          element={
            <SimplePage
              title="Карта"
              text="Географическая привязка документов и фондов Восточно-Казахстанской области."
            />
          }
        />
        <Route
          path="about"
          element={
            <SimplePage
              title="Об архиве"
              text="Центральный государственный архив Восточно-Казахстанской области ведёт комплектование, учёт, хранение и использование архивных документов."
            />
          }
        />
        <Route path="staff" element={<StaffPage />} />
        <Route path="admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}
