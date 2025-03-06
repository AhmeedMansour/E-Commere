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
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 pt-20">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          Verify Reset Code
        </h2>

        <label className="block text-gray-700 text-lg mb-2">
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 
            [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {formik.touched.resetCode && formik.errors.resetCode && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.resetCode}</p>
        )}

        <button
          type="submit"
          className="cursor-pointer mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          disabled={formik.isSubmitting} // Prevent multiple submissions
        >
          Verify Code
        </button>
      </form>
    </div>
  );
}
