import React from "react";
import { Link } from "react-router-dom";

const Postcard = ({ data }) => {
  console.log(data);

  return (
    <>
      <div className="flex gap-2 border p-3 max-w-[750px] mx-auto">
        <img src="" alt="" className="w-[200px] h-[200px] bg-slate-400" />
        <div>
          <h1 className="text-xl md:text-3xl font-bold">{data?.title}</h1>
          <p className="my-3">{data?.content}</p>
          <Link to={`/post/${data?._id}`} className="text-blue font-bold">
            Read More
          </Link>
        </div>
      </div>
    </>
  );
};

export default Postcard;
