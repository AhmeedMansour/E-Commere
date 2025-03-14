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
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 py-4"> {/* Reduced py-8 to py-4 */}
      <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 -mt-8"> {/* Added -mt-8 */}
        <h2 className="text-3xl font-bold text-green-600 dark:text-green-500 mb-6 text-center">
          Account Recovery
        </h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 text-gray-900 dark:text-gray-100 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:focus:border-green-500 outline-none transition-all"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="mt-2 p-2 text-sm text-red-800 bg-red-50 dark:bg-red-900/50 dark:text-red-300 rounded-md">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 transition-all disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {formik.isSubmitting ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {formik.isSubmitting ? "Sending..." : "Send Code"}
          </button>
        </form>
      </div>
    </div>
  );
}