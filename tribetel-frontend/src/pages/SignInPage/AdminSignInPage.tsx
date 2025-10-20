import React from "react";
import AdminLayout from "../../components/layout/AdminSignIn/AdminLayout";
import AdminSignInForm from "../../components/layout/AdminSignIn/AdminSignInForm";

const AdminSignInPage: React.FC = () => {
  return (
    <AdminLayout>
      <AdminSignInForm />
    </AdminLayout>
  );
};
export default AdminSignInPage;
