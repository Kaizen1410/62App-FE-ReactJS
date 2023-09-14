import {useState, useEffect} from 'react';
import { Button, TextInput  } from 'flowbite-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import fetchClient from '../../utils/fetchClient';
import { BeatLoader } from 'react-spinners';
import Loading from "../../components/Loading";
import { UserState } from '../../context/UserProvider';

const EditEmployeesPositions = () =>  {
  const [position, setPosition] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [updateIsLoading, setUpdateIsLoading] = useState(false);
  const {setNotif} = UserState();

  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const getPosition = async () => {
      try {
        const res = await fetchClient.get(`/api/employee-positions/${id}`);
        setPosition(res.data.data);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    }
    getPosition();
  }, []);
  
  const updatePosition = async (e) => {
    e.preventDefault();
    setUpdateIsLoading(true);
    try {
      const res = await fetchClient.put(`api/employee-positions/${id}`, position);
      setNotif(prev => [...prev, {type: 'add', message: res.data.message}]);
      navigate(`/employee-positions`);
    } catch(err) {
      console.error(err);
    }
    setUpdateIsLoading(false);
  }
  
  return (
    <div className="min-h-96">
    {isLoading ? <Loading size='xl' /> : <div>
      <form
        className="max-w-md mx-auto p-4 bg-white shadow-md dark:bg-gray-800 rounded-md"
        onSubmit={updatePosition}
      >
        <h4 className="text-xl font-semibold text-center dark:text-gray-50 mb-5">Edit Position</h4>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 dark:text-gray-50 font-bold mb-2">
            Position
          </label>
          <TextInput
            value={position?.name}
            id="name"
            className="w-full"
            onChange={(e) => setPosition({ ...position, name: e.target.value })}
          />
        </div>
        <div className="flex justify-end">
          <Button
            as={Link}
            color="failure"
            to='/employee-positions'
            className="mr-2"
          >
            Cancel
          </Button>
          {updateIsLoading
          ? <Button
          type="submit"
          disabled
        >
          <BeatLoader color="white" size={6} className='my-1 mx-2' />
        </Button>
          : <Button
            type="submit"
          >
            Save
          </Button>}
        </div>
      </form>
    </div>}
  </div>
  )
}
 export default EditEmployeesPositions