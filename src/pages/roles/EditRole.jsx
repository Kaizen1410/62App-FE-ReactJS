import { Button, TextInput } from "flowbite-react"
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import fetchClient from "../../utils/fetchClient";
import Loading from "../../components/Loading";
import { BeatLoader } from "react-spinners";
import { UserState } from "../../context/UserProvider";

const EditRole = () => {
  const [role, setRole] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [updateIsLoading, setUpdateIsLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { setNotif } = UserState();

  // Retrieve selected role data
  useEffect(() => {
    const getRole = async () => {
      try {
        const res = await fetchClient.get(`/api/roles/${id}`);
        setRole(res.data.data);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    }

    getRole();
  }, [id]);

  // Update Role
  const updateRole = async (e) => {
    e.preventDefault();
    setUpdateIsLoading(true);
    try {
      const res = await fetchClient.put(`api/roles/${id}`, role);
      setNotif(prev => [...prev, { type: 'success', message: res.data.message }]);
      navigate('/roles');

    } catch (err) {
      console.error(err);
      setNotif(prev => [...prev, { type: 'failure', message: err.response?.data.message }]);
    }
    setUpdateIsLoading(false);
  }

  return (
    <div className="min-h-96">
      {isLoading ? <Loading size='xl' /> : <div>
        <form
          className="max-w-md mx-auto p-4 bg-white shadow-md dark:bg-gray-800 rounded-md"
          onSubmit={updateRole}
        >
          <h4 className="text-xl font-semibold text-center dark:text-gray-50 mb-5">Edit Role</h4>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 dark:text-gray-50 font-bold mb-2">
              Role
            </label>
            <TextInput
              value={role?.name}
              id="name"
              className="w-full"
              onChange={(e) => setRole({ ...role, name: e.target.value })}
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
  );
}

export default EditRole;