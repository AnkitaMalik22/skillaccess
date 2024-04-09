import React from "react";
import { BsChevronRight } from "react-icons/bs";
import {loadStripe} from '@stripe/stripe-js';

const Products=[ {
  id: 1,
  dish: "punjabi",
  address: "North Indian, Biryani, Mughlai",
  somedata: " 1175 + order placed from here recently",
  qnty:1,
  price: 25,
},
{
  id: 2,
  dish: "Jugaadi Adda vadapav",
  address: "Street Food",
  somedata: " 2525 + order placed from here recently",
  qnty:1,
  price: 25,
 
}]


const Top = () => {
 
  return (
    <div className=" w-full grid grid-cols-2 gap-8">
      {/* left pannel */}
      <div className="p-4 rounded-xl bg-lGray bg-opacity-5">
        <div className="mb-4 flex justify-between">
          <div className="text-2xl font-bold">Your Subscription</div>
          <div className="flex gap-4">
            <button className="py-3 text-white rounded-2xl text-xs  bg-[#0052CC] font-bold flex gap-2 px-7 ">
              <p>Change</p>
            </button>
            <button className="py-3 border border-[#CD2121] rounded-2xl text-xs  bg-white text-[#CD2121] font-bold flex gap-2 px-7 ">
              <p>Cancel</p>
            </button>
          </div>
        </div>

        <div className="gird grid-cols-2 mb-8">
          {/*  */}
          <div className="mb-8">
            <h1 className="text-lg text-gray-400  font-bold">Current Plan</h1>
            <div className="text-2xl font-bold">Quaterly</div>
          </div>
          {/*  */}
          <div className="mb-8">
            <h1 className="text-lg text-gray-400  font-bold">
              Enrollment Date
            </h1>
            <div className="text-2xl font-bold">15th July, 2022</div>
          </div>
          {/*  */}
        </div>

        {/* ------------transaction id----------------- */}
        <div className="mb-8">
          <h1 className="text-lg text-gray-400  font-bold">Transaction ID</h1>
          <div className="text-2xl font-bold">4ebd0208-8328-5d69-8c44</div>
        </div>
        {/*  */}

        {/* ------------payment method----------------- */}
        <div className="mb-8">
          <h1 className="text-lg text-gray-400  font-bold">Payment Method</h1>
          <div className="text-2xl font-bold">**** **** **** 8574</div>
        </div>
        {/*  */}
      </div>
      {/* right */}
      <div className="p-4 rounded-xl bg-lGray bg-opacity-5">
        {/*  */}
        <div className="mb-4 flex justify-between">
          <div className="text-2xl font-bold">Payments</div>
          <div className="flex gap-4">
            <button className="py-3 text-white rounded-2xl text-xs  bg-[#0052CC] font-bold flex gap-2 px-7 ">
              <p>Pay Now</p>
            </button>
          </div>
        </div>
        {/*  */}

        {/* conatiner */}
        <div className="rounded-xl bg-white p-6 flex justify-between my-4 cursor-pointer"
          
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
