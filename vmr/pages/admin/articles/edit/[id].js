import React, { useEffect, useState } from "react";
import axios from "axios";
import EditArticleForm from "../../../../components/Admin/EditForm/Article";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const EditArticle = () => {
  const [articleData, setArticleData] = useState(null);
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
    if (!(status === "authenticated")) {
      await axios
        .get(`${process.env.NEXT_PUBLIC_NEXT_API}/article/${id}`, {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        })
        .then((res) => {
          setArticleData(res.data);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
            router.push("/unauthorized");
          }
        });
    }
  };

  return articleData ? (
    <EditArticleForm preLoadedValues={articleData} />
  ) : (
    <div className="text-center m-5 p-5">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default EditArticle;
