import amazonpay from '../../assets/Images/amazon-pay.png'
import americanexpress from '../../assets/Images/American-Express-Color.png'
import mastercard from '../../assets/Images/mastercard.webp'
import paypal from '../../assets/Images/paypal.png'
import appleapp from '../../assets/Images/get-apple-store.png'
import googleapp from '../../assets/Images/get-google-play.png'



export default function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 py-8 mt-8">
    <div className="container mx-auto px-4">
      {/* App Section */}
      <header>
        <h2 className="capitalize text-3xl text-gray-900 dark:text-gray-100">
          Get The FreshCart App
        </h2>
        <p className="capitalize text-gray-500 dark:text-gray-400 my-4">
          We Will Send You a Link, Open it on Your Phone to Download the App
        </p>
      </header>
  
      {/* Form Section */}
      <form className="input flex items-center justify-between flex-wrap md:flex-nowrap gap-4">
        <input
          type="email"
          className="w-full md:w-[85%] p-2 rounded border-0 bg-white dark:bg-gray-700 dark:text-gray-200 focus:outline-none"
          name="user_mail"
          placeholder="Email .."
          aria-label="Enter your email"
        />
        <button
          type="submit"
          className="capitalize w-full md:w-[15%] mx-auto rounded text-white bg-green-500 hover:bg-green-800 dark:hover:bg-green-600 duration-300 text-sm px-4 py-2"
          aria-label="Submit your email to get the app link"
        >
          Share App Link
        </button>
      </form>
  
      {/* Partners Section */}
      <div className="flex my-4 items-center justify-between flex-wrap border-gray-300 dark:border-gray-600 border-y py-6">
        {/* Payment Partners */}
        <div className="flex items-center justify-center w-full xl:w-auto gap-4 flex-wrap">
          <h3 className="capitalize text-2xl text-gray-900 dark:text-gray-100 text-center">
            Payment Partners
          </h3>
          <img
            src={amazonpay}
            className="w-20"
            alt="Amazon Pay logo"
            loading="lazy"
          />
          <img
            src={americanexpress}
            className="w-20"
            alt="American Express logo"
            loading="lazy"
          />
          <img
            src={mastercard}
            className="w-20"
            alt="MasterCard logo"
            loading="lazy"
          />
          <img
            src={paypal}
            className="w-20"
            alt="PayPal logo"
            loading="lazy"
          />
        </div>
  
        {/* App Stores */}
        <div className="flex items-center justify-center w-full xl:w-auto gap-4 flex-wrap">
          <h3 className="capitalize text-2xl text-gray-900 dark:text-gray-100 text-center">
            Get Deliveries with FreshCart
          </h3>
          <img
            src={appleapp}
            className="w-24"
            alt="Apple App Store badge"
            loading="lazy"
          />
          <img
            src={googleapp}
            className="w-24"
            alt="Google Play Store badge"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </footer>
  );
}


