import React from "react";
import { Skeleton } from "../ui/skeleton";

const TodoListLoading = () => {
  return (
    <>
      <div className="mt-10 space-y-3">
        {[...Array(4)].map((item, index) => (
          <div key={index} className="">
            <Skeleton className="w-full h-[100px] rounded-lg" />
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoListLoading;
