import * as yup from "yup";

// login schema to request OTP
const loginFormSchema = yup.object().shape({
    phoneNumber: yup.string().required("Please enter your phone number!"),
    password: yup.string().notRequired(),
  });

  // verify OTP schema
  // currently has a bug in the backend, to be resolved
  const verifyOtpSchema = yup.object().shape({
    phoneCode: yup.string().required(),
    
  });


  export {
    loginFormSchema,
    verifyOtpSchema
  }