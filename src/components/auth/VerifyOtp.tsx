import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as schema from "../../utils/schema/authAchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { OtpTypes } from "../../types/authTypes";
import * as auth from "../../network/authRequestServices";
import { useNavigate } from "react-router-dom";

interface CreateProps {
  toggleVerify: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const VerifyOtp: React.FC<CreateProps>= ({toggleVerify}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema.verifyOtpSchema),
  });

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const phoneNumber = localStorage.getItem("phoneNumber");
  const phoneCodeHash = localStorage.getItem("phoneHash");

  const onSubmit = async (data: OtpTypes) => {
    console.log("data", data);
    const requestBody = {
      ...data,
      phoneCodeHash,
      phoneNumber,
    };
    setIsSubmitting(true);
    try {
      const response = await auth.verifyOtp(requestBody);
      console.log("response login", response);
      setIsSubmitting(false);
      if (response?.status === 200) {
        navigate("/groups");
      }
    } catch (error) {
      console.error("error login");
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className=" flex-col">
          <label htmlFor="phoneNumber" className="text-xs mb-1 pl-1">
            Enter OTP
          </label>
          <input
            id="phoneCode"
            {...register("phoneCode", { required: true, maxLength: 13 })}
            className={`border border-silver-500 rounded-md py-2 pl-3 text-xs ${
              errors.phoneCode ? "border-red-600 focus:outline-red-600" : ""
            }`}
            type="text"
            placeholder=""
          />
          {errors.phoneCode && (
            <span className="text-red-600 text-xs mt-1">
              {errors.phoneCode.message}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 space-x-4">
          <button
            type="button"
            name="button"
            onClick={toggleVerify}
            className={`flex items-center justify-center w-full  px-10 py-2 mb-2 font-semibold text-center text-black transition duration-200 ease-in shadow-md rounded-2xl `}
          >
            Cancel
          </button>
          <button
            type="submit"
            name="submit"
            id="ton-connect-button"
            className={`flex items-center justify-center w-full  px-10 py-2 mb-2 font-semibold text-center text-black transition duration-200 ease-in shadow-md rounded-2xl `}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center hover:bg-primary">
                Verifying...
              </div>
            ) : (
              <div className="flex items-center justify-center ">Verify</div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtp;
