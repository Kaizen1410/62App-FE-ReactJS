import { useState, useEffect } from 'react';
import { Button, TextInput } from 'flowbite-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import Loading from "../../components/Loading";
import { UserState } from '../../context/UserProvider';
import { oneEmployeePosition, updateEmployeePosition } from '../../api/ApiEmployeePosition';

const EditEmployeesPosition = () => {
  const [position, setPosition] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [updateIsLoading, setUpdateIsLoading] = useState(false);
  const { setNotif } = UserState();

  const { id } = useParams();
  const navigate = useNavigate()

  // Retrieve selected position data
  useEffect(() => {
    const getPosition = async () => {
      const { data, error } = await oneEmployeePosition(id);
      if(error) {
        console.error(error);
      } else {
        setPosition(data);
      }
      setIsLoading(false);
    }
    getPosition();
  }, [id]);

  // Update Employee Position
  const updatePosition = async (e) => {
    e.preventDefault();
    setUpdateIsLoading(true);

    const { error, message } = await updateEmployeePosition(id, position);
    if(error) {
      console.error(error);
      setNotif(prev => [...prev, { type: 'failure', message: error }]);
    } else {
      setNotif(prev => [...prev, { type: 'success', message }]);
      navigate(`/employee-positions`);
    }
    setUpdateIsLoading(false);
  }

  return (
    isLoading ? <Loading size='xl' /> :
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
  )
}
export default EditEmployeesPosition