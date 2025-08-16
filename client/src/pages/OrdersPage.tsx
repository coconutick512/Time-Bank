import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import React from 'react'
import { fetchAllTasks } from '@/entities/tasks/model/tasksThunk';
import type { TasksState } from '@/entities/tasks/types/schema';


type RootState = {
    tasks: TasksState;
};

export default function OrdersPage(): React.JSX.Element {

    const {status,tasks} = useAppSelector((state:RootState ) => state.tasks);
    const dispatch = useAppDispatch();

  React.useEffect(() => {
    void dispatch(fetchAllTasks());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="orders-container">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="order-card">
              <h3>{task.title}</h3>
              <p>Description: {task.description}</p>
              <p>Status: {task.status}</p>
              <p>Deadline: {task.deadline}</p>
              <p>Creator: {task.creator.name}</p>
              <div className="categories-container">
                <h4>Categories:</h4>
                {task.categories.length > 0 ? (
                  task.categories.map((category) => (
                    <div key={category.id} className="category-tag">
                      {category.name}
                    </div>
                  ))
                ) : (
                  <p>No categories listed</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </div>
    </>
  )
}
