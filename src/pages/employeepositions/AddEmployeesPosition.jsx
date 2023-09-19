import { useState } from 'react';
import { Button, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { UserState } from '../../context/UserProvider';
import { addEmployeePosition } from '../../api/ApiEmployeePosition';

const AddEmployeesPosition = () => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setNotif } = UserState();

  const navigate = useNavigate();

  // Add Employee Position
  const _addEmployeesPosition = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { error, message } = await addEmployeePosition({ name })
    if(error) {
      console.error(error);
      setNotif(prev => [...prev, { type: 'failure', message: error }]);
    } else {
      navigate('/employee-positions');
      setNotif(prev => [...prev, { type: 'success', message }]);
    }
    setIsLoading(false);
  }

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white shadow-md dark:bg-gray-800 rounded-md"
      onSubmit={_addEmployeesPosition}
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
          placeholder='Enter Position'
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
  )
}

export default AddEmployeesPosition