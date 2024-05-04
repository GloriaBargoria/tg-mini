import React, { useEffect, useState } from "react";
import * as groupsRequest from "../network/groupRequestServices";
import { AxiosResponse } from "axios";

interface Group {
  channelId: string;
  // Add more properties as needed
}

const Homepage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response: AxiosResponse<Group[]> =
          await groupsRequest.getGroups();
          console.log(response)
        setGroups(response?.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div>
      {groups.length > 0 ? (
        <div>
          {groups.map((group) => (
            <div key={group.channelId}>
              
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>No nearby groups. Browse all groups</p>
        </div>
      )}
    </div>
  );
};

export default Homepage;
