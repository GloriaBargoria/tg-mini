import React, { useEffect, useState } from "react";
import * as groupsRequest from "../network/groupRequestServices";
import { AxiosResponse } from "axios";
import "./home.css";
import Modal from "../components/shared/Modal";
import CreateGroup from "../components/groups/CreateGroup";

interface Group {
  channelId: string;
  about: string;
  title: string;
}

const Grouplist: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchGroups = async () => {
      try {
        const response: AxiosResponse<Group[]> =
          await groupsRequest.getGroups();
        console.log(response);
        setIsLoading(false);
        setGroups(response?.data);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <div className="flex justify-end">
        <button
          className="bg-primary p-2 rounded-lg text-white"
          onClick={toggleModal}
        >
          Create Group
        </button>
      </div>
      {isLoading ? (
        <div className="">Loading...</div>
      ) : (
        <div>
          {groups.map((group) => (
            <div key={group.channelId} className="group">
              <p>{group.title}</p>
            </div>
          ))}
        </div>
      )}
      <Modal modalOpen={modalOpen}>
        <CreateGroup toggleCreate={toggleModal} />
      </Modal>
    </div>
  );
};

export default Grouplist;
