import { Button, TextInput } from "flowbite-react"
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { UserState } from "../../context/UserProvider";
import { addRole } from "../../api/ApiRole";

const AddRole = () => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setNotif } = UserState();

  const navigate = useNavigate();

  // Add Role
  const _addRole = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { error, message } = await addRole({ name });
    if(error) {
      console.error(error);
      setNotif(prev => [...prev, { type: 'failure', message: error }]);
    } else {
      setNotif(prev => [...prev, { type: 'success', message }]);
      navigate('/roles');
    }
    setIsLoading(false);
  }

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white shadow-md dark:bg-gray-800 rounded-md"
      onSubmit={_addRole}
    >
      <h4 className="text-xl font-semibold text-center dark:text-gray-50 mb-5">Add Role</h4>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 dark:text-gray-50 font-bold mb-2">
          Role
        </label>
        <TextInput
          value={name}
          id="name"
          className="w-full"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Role"
        />
      </div>
      <div className="flex justify-end">
        <Button
          as={Link}
          color="failure"
          to='/roles'
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
  );
}

export default AddRole;