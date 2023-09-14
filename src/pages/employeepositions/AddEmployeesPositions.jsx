import {useState} from 'react';
import { Button, TextInput } from 'flowbite-react';
import { Link,useNavigate } from 'react-router-dom';
import fetchClient from '../../utils/fetchClient';
import { BeatLoader } from 'react-spinners';

const AddEmployeesPositions = () => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  
  const AddEmployeesPositions = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetchClient.post('/api/employee-positions', { name });
      navigate('/employee-positions');
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }
  
  return (
    <div className="min-h-96">
      <div>
        <form
          className="max-w-md mx-auto p-4 bg-white shadow-md dark:bg-gray-800 rounded-md"
          onSubmit={AddEmployeesPositions}
        >
          <h4 className="text-xl font-semibold text-center dark:text-gray-50 mb-5">Add Position</h4>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 dark:text-gray-50 font-bold mb-2">
              Position
            </label>
            <TextInput
              value={name}
              id="name"
              className="w-full"
              onChange={(e) => setName(e.target.value)}
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
            {isLoading
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
          </div>
          </div>
  )
}

export default AddEmployeesPositions
