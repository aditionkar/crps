import React from 'react';
import { Plus, Trash2, Save, Edit2, Link as LinkIcon } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface ProjectsProps {
  projects: Project[];
  isEditing: boolean;
  onSave: (projects: Project[]) => void;
  onEdit: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  projects,
  isEditing,
  onSave,
  onEdit,
}) => {
  const [currentProjects, setCurrentProjects] = React.useState<Project[]>(projects);

  const addProject = () => {
    setCurrentProjects([
      ...currentProjects,
      {
        id: Date.now().toString(),
        name: '',
        description: '',
        imageUrl: '',
        link: '',
      },
    ]);
  };

  const removeProject = (id: string) => {
    setCurrentProjects(currentProjects.filter((p) => p.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setCurrentProjects(
      currentProjects.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      )
    );
  };

  const handleSave = () => {
    onSave(currentProjects);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Projects</h2>
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={addProject}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProjects.map((project) => (
          <div
            key={project.id}
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            {isEditing ? (
              <div className="space-y-4 p-4">
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="w-full h-full object-cover text-black"
                    />
                  ) : (
                    <div className="text-center">
                      <input
                        type="text"
                        placeholder="Enter image URL"
                        className="w-full p-2 border rounded-md text-black"
                        value={project.imageUrl}
                        onChange={(e) =>
                          updateProject(project.id, 'imageUrl', e.target.value)
                        }
                      />
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Project Name"
                  className="w-full p-2 border rounded-md text-black"
                  value={project.name}
                  onChange={(e) =>
                    updateProject(project.id, 'name', e.target.value)
                  }
                />
                <textarea
                  placeholder="Project Description"
                  className="w-full p-2 border rounded-md text-black"
                  rows={3}
                  value={project.description}
                  onChange={(e) =>
                    updateProject(project.id, 'description', e.target.value)
                  }
                />
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Project Link"
                    className="flex-1 p-2 border rounded-md text-black"
                    value={project.link}
                    onChange={(e) =>
                      updateProject(project.id, 'link', e.target.value)
                    }
                  />
                </div>
                <button
                  onClick={() => removeProject(project.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove Project
                </button>
              </div>
            ) : (
              <div>
                <div className="aspect-video">
                  <img
                    src={project.imageUrl || 'https://via.placeholder.com/400x225'}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-black">{project.name}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
                    >
                      <LinkIcon className="w-4 h-4" />
                      View Project
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}