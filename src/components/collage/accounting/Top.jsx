import React, { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { makePayment } from "../../../../redux/collage/account/paymentSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import Gpay from "./GPay";

const Plans = [
  {
    id: 1,
    name: "Quaterly",
    description: "lorem ipsum dolor sit amet",
    duration: "3 months",
    discount: 10,
    total: 25,
    price: 500,
  },
];

const Top = () => {
  const dispatch = useDispatch();

  const { payments, status } = useSelector((state) => state.payment);
  const PAYMENT_METHODS = ["Card", "UPI", "Google Pay"];
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [showPoPup, setShowPoPup] = useState(false);
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const creditPayment = async () => {
    ////console.log("payment done");
    const customerName = "John Doe";
    const customerAddress = "123 Main Street, City, Country";
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

    let body = {
      products: Plans,
      customerName: customerName,
      customerAddress: customerAddress,
    };

    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    };

    body = JSON.stringify(body);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/payment/make-payment`,
        body,
        { headers }
      );

      const session = response.data; // Accessing the session ID from response

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        // //console.log(result.error.message);
      }
    } catch (error) {
      console.error("Payment Error: ", error.response?.data || error.message);
    }
  };

  const covertToDateFormat = (date) => {
    const d = new Date(date);
    return d.toDateString();
  };

  const handleGPay = async () => {
    const customerName = "John Doe";
    const customerAddress = "123 Main Street, City, Country";
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    let body = {
      products: Plans,
      customerName: customerName,
      customerAddress: customerAddress,
    };
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    };
    body = JSON.stringify(body);
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/payment/make-payment`,
        body,
        { headers }
      );
      const session = response.data;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        // //console.log(result.error.message);
      }
    } catch (error) {
      console.error("Payment Error: ", error.response?.data || error.message);
    }
  };

  const handlePayment = () => {
    if (paymentMethod === "") {
      toast.error("Please select a payment method");
      return;
    }
    if (paymentMethod === PAYMENT_METHODS[0]) {
      creditPayment();
    } else if (paymentMethod === PAYMENT_METHODS[2]) {
      toast.error("UPI payment is not available right now");
    } else {
      handleShow();
    }
  };

  const handleShow = () => {
    setShowPoPup(true);
  };
  const handleClose = () => {
    setShowPoPup(false);
  };

  return (
    <div className=" w-full grid grid-cols-2 gap-8">
      {showPoPup && <Gpay onCancel={handleClose} Plan={Plans[0]} />}
      {/* left pannel */}
      <div className="p-4 rounded-xl bg-lGray bg-opacity-5">
        <div className="mb-4 flex justify-between">
          <div className="text-2xl font-bold">Your Subscription</div>
          {/*   <div className="flex gap-4">
            <button className="py-3 text-white rounded-2xl text-xs  bg-accent font-bold flex gap-2 px-7 ">
              <p>Change</p>
            </button>
            <button className="py-3 border border-[#CD2121] rounded-2xl text-xs  bg-white text-[#CD2121] font-bold flex gap-2 px-7 ">
              <p>Cancel</p>
            </button>
          </div>
           */}
        </div>

        {!payments[0] && (
          <div className="text-lg text-gray-400  font-bold"> No Payments</div>
        )}
        {payments[0] && (
          <>
            <div className="gird grid-cols-2 mb-8">
              {/*  */}
              <div className="mb-8">
                <h1 className="text-lg text-gray-400  font-bold">
                  Current Plan
                </h1>
                <div className="text-2xl font-bold">
                  {payments[0]?.products[0]?.name}
                </div>
              </div>
              {/*  */}
              <div className="mb-8">
                <h1 className="text-lg text-gray-400  font-bold">
                  Enrollment Date
                </h1>
                <div className="text-2xl font-bold">
                  {covertToDateFormat(payments[0]?.createdAt)}
                </div>
              </div>
              {/*  */}
            </div>

            {/* ------------transaction id----------------- */}
            <div className="mb-8">
              <h1 className="text-lg text-gray-400  font-bold">
                Transaction ID
              </h1>
              <div className="text-2xl font-bold">
                {payments[0]?.transactionID.substring(0, 26) + "...."}
              </div>
            </div>
            {/*  */}

            {/* ------------payment method----------------- */}
            <div className="mb-8">
              <h1 className="text-lg text-gray-400  font-bold">
                Payment Method
              </h1>
              <div className="text-2xl font-bold">
                {/*   **** **** **** */}
                {payments[0]?.paymentMethod}
              </div>
            </div>
          </>
        )}

        {/*  */}
      </div>
      {/* right */}
      <div className="p-4 rounded-xl bg-lGray bg-opacity-5">
        {/*  */}
        <div className="mb-4 flex justify-between">
          <div className="text-2xl font-bold">Payments</div>
          <div className="flex gap-4">
            <button
              className="py-3 text-white rounded-2xl text-xs  bg-accent font-bold flex gap-2 px-7 "
              onClick={handlePayment}
              type="button"
            >
              <p>Pay Now</p>
            </button>
          </div>
        </div>
        {/*  */}

        {/* conatiner */}
        <div
          className={`rounded-xl bg-white p-6 flex justify-between my-4 cursor-pointer  ${
            paymentMethod === PAYMENT_METHODS[0]
              ? "border-2 border-blue-200"
              : ""
          }`}
          onClick={(prev) =>
            prev !== PAYMENT_METHODS[0]
              ? setPaymentMethod(PAYMENT_METHODS[0])
              : setPaymentMethod("")
          }
        >
          {/* left*/}
          <div className="flex gap-8 object-cover">
            <div className="w-fit self-center">
              <img src="../../images/credit-card.png" alt="" />
            </div>

            <div>
              <h1 className="text-2xl font-bold"> Credit Card / Debit Card</h1>
              <h1 className="text-xl">Pay using your credit cards</h1>
            </div>
          </div>
          {/*  ef left*/}

          <BsChevronRight className="text-gray-400 self-center text-3xl" />
        </div>
        {/* end of container */}

        {/* conatiner */}
        <div
          className={`rounded-xl bg-white p-6 flex justify-between my-4 ${
            paymentMethod === PAYMENT_METHODS[1]
              ? "border-2 border-blue-200"
              : ""
          }`}
          onClick={(prev) =>
            prev !== PAYMENT_METHODS[1]
              ? setPaymentMethod(PAYMENT_METHODS[1])
              : setPaymentMethod("")
          }
        >
          {/* left*/}
          <div className="flex gap-8 object-cover">
            <div className="w-fit self-center">
              <img src="../../images/Bitmap.png" alt="" />
            </div>

            <div>
              <h1 className="text-2xl font-bold"> Google Pay</h1>
              <h1 className="text-xl">Pay using your credit cards</h1>
            </div>
          </div>
          {/*  ef left*/}

          <BsChevronRight className="text-gray-400 self-center text-3xl" />
        </div>
        {/* end of container */}

        {/* conatiner */}
        <div
          className={`rounded-xl bg-white p-6 flex justify-between my-4 ${
            paymentMethod === PAYMENT_METHODS[2]
              ? "border-2 border-blue-200"
              : ""
          }`}
          onClick={(prev) =>
            prev !== PAYMENT_METHODS[2]
              ? setPaymentMethod(PAYMENT_METHODS[2])
              : setPaymentMethod("")
          }
        >
          {/* left*/}
          <div className="flex gap-8 object-cover">
            <div className="w-fit self-center">
              <img src="../../images/credit-card-_1_.png" alt="" />
            </div>

            <div>
              <h1 className="text-2xl font-bold"> UPI IDs</h1>
              <h1 className="text-xl">Pay using your credit cards</h1>
            </div>
          </div>
          {/*  ef left*/}

          <BsChevronRight className="text-gray-400 self-center text-3xl" />
        </div>
        {/* end of container */}
      </div>
    </div>
  );
};

export default Top;
