import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as schema from "../../utils/schema/authAchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginTypes } from "../../types/authTypes";
import * as auth from "../../network/authRequestServices";
import Modal from "../shared/Modal";
import VerifyOtp from "./VerifyOtp";

const LoginTelegram: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema.loginFormSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false)

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  const onSubmit = async (data: LoginTypes) => {
    console.log("data", data);
    localStorage.setItem("phoneNumber", data?.phoneNumber)
    // localStorage.setItem("password", data?.password)
    setIsSubmitting(true)
    try {
      const response = await auth.loginTelegram(data);
      console.log("response login", response);
      setIsSubmitting(false)
      if(response?.status === 200){
        localStorage.setItem("phoneHash", response?.data?.phoneCodeHash)
        toggleModal()
      }
      
      
    } catch (error) {
      console.error("error login");
      setIsSubmitting(false)
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className=" flex-col">
          <label htmlFor="phoneNumber" className="text-xs mb-1 pl-1">
            Phone Number(intl format)
          </label>
          <input
            id="phoneNumber"
            {...register("phoneNumber", { required: true, maxLength: 13 })}
            className={`border border-silver-500 rounded-md py-2 pl-3 text-xs ${
              errors.phoneNumber ? "border-red-600 focus:outline-red-600" : ""
            }`}
            type="text"
            placeholder="phoneNumber"
          />
          {errors.phoneNumber && (
            <span className="text-red-600 text-xs mt-1">
              {errors.phoneNumber.message}
            </span>
          )}
        </div>
        <div className=" flex-col">
          <label htmlFor="phoneNumber" className="text-xs mb-1 pl-1">
            Password(leave blank if none)
          </label>
          <input
            id="password"
            {...register("password", { required: true, maxLength: 13 })}
            className={`border border-silver-500 rounded-md py-2 pl-3 text-xs ${
              errors.password ? "border-red-600 focus:outline-red-600" : ""
            }`}
            type="password"
            placeholder="*****"
          />
          {errors.password && (
            <span className="text-red-600 text-xs mt-1">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 space-x-4">
          <button
            type="submit"
            name="submit"
            id="ton-connect-button"
            className={`flex items-center justify-center w-full  px-10 py-2 mb-2 font-semibold text-center text-black transition duration-200 ease-in shadow-md rounded-2xl `}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center hover:bg-primary">
                Creating...
              </div>
            ) : (
              <div className="flex items-center justify-center ">Login</div>
            )}
          </button>
        </div>
      </form>
      <Modal modalOpen={modalOpen}>
        <VerifyOtp toggleVerify={toggleModal} />
      </Modal>
    </div>
  );
};

export default LoginTelegram;
