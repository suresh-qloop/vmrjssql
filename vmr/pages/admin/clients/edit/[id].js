import React, { useEffect, useState } from "react";
import axios from "axios";
import EditClientForm from "../../../../components/Admin/EditForm/Client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const EditClient = () => {
  const [clientData, setClientData] = useState(null);
  const { status, data } = useSession();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    getEditData();
    // eslint-disable-next-line
  }, [status, id]);

  const getEditData = async () => {
    if (!(status === "loading")) {
      await axios
        .get(`${process.env.NEXT_PUBLIC_NEXT_API}/client/${id}`, {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        })
        .then((res) => {
          setClientData(res.data);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
            router.push("/unauthorized");
          }
        });
    }
  };

  return clientData ? (
    <EditClientForm preLoadedValues={clientData} />
  ) : (
    <div className="text-center m-5 p-5">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default EditClient;
