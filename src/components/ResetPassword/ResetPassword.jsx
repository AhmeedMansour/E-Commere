import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();

  // ✅ Yup Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
  });

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: { email: "", newPassword: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.put(
          "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          values
        );

        if (data.token) {
          toast.success("Password reset successfully!");
          setTimeout(() => navigate("/login"), 1000);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to reset password. Try again.");
      }
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 pt-20">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm mx-auto"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Reset Your Password</h2>

        <label className="block text-gray-700 text-sm mb-2">Your Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
        )}

        <label className="block text-gray-700 text-sm mt-4 mb-2">New Password</label>
        <input
          type="password"
          name="newPassword"
          placeholder="Enter new password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {formik.touched.newPassword && formik.errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</p>
        )}

        <button
          type="submit"
          className="cursor-pointer mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          disabled={formik.isSubmitting} // Prevent multiple clicks
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
