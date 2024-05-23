import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as schema from "../../utils/schema/groupSchema";
// import Modal from "../shared/Modal";
import Payment from "../Payment/Payment";
import * as group from "../../network/groupRequestServices";
import GuestoOrder from "./GuestoOrder";
// import { Spinner } from "../shared/Ui";
import PaymentModal from "../shared/PaymentModal";
import Modal from "../shared/Modal";
import { useNavigate } from "react-router-dom";

const CreateGroup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema.verifySms),
    defaultValues: {
      phoneNumber: phoneNumber,
      sms: "",
    },
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [createOpen, setCreeateOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [email, setEmail] = useState("");

  const toggleCreate = () => {
    setCreeateOpen(!createOpen);
  };

  const togglePayment = () => {
    setPaymentOpen(!paymentOpen);
  };

  const handleSubmitJoin = async () => {
    const data = { workshopId: id, quantity: 1, PhoneNumber: phoneNumber };
    const token = localStorage.getItem("token");
    const payload = { data: data, token: token };
    setIsSubmitting(true);
    if (product.cost > 0) {
      try {
        const response = await group.createChat(payload);
        console.log("response join workshop", response);

        if (response?.status == 200) {
          setIsSubmitting(false);
          setOrderId(response?.data);

          togglePayment();
        }
      } catch (error) {
        setIsSubmitting(false);
        console.log(error);
      }
    } else {
      togglePayment();
    }
  };


  const onSubmit = async (data) => {
    setIsVerifying(true);
    console.log("verify", data);

    try {
      const response = await auth.verifyOtp(data);
      console.log("response verify otp", response);
      if (response?.status === 200) {
        setIsVerifying(false);
        if (token) {
          handleSubmitJoin();
        } else {
          handleJoinGuest();
        }
      }
      closeModal;
    } catch (error) {
      setIsVerifying(false);
      console.error(error?.response);
      if (error?.response?.status === 400) {
        console.error(error?.response?.response?.status);
        toast.error("You have entered an invalid OTP code. Enter code sent to your phone number")
      }
    }
  };


  return (
    <>
      <div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" flex-col mb-5 hidden">
            <label htmlFor="phoneNumber" className="text-xs mb-1 pl-1">
              Phone Number
            </label>
            <input
              id="broadcast"
              {...register("broadcast", { required: true, maxLength: 13 })}
              className={`border border-silver-500 rounded-md py-2 pl-3 text-xs ${
                errors.broadcast ? "border-red-600 focus:outline-red-600" : ""
              }`}
              type="text"
              placeholder="OTP Code"
            />
            {errors.broadcast && (
              <span className="text-red-600 text-xs mt-1">
                {errors.broadcast.message}
              </span>
            )}
          </div>
          <div className="flex flex-col mb-5">
            <input
              id="sms"
              {...register("sms", { required: true })}
              className={`border border-silver-500 rounded-md py-2 pl-3 text-xs ${
                errors.sms ? "border-red-600 focus:outline-red-600" : ""
              }`}
              type="text"
              placeholder="OTP Code"
            />
            {errors.sms && (
              <span className="text-red-600 text-xs mt-1">
                {errors.sms?.message}
              </span>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              // onClick={toggleSms}
              className={`flex items-center justify-center w-full px-10 hover:bg-trainsquare-50 py-2 mb-2 font-semibold text-center text-white transition duration-200 ease-in bg-trainsquare-100 shadow-md rounded-2xl`}
            >
              Cancel
            </button>

            <button
              type="submit"
              name="submit"
              className={`flex items-center justify-center w-full hover:bg-trainsquare-50 px-10 py-2 mb-2 font-semibold text-center text-white transition duration-200 ease-in bg-trainsquare-100 shadow-md rounded-2xl`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center hover:bg-trainsquare-50">
                  Creating...
                </div>
              ) : (
                <div className="flex items-center justify-center ">Verify</div>
              )}
            </button>
          </div>
        </form>
      </div>
      {createOpen && (
        <Modal modalOpen={createOpen}>
          <div>
            <p>By clicking 'Create', you will be charged 5TON to create a group</p>
            <p>Do you wish to continue</p>
            <div>
              <button>Cancel</button>
              <button>Create</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CreateGroup;
