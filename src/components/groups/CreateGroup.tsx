import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as schema from "../../utils/schema/groupSchema";
import * as group from "../../network/groupRequestServices";
import { GroupData } from "../../types/groupTypes";

const CreateGroup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema.createChatSchema),
    defaultValues: {
      
    },
  });



  const [isSubmitting, setIsSubmitting] = useState(false);


  const onSubmit = async (data: GroupData) => {
    setIsSubmitting(true);
    console.log("verify", data);

    try {
      const response = await group.createChat(data);
      console.log("response verify otp", response);
      if (response?.status === 200) {
        setIsSubmitting(false);
        
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
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
              id="title"
              {...register("title", { required: true, maxLength: 13 })}
              className={`border border-silver-500 rounded-md py-2 pl-3 text-xs ${
                errors.title ? "border-red-600 focus:outline-red-600" : ""
              }`}
              type="text"
              placeholder="OTP Code"
            />
            {errors.title && (
              <span className="text-red-600 text-xs mt-1">
                {errors.title.message}
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
    </>
  );
};

export default CreateGroup;
