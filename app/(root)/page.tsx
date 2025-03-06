import { auth } from "@/auth";
import AddTodoDialog from "@/components/AddTodoDialog";
import Filters from "@/components/Filters";
import Header from "@/components/Header";
import TodoListLoading from "@/components/loading/TodoListLoading";
import TodoList from "@/components/TodoList";
import { getTodo } from "@/database/actions/todo.actions";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ date: string; status: string }>;
}) => {
  const { date, status } = await searchParams;
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const data = await getTodo({
    dueDate: date,
    status,
    email: session.user.email!,
  });
  return (
    <main className="home-container">
      <div className="box-container">
        <Header />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <>
            <Filters />
          </>
          <AddTodoDialog email={session?.user?.email} />
        </div>

        {data?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400">
              {data.length === 0
                ? "No tasks yet. Add your first task!"
                : "No tasks match your filters."}
            </p>
          </div>
        ) : (
          <>
            <Suspense fallback={<TodoListLoading />}>
              <TodoList todos={data} />
            </Suspense>
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
