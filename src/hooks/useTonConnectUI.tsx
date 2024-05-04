import { useTonConnectUI } from "@tonconnect/ui-react";

export const Settings = () => {
  const [tonConnectUI] = useTonConnectUI();



  // use this hook to send TON coins (in nanotons) to a specific address(My Address) when creating group
  // currenly sending to online available address for testing purposes

  const transaction = {
    validUntil: Math.floor(Date.now() / 1000) + 60, 
    messages: [
      {
        address: "EQBBJBB3HagsujBqVfqeDUPJ0kXjgTPLWPFFffuNXNiJL0aA",
        amount: "0.5",
      },
    ],
  };
//   try {
//     const result = await tonConnectUI.sendTransaction(transaction);

//     // you can use signed boc to find the transaction 
//     // const someTxData = await myAppExplorerService.getTransaction(result.boc);
//     alert('Transaction was sent successfully', someTxData);
// } catch (e) {
//     console.error(e);
// }

  

  return (
    <div>
      <button onClick={() => tonConnectUI.sendTransaction(transaction)}>
        Send transaction
      </button>
    </div>
  );
};
