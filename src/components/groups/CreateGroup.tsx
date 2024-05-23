import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as schema from "../../utils/schema/groupSchema";
import * as group from "../../network/groupRequestServices";
import { GroupData } from "../../types/groupTypes";
import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";
import Modal from "../shared/Modal";

interface CreateProps {
  toggleCreate: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const CreateGroup: React.FC<CreateProps> = ({ toggleCreate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema.createChatSchema),
    defaultValues: {},
  });

  const [tonConnectUI] = useTonConnectUI();

  const currentWallet = tonConnectUI.wallet;
  const currentAccount = tonConnectUI.account;
  const currentIsConnectedStatus = tonConnectUI.connected;

  console.log("ton account", currentAccount);
  console.log("ton wallet", currentWallet);
  console.log("ton wallet", currentIsConnectedStatus);

  const transaction = {
    validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
    messages: [
      {
        address: "EQBBJBB3HagsujBqVfqeDUPJ0kXjgTPLWPFFffuNXNiJL0aA",
        amount: "0.5",
      },
    ],
  };

  const createGroupTransaction = async () => {
    try {
      const result = await tonConnectUI.sendTransaction(transaction);

      // you can use signed boc to find the transaction
      // const someTxData = await myAppExplorerService.getTransaction(result.boc);
      alert("Transaction was sent successfully" + JSON.stringify(result));
    } catch (e) {
      console.error(e);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  // const onSubmit = async (data: GroupData) => {
  //   setIsSubmitting(true);
  //   await createGroupTransaction();
  //   console.log("create", data);

  //   try {
  //     const response = await group.createChat(data);
  //     console.log("response verify otp", response);
  //     if (response?.status === 200) {
  //       setIsSubmitting(false);
  //     }
  //   } catch (error) {
  //     setIsSubmitting(false);
  //     console.error("error sending transaction", error);
  //     toggleModal();
  //   }
  // };

  return (
    <>
      <div>
        <h2>Create Group</h2>
        {/* <TonConnectButton /> */}
        <form
          onSubmit={handleSubmit(createGroupTransaction)}
          className="space-y-4"
        >
          <div className=" flex-col">
            <label htmlFor="phoneNumber" className="text-xs mb-1 pl-1">
              Group Name
            </label>
            <input
              id="title"
              {...register("title", { required: true, maxLength: 13 })}
              className={`border border-silver-500 rounded-md py-2 pl-3 text-xs ${
                errors.title ? "border-red-600 focus:outline-red-600" : ""
              }`}
              type="text"
              placeholder="Group name"
            />
            {errors.title && (
              <span className="text-red-600 text-xs mt-1">
                {errors.title.message}
              </span>
            )}
          </div>
          <div>
            {currentIsConnectedStatus ? (
                          <p className="text-xs">
              <span className="text-red-500">NOTE</span>: By creating a group,
              you will be charged 0.5 TON from your connected wallet
            </p>
            ) : (
              <p className="text-xs text-red-500">
              You are not connected to a TON wallet. Connect wallet to create group
            </p>
            )}

          </div>
          <div className="grid grid-cols-2 space-x-4">
            <button
              type="button"
              onClick={toggleCreate}
              className={`flex items-center justify-center w-full md:w-1/2  font-semibold text-center text-black transition duration-200 ease-in  border-[1px] border-red-500 shadow-md rounded-2xl`}
            >
              Cancel
            </button>

            {currentIsConnectedStatus ? (
              <button
                type="submit"
                name="submit"
                id="ton-connect-button"
                className={`flex items-center justify-center w-full  px-10 py-2 mb-2 font-semibold text-center text-black transition duration-200 ease-in shadow-md rounded-2xl ${
                  !currentIsConnectedStatus
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center hover:bg-primary">
                    Creating...
                  </div>
                ) : (
                  <div className="flex items-center justify-center ">
                    Create
                  </div>
                )}
              </button>
            ) : (
              <div>
                
                <TonConnectButton />
              </div>
            )}
          </div>
        </form>
        <Modal modalOpen={modalOpen}>
          <div>
            <p className="text-xs">To create a group, you must first connect to a TON wallet</p>
            <TonConnectButton />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default CreateGroup;
