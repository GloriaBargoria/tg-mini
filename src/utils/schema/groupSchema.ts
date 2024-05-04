import * as yup from "yup";

// create supergroup schema
// this creates large groups that are private with an invite link
const createChannelSchema = yup.object().shape({
    broadcast: yup.bool().notRequired(),
    megagroup: yup.bool().required(),
    title: yup.string().required("Enter a title"),
    about: yup.string().notRequired(),
  });

  // create group chat schema
  // creates a group and adds yoursel into it
  // pass other userIds to add other people alongside yourself in the creation process
  // userIds are passed as an array or strings of userIds
  // for testing, we're creating a group with just self and add other users
  const createChatSchema = yup.object().shape({
    title: yup.string().required("Enter a group title"),
  });




  export {
    createChannelSchema,
    createChatSchema
  }