import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup"; // ✅ Import Yup
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ResetCode() {
  const navigate = useNavigate();

  // ✅ Yup Validation Schema (No spaces, only 6 digits)
  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .matches(/^\d{6}$/, "Reset code must be exactly 6 digits.") // Only numbers & 6 digits
      .required("Reset code is required."),
  });

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: { resetCode: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          { resetCode: values.resetCode }
        );

        if (data.status === "Success") {
          toast.success("Code verified successfully!");
          setTimeout(() => navigate("/forgotpassword/resetpassword"), 1000);
        }
      } catch (error) {
        console.log(error);
        const status = error.response?.status;
        if (status >= 400) {
          toast.error("Invalid reset code. Please try again.");
        }
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 py-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 -mt-8"
      >
        <h2 className="text-3xl font-bold text-green-600 dark:text-green-500 mb-6 text-center">
          Verify Reset Code
        </h2>

        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Enter Reset Code
        </label>
        <input
          type="text"
          name="resetCode"
          placeholder="Enter the reset code"
          value={formik.values.resetCode}
          onChange={(e) => {
            // ✅ Prevent spaces while typing
            formik.setFieldValue("resetCode", e.target.value.replace(/\s/g, ""));
          }}
          onBlur={formik.handleBlur} // Show errors after leaving the field
          className="w-full px-4 py-2 text-gray-900 dark:text-gray-100 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:focus:border-green-500 outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {formik.touched.resetCode && formik.errors.resetCode && (
          <div className="mt-2 p-2 text-sm text-red-800 bg-red-50 dark:bg-red-900/50 dark:text-red-300 rounded-md">
            {formik.errors.resetCode}
          </div>
        )}

        <button
          type="submit"
          className="w-full mt-6 bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 transition-all disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center"
          disabled={formik.isSubmitting} // Prevent multiple submissions
        >
          {formik.isSubmitting ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          {formik.isSubmitting ? "Verifying..." : "Verify Code"}
        </button>
      </form>
    </div>
  );
}