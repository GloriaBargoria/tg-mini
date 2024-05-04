import React, { useEffect, useState } from "react";
import * as groupsRequest from "../network/groupRequestServices";
import { AxiosResponse } from "axios";
import './home.css'

interface Group {
  channelId: string;
  about: string;
  title: string;
}


const Homepage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    </div>
  );
};

export default Homepage;
