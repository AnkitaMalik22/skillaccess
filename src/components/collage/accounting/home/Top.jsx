import React, { useEffect } from "react";
import { BsChevronRight } from "react-icons/bs";
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch,useSelector } from "react-redux";
import { makePayment } from "../../../../redux/collage/account/paymentSlice";
import { toast } from "react-hot-toast";

// const Products = [{
//   id: 1,
//   dish: "punjabi",
//   address: "North Indian, Biryani, Mughlai",
//   somedata: " 1175 + order placed from here recently",
//   qnty: 1,
//   price: 25,
// },
// {
//   id: 2,
//   dish: "Jugaadi Adda vadapav",
//   address: "Street Food",
//   somedata: " 2525 + order placed from here recently",
//   qnty: 1,
//   price: 25,

// }]

const Plans = [
  {
    id: 1,
    name: "Quaterly",
    description : "lorem ipsum dolor sit amet",
    duration: "3 months",
    discount: 10,
    total: 25,
    price : 500
  },
  
 // {
   // id: 2,
  //  name: "Half Yearly",
   // description : "lorem ipsum dolor sit amet",
   // price: 1000,
  //  duration: "6 months",
  //  discount: 10,
  //  total: 25,
 // },
 // {
 //   id: 3,
  //  name: "Yearly",
  //  description : "lorem ipsum dolor sit amet",
   // price: 2000,
   // duration: "12 months",
   // discount: 10,
   // total: 25,
//  },
];





const Top = () => {
  const dispatch = useDispatch();

  const { payments,status } = useSelector((state) => state.payment);




  const creditPayment = async () => {
    console.log("payment done");
    const customerName = "John Doe"; // Example name
    const customerAddress = "123 Main Street, City, Country";
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const body = {
      products: Plans,
      customerName: customerName,
      customerAddress: customerAddress
    };
    const headers = {
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem("auth-token")
    }
    const response = await fetch("http://localhost:4000/api/payment/make-payment",{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body),

    });

    // dispatch(makePayment(body))
    
    // .then( async( result) => {

      // if (status === "success") {
     
        // const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    
      //   stripe.redirectToCheckout({
      //     sessionId: payment.id
      //   });
    
      //   }

    // }).catch((err) => {
    //   console.log(err);
    // });



 


    const session = await response.json();

    const result = stripe.redirectToCheckout({
        sessionId:session.id
    });

    if(result.error){
        console.log(result.error);
    }
  }



  const covertToDateFormat = (date) => {
    const d = new Date(date);
    return d.toDateString();
  };
  return (
    <div className=" w-full grid grid-cols-2 gap-8">
      {/* left pannel */}
      <div className="p-4 rounded-xl bg-lGray bg-opacity-5">
        <div className="mb-4 flex justify-between">
          <div className="text-2xl font-bold">Your Subscription</div>
         {/*   <div className="flex gap-4">
            <button className="py-3 text-white rounded-2xl text-xs  bg-[#0052CC] font-bold flex gap-2 px-7 ">
              <p>Change</p>
            </button>
            <button className="py-3 border border-[#CD2121] rounded-2xl text-xs  bg-white text-[#CD2121] font-bold flex gap-2 px-7 ">
              <p>Cancel</p>
            </button>
          </div>
           */}
        </div>

     {
      !payments[0] && <div className="text-lg text-gray-400  font-bold"> No Payments</div>

     }
        {payments[0] && (
        <>
        
        
        <div className="gird grid-cols-2 mb-8">
        {/*  */}
        <div className="mb-8">
          <h1 className="text-lg text-gray-400  font-bold">Current Plan</h1>
          <div className="text-2xl font-bold">{payments[0]?.products[0]?.name}</div>
        </div>
        {/*  */}
        <div className="mb-8">
          <h1 className="text-lg text-gray-400  font-bold">
            Enrollment Date
          </h1>
          <div className="text-2xl font-bold">{
            covertToDateFormat(payments[0]?.createdAt)
          }</div>
        </div>
        {/*  */}
      </div>

      {/* ------------transaction id----------------- */}
      <div className="mb-8">
        <h1 className="text-lg text-gray-400  font-bold">Transaction ID</h1>
        <div className="text-2xl font-bold">
          {
            payments[0]?.
            transactionID.substring(0,26) + "...."
          }
        </div>
      </div>
      {/*  */}

      {/* ------------payment method----------------- */}
      <div className="mb-8">
        <h1 className="text-lg text-gray-400  font-bold">Payment Method</h1>
        <div className="text-2xl font-bold">
     {/*   **** **** **** */} 
           {
          payments[0]?.
          paymentMethod
        }</div>

      </div>

        
        </>
      )
    }

        {/*  */}
      </div>
      {/* right */}
      <div className="p-4 rounded-xl bg-lGray bg-opacity-5">
        {/*  */}
        <div className="mb-4 flex justify-between">
          <div className="text-2xl font-bold">Payments</div>
          <div className="flex gap-4">
            <button className="py-3 text-white rounded-2xl text-xs  bg-[#0052CC] font-bold flex gap-2 px-7 "
              onClick={creditPayment}
              type="button"
            >
              <p>Pay Now</p>
            </button>
          </div>
        </div>
        {/*  */}

        {/* conatiner */}
        <div className="rounded-xl bg-white p-6 flex justify-between my-4 cursor-pointer border-2 border-blue-200 "

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
        <div className="rounded-xl bg-white p-6 flex justify-between my-4">
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
        <div className="rounded-xl bg-white p-6 flex justify-between my-4">
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
