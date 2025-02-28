import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex bg-slate-50 items-center justify-center min-h-screen">
      {children}
    </main>
  );
};

export default layout;
