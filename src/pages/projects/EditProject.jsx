import { Button, Datepicker, Select, TextInput, Textarea } from "flowbite-react"
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import fetchClient from "../../utils/fetchClient";
import Loading from "../../components/Loading";
import { BeatLoader } from 'react-spinners';
import { UserState } from "../../context/UserProvider";
import moment from "moment";

function EditProject() {
    const [isLoading, setIsLoading] = useState(true);
    const [updateIsLoading, setUpdateIsLoading] = useState(false);
    const [project, setProject] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        image_url: '',
        total_story_point: '',
        done_story_point: '',
        status: '',
    });
    const { setNotif } = UserState();

    const [newImage, setNewImage] = useState('')

    const { id } = useParams();
    const navigate = useNavigate();

    // Retrieve selected Project data
    useEffect(() => {
        const getProject = async () => {
            try {
                const res = await fetchClient.get(`/api/projects/${id}`)
                setProject(res.data.data)
            } catch (err) {
                console.error(err);
            }
            setIsLoading(false)
        }
        getProject()
    }, [id]);

    // Update value input state
    const handleInput = (e) => {
        e.persist();
        let value = e.target.value;
        setProject({ ...project, [e.target.name]: value });
    }

    // Update Project
    const updateProject = async (e) => {
        e.preventDefault();
        setUpdateIsLoading(true);

        const startEl = document.querySelector('#start_date');
        const endEl = document.querySelector('#end_date');

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('name', project.name);
        formData.append('description', project.description);
        formData.append('start_date', moment(startEl.value).format('YYYY-MM-DD'));
        formData.append('end_date', moment(endEl.value).format('YYYY-MM-DD'));
        formData.append('total_story_point', project.total_story_point);
        formData.append('done_story_point', project.done_story_point);
        formData.append('status', project.status);
        if (newImage) {
            formData.append('image_url', newImage);
        }

        fetchClient.post(`/api/projects/${id}`, formData, { headers: { "Content-Type": 'multipart/form-data' } })
            .then(res => {
                setNotif(prev => [...prev, { type: 'success', message: res.data.message }]);
                navigate('/projects');
            })
            .catch(err => {
                console.error(err);
                setNotif(prev => [...prev, { type: 'failure', message: err.response?.data.message }]);
            })
            .finally(() => setUpdateIsLoading(false));
    }

    return (
        isLoading ? <Loading size='xl' /> :
            <div
                className="max-w-md mx-auto p-4 bg-white shadow-md dark:bg-gray-800 rounded-md"
            >
                <h4 className="text-xl font-semibold text-center dark:text-gray-50 mb-5">Edit Project</h4>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 dark:text-gray-50 font-bold mb-2 mt-5">
                        Profile Image
                    </label>
                    <label className="cursor-pointer">
                        <img src={newImage ? URL.createObjectURL(newImage) : project?.image_url} className='rounded-full mx-auto h-20 aspect-square object-cover' alt="" />
                        <input type="file" hidden onChange={(e) => setNewImage( e.target.files[0] )} />
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
                    <input type="date" id="start_date" className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg" value={project?.start_date} onChange={e => setProject(prev => ({...prev, start_date: e.target.value}))} />
                    <label htmlFor="end_date" className="block mt-2 text-gray-700 dark:text-gray-50 font-bold mb-2">
                        End Date
                    </label>
                    <input type="date" id="end_date" className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg" value={project?.end_date} onChange={e => setProject(prev => ({...prev, end_date: e.target.value}))} />
                    <div className="flex gap-5">
                        <div className="w-full">
                            <label htmlFor="total_story_point" className="block mt-2 text-gray-700 dark:text-gray-50 font-bold mb-2">
                                Total Story Point
                            </label>
                            <TextInput type="number" className="w-full" value={project.total_story_point} onChange={(e) => setProject({ ...project, total_story_point: e.target.value })} />
                        </div>
                        <div className="w-full">
                            <label htmlFor="done_story_point" className="block mt-2 text-gray-700 dark:text-gray-50 font-bold mb-2">
                                Done Story Point
                            </label>
                            <TextInput type="number" className="w-full" value={project.done_story_point} onChange={(e) => setProject({ ...project, done_story_point: e.target.value })} />
                        </div>
                    </div>
                    <label htmlFor="status" className="block text-gray-700 dark:text-gray-50 font-bold mb-2 mt-5">
                        Status
                    </label>
                    <Select name="status" id="status" value={project?.status} className='w-full' onChange={handleInput}>
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
                    {updateIsLoading
                        ? <Button type="button" disabled>
                            <BeatLoader color="white" size={6} className='my-1 mx-2' />
                        </Button>
                        : <Button type="button" onClick={updateProject}>
                            Save
                        </Button>}
                </div>
            </div>
    )
}

export default EditProject;