import AdminSignInForm from "../../components/layout/AdminSignIn/AdminSignInForm";
import AdminLayout from "../../components/layout/AdminSignIn/AdminLayout";

const AdminSignInPage: React.FC = () => {
  return (
    <AdminLayout>
      <AdminSignInForm />
    </AdminLayout>
  );
}   

export default AdminSignInPage;