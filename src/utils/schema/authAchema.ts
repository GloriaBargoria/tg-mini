import * as yup from "yup";

// login schema to request OTP
const loginFormSchema = yup.object().shape({
    phoneNumber: yup.string().email("Please enter a valid email!").required("Please enter your email!"),
    password: yup.string().required("Please enter your password!"),
  });

  // verify OTP schema
  // currently has a bug in the backend, to be resolved
  const verifyOtpSchema = yup.object().shape({
    code: yup.string().required(),
  });


  export {
    loginFormSchema,
    verifyOtpSchema
  }