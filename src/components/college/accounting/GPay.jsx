import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import GooglePayButton from "@google-pay/button-react";

const Gpay = ({ onCancel ,Plan}) => {
  return (
    <div className="w-full  min-w-full h-screen  min-h-[100vh] bg-black absolute z-[9999] flex left-0 top-0 bg-opacity-30 ">
      <div className="bg-white shadow-md w-[780px] h-96 mx-auto self-center   rounded-lg bg-opactiy-10  px-12 flex flex-col justify-center gap-4 relative">
        <p className="text-[28px] font-bold flex justify-center mt-6 text-blued  ">
            Make a Payment
        </p>
        <div className="w-full flex gap-4 mb-6">
          <div className="w-[46%] -mt-4">
            <img
              src="/images/payment.jpg"
              alt="Gpay-data"
              height={"500px"}
              width={"500px"}
            />
          </div>
          <div className="w-[52%] flex flex-col gap-4 justify-center">
            <p className="font-medium text-xl text-[#7f7f7f]">
             Plan Name: <span className="text-blued "> {Plan?.name}</span>
            </p>
            <p className="font-medium text-xl text-[#7f7f7f]">
                Plan Amount:  <span className="text-blued "> ₹{Plan?.price}</span>
            </p>
            <GooglePayButton
              environment="TEST"
              paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                  {
                    type: "CARD",
                    parameters: {
                      allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                      allowedCardNetworks: ["MASTERCARD", "VISA"],
                    },
                    tokenizationSpecification: {
                      type: "PAYMENT_GATEWAY",
                      parameters: {
                        gateway: "example",
                        gatewayMerchantId: "exampleGatewayMerchantId",
                      },
                    },
                  },
                ],
                merchantInfo: {
                  merchantId: "12345678901234567890",
                  merchantName: "Demo Merchant",
                },
                transactionInfo: {
                  totalPriceStatus: "FINAL",
                  totalPriceLabel: "Total",
                  totalPrice: "100.00",
                  currencyCode: "USD",
                  countryCode: "US",
                },
              }}
              onLoadPaymentData={(paymentRequest) => {
                
              }}
            />
          </div>
        </div>
        <button
          className="h-6 w-6 text-[#2e3e4b] absolute right-4 top-6"
          onClick={onCancel}
        >
          <RxCross2 />
        </button>
      </div>
    </div>
  );
};

export default Gpay;
