import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  console.log(id);
  const getDetail = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
      )
    ).json();
  };
  useEffect(() => {
    getDetail();
  }, []);

  return <h1>Detail</h1>;
}

export default Detail;
