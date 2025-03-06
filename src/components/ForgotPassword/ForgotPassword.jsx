import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  // ✅ Yup Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
          values
        );

        if (data.statusMsg === "success") {
          toast.success(data.message, { duration: 3000 });
          setTimeout(() => navigate("/forgotpassword/resetcode"), 1000);
        }
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        toast.error("Failed to send reset code. Please try again.");
      }
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 pt-20">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Account Recovery</h2>

        <label className="block text-gray-700 text-lg mb-2">Your Email</label>
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

        <button
          type="submit"
          className="cursor-pointer mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          disabled={formik.isSubmitting} // Prevent multiple clicks
        >
          {formik.isSubmitting ? "Sending..." : "Send Code"}
        </button>
      </form>
    </div>
  );
}
