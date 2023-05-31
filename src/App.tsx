import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactForm from "./components/contacts/ContactForm";
import ContactPage from "./pages/Contact";
import ViewContact from "./pages/Contact/ViewContact";
import EditContactPage from "./pages/Contact/EditContact";
import Layout from "./Layout/Layout";
import Dashboard from "./pages/Dashboard";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 50000,
    },
  },
});
function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<ContactPage />} />
            <Route path="/map" element={<Dashboard />} />
            <Route path="/new-contact" element={<ContactForm />} />
            <Route path="/contacts/:id/edit" element={<EditContactPage />} />
            <Route path="/contacts/:id" element={<ViewContact />} />
          </Routes>
        </Layout>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
