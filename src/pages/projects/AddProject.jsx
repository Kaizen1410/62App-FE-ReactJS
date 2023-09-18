import { Avatar, Button, Datepicker, Select, TextInput, Textarea } from "flowbite-react"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fetchClient from "../../utils/fetchClient";
import Loading from "../../components/Loading";
import { BeatLoader } from 'react-spinners';
import { UserState } from "../../context/UserProvider";
import moment from "moment";

function AddProject() {
  const [addIsLoading, setAddIsLoading] = useState(false);
  const [project, setProject] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    image_url: '',
    total_story_point: 0,
    done_story_point: 0,
    status: 1,
  });
  const { setNotif } = UserState();

  const navigate = useNavigate();

  // Update value input state
  const handleInput = (e) => {
    e.persist();
    let value = e.target.value;
    setProject({ ...project, [e.target.name]: value });
  }

  // Add Project
  const saveProject = (e) => {
    setAddIsLoading(true);
    e.preventDefault();

    const startEl = document.querySelector('#start_date');
    const endEl = document.querySelector('#end_date');

    const formData = new FormData();
    formData.append('name', project.name);
    formData.append('description', project.description);
    formData.append('start_date', moment(startEl.value).format('YYYY-MM-DD'));
    formData.append('end_date', moment(endEl.value).format('YYYY-MM-DD'));
    formData.append('total_story_point', project.total_story_point);
    formData.append('done_story_point', project.done_story_point);
    formData.append('status', project.status);
    if (project.image_url) {
      formData.append('image_url', project.image_url);
    }

    fetchClient.post('/api/projects', formData, { headers: { "Content-Type": 'multipart/form-data' } })
      .then(res => {
        setNotif(prev => [...prev, { type: 'success', message: res.data.message }]);
        navigate('/projects');
      })
      .catch(err => {
        console.error(err);
        setNotif(prev => [...prev, { type: 'failure', message: err.response?.data.message }]);
      })
      .finally(() => setAddIsLoading(false));
  }


  return (
    <div
      className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 shadow-md rounded-md"
    >
      <h4 className="text-xl font-semibold text-center dark:text-gray-50 mb-5">Add Project</h4>
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 dark:text-gray-50 font-bold mb-2 mt-5">
          Project Image
        </label>
        <label className="cursor-pointer">
          {project.image_url
            ? <img src={project?.image_url && URL.createObjectURL(project?.image_url)} className='rounded-full mx-auto h-20 aspect-square object-cover' alt="" />
            : <Avatar className='mx-auto object-cover' size="lg" rounded />}
          <input type="file" hidden onChange={(e) => setProject({ ...project, image_url: e.target.files[0] })} />
        </label>

        <label htmlFor="name" className="block text-gray-700 dark:text-gray-50 font-bold mb-2">
          Project Name
        </label>
        <TextInput
          value={project?.name}
          id="name"
          name="name"
          className="w-full"
          onChange={(e) => setProject({ ...project, name: e.target.value })}
          placeholder="Enter Name"
        />
        <label htmlFor="description" className="block mt-2 text-gray-700 dark:text-gray-50 font-bold mb-2">
          Description
        </label>
        <Textarea
          value={project?.description}
          id="description"
          name="description"
          className="w-full"
          onChange={(e) => setProject({ ...project, description: e.target.value })}
          placeholder="Enter Description"
          maxLength={500}
        />
        <label htmlFor="start_date" className="block mt-2 text-gray-700 dark:text-gray-50 font-bold mb-2">
          Start Date
        </label>
        <Datepicker id="start_date" />
        <label htmlFor="end_date" className="block mt-2 text-gray-700 dark:text-gray-50 font-bold mb-2">
          End Date
        </label>
        <Datepicker id="end_date" />
        <div className="flex gap-5">
          <div className="w-full">
            <label htmlFor="total_story_point" className="block mt-2 text-gray-700 dark:text-gray-50 font-bold mb-2">
              Total Story Point
            </label>
            <TextInput type="number" className="w-full" value={project.total_story_point} onChange={(e) => setProject({...project, total_story_point: e.target.value})} />
          </div>
          <div className="w-full">
            <label htmlFor="done_story_point" className="block mt-2 text-gray-700 dark:text-gray-50 font-bold mb-2">
              Done Story Point
            </label>
            <TextInput type="number" className="w-full" value={project.done_story_point} onChange={(e) => setProject({...project, done_story_point: e.target.value})}/>
          </div>
        </div>
        <label htmlFor="status" className="block text-gray-700 dark:text-gray-50 font-bold mb-2 mt-5">
          Status
        </label>
        <Select name="status" id="status" value={project.status} className='w-full' onChange={handleInput}>
          <option value={1}>
            Proposal
          </option>
          <option value={2}>
            On Going
          </option>
          <option value={3}>
            Done
          </option>
        </Select>


      </div>
      <div className="flex justify-end">
        <Button
          as={Link}
          color="failure"
          to='/projects'
          className="mr-2"
        >
          Cancel
        </Button>
        {addIsLoading
          ? <Button type="button" disabled>
            <BeatLoader color="white" size={6} className='my-1 mx-2' />
          </Button>
          : <Button type="button" onClick={saveProject}>
            Save
          </Button>}
      </div>
    </div>
  )
}

export default AddProject;