import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section className="home-container">
      <div className="box-container">
        <div className="mb-5">
          <div className="flex justify-between items-center">
            <Skeleton className="w-[124px] h-[36px]" />
            <div className="flex items-center justify-end gap-1">
              <Skeleton className="w-[40px] h-[17px]" />
              <Skeleton className="w-[36px] h-[36px] rounded-full" />
            </div>
          </div>
        </div>
        <Skeleton className="w-[358px] h-[30px] rounded-lg" />

        <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center gap-4 mb-6">
          <div className="flex gap-3">
            <Skeleton className="w-[100px] h-[30px] rounded-md mt-10" />
            <Skeleton className="w-[100px] h-[30px] rounded-md mt-10" />
          </div>
          <Skeleton className="w-[100px] h-[30px] rounded-md mt-10" />
        </div>

        <div className="mt-10 space-y-3">
          {[...Array(4)].map((item, index) => (
            <div key={index} className="">
              <Skeleton className="w-full h-[100px] rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Loading;
