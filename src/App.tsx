import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SiteContentProvider, useSiteContentContext } from '@/context/SiteContentContext';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { AdminLayout } from '@/components/AdminLayout/AdminLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';

import { Home } from '@/pages/Home/Home';
import { Services } from '@/pages/Services/Services';
import { About } from '@/pages/About/About';
import { Contacts } from '@/pages/Contacts/Contacts';
import { QuizPage } from '@/pages/QuizPage/QuizPage';
import { AdminLogin } from '@/pages/Admin/Login/AdminLogin';
import { Dashboard } from '@/pages/Admin/Dashboard/Dashboard';
import { ContentEditor } from '@/pages/Admin/ContentEditor/ContentEditor';
import { ServicesEditor } from '@/pages/Admin/ServicesEditor/ServicesEditor';
import { ContactsEditor } from '@/pages/Admin/ContactsEditor/ContactsEditor';

function PublicLayout() {
  const { content } = useSiteContentContext();
  return (
    <>
      <Header content={content} />
      <main style={{ minHeight: '100vh', paddingTop: 'var(--header-height)' }}>
        <Outlet />
      </main>
      <Footer content={content} />
    </>
  );
}

function HomePageWrapper() {
  const { content } = useSiteContentContext();
  return <Home content={content} />;
}

function ServicesPageWrapper() {
  const { content } = useSiteContentContext();
  return <Services content={content} />;
}

function AboutPageWrapper() {
  const { content } = useSiteContentContext();
  return <About content={content} />;
}

function ContactsPageWrapper() {
  const { content } = useSiteContentContext();
  return <Contacts content={content} />;
}

function DashboardPageWrapper() {
  return <Dashboard />;
}

function ContentEditorPageWrapper() {
  const { content, updateHero, updateAbout, updateCompanyName, updateLogo, updateSeo, resetContent } = useSiteContentContext();
  return (
    <ContentEditor
      content={content}
      onUpdateHero={updateHero}
      onUpdateAbout={updateAbout}
      onUpdateCompanyName={updateCompanyName}
      onUpdateLogo={updateLogo}
      onUpdateSeo={updateSeo}
      onReset={resetContent}
    />
  );
}

function ServicesEditorPageWrapper() {
  const { content, addService, updateService, deleteService } = useSiteContentContext();
  return (
    <ServicesEditor
      services={content.services}
      onAdd={addService}
      onUpdate={updateService}
      onDelete={deleteService}
    />
  );
}

function ContactsEditorPageWrapper() {
  const { content, updateContacts } = useSiteContentContext();
  return <ContactsEditor content={content} onUpdateContacts={updateContacts} />;
}

export default function App() {
  return (
    <HelmetProvider>
      <SiteContentProvider>
        <BrowserRouter>
          <Routes>
            {/* Public site */}
            <Route element={<PublicLayout />}>
              <Route index element={<HomePageWrapper />} />
              <Route path="services" element={<ServicesPageWrapper />} />
              <Route path="about" element={<AboutPageWrapper />} />
              <Route path="contacts" element={<ContactsPageWrapper />} />
              <Route path="quiz" element={<QuizPage />} />
            </Route>

            {/* Admin login (no layout) */}
            <Route path="admin" element={<AdminLogin />} />

            {/* Admin panel (protected) */}
            <Route
              path="admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<DashboardPageWrapper />} />
              <Route path="content" element={<ContentEditorPageWrapper />} />
              <Route path="services" element={<ServicesEditorPageWrapper />} />
              <Route path="contacts" element={<ContactsEditorPageWrapper />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SiteContentProvider>
    </HelmetProvider>
  );
}
