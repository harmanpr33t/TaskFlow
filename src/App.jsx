import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask() {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <div className="container">
        <h1>TaskFlow</h1>
        <p className="subtitle">Simple React Task Manager</p>

        <div className="input-box">
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />

          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty">No tasks added yet.</p>
          ) : (
            tasks.map((item) => (
              <div className="task" key={item.id}>
                <span
                  className={item.completed ? "completed" : ""}
                  onClick={() => toggleTask(item.id)}
                >
                  {item.title}
                </span>

                <div>
                  <button
                    className="done"
                    onClick={() => toggleTask(item.id)}
                  >
                    {item.completed ? "Undo" : "Done"}
                  </button>

                  <button
                    className="delete"
                    onClick={() => deleteTask(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="footer">
          Total Tasks: {tasks.length}
        </div>
      </div>
    </div>
  );
}

export default App;