import React from "react";
import { Link } from "react-router-dom";

const Postcard = () => {
  return (
    <>
      <div className="flex gap-2 border p-3 max-w-[750px] mx-auto">
        <img src="" alt="" className="w-[200px] h-[200px] bg-slate-400" />
        <div>
          <h1 className="text-xl md:text-3xl font-bold">Title</h1>
          <p className="my-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
            recusandae dolores expedita, ipsam pariatur, fugiat, autem eligendi
            ullam deserunt suscipit sequi corrupti nihil quisquam. Nemo eos
            quidem provident porro asperiores.
          </p>
          <Link to="/post/1" className="text-blue-400">
            Read More
          </Link>
        </div>
      </div>
    </>
  );
};

export default Postcard;
