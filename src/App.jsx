import React from 'react';
import { ProjectSidebar } from './components/ProjectSidebar.jsx';
import { NewProject } from './components/NewProject.jsx';
import NoProjectSelected from './components/NoProjectSelected.jsx';
import { useState } from 'react';
import SelectedProject from './components/SelectedProject.jsx';

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  })

  function handleAddTask(text) {
    setProjectsState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      }
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      }
    })
  }
  function handleDeleteTask(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      }
    })
  }

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    })
  }

  function handleSelectProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      }
    })
  }

  function handleCancelAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    })
  }

  function handleAddProject(projectData) {
    const newProject = {
      ...projectData,
      id: Math.random(),
    }
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      }
    })
  }

  function handleDelete() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId),
      }
    })
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);
  let content = <SelectedProject tasks={projectsState.tasks} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} onDelete={handleDelete} project={selectedProject} />;
  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  }
  else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <ProjectSidebar onSelectProject={handleSelectProject} onStartAddProject={handleStartAddProject} projects={projectsState.projects} />
        {content}
      </main>
    </>
  );
}

export default App;
