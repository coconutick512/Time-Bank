import { fetchAllExecutors } from '@/entities/executors/model/executorThunk';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import React from 'react';

type Skill = {
  id: number;
  name: string;
};

type Executor = {
  id: number;
  name: string;
  email: string;
  balance: string;
  skills: Skill[];
};

type ExecutorsState = {
  status: 'loading' | 'done' | 'reject';
  executors: Executor[];
  error: string | null;
};

type RootState = {
  executors: ExecutorsState;
};

export default function ExecutorsPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  
  const { status, executors, error } = useAppSelector((state: RootState) => state.executors);

  React.useEffect(() => {
    void dispatch(fetchAllExecutors());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'reject') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="executors-container">
      {executors.length > 0 ? (
        executors.map((executor) => (
          <div key={executor.id} className="executor-card">
            <h3>{executor.name}</h3>
            <p>Balance: {executor.balance}</p>
            <div className="skills-container">
              <h4>Skills:</h4>
              {executor.skills.length > 0 ? (
                executor.skills.map((skill) => (
                  <div key={skill.id} className="skill-tag">
                    {skill.name}
                  </div>
                ))
              ) : (
                <p>No skills listed</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No executors found</p>
      )}
    </div>
  );
}