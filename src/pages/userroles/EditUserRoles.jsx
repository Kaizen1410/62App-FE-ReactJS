import { Button, TextInput } from "flowbite-react"
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import fetchClient from "../../utils/fetchClient";
import Loading from "../../components/Loading";
import { SearchIcon } from "../../components/Icons";
import { BeatLoader } from "react-spinners";
import { UserState } from "../../context/UserProvider";

const EditUserRoles = () => {
  const [userRoles, setUserRoles] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updateIsLoading, setUpdateIsLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { setNotif } = UserState();

  // Retrieve User Roles data
  useEffect(() => {
    const getUserRoles = async () => {
      try {
        const res = await fetchClient.get(`/api/user-roles/${id}`);
        setUserRoles(res.data.data);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    }

    getUserRoles();
  }, [id]);

  // Search roles
  const handleSearch = async (search) => {
    const res = await fetchClient.get(`/api/roles?search=${search}`);
    setRoles(res.data.data);
  }

  // Update User Role
  const updateUserRoles = async () => {
    setUpdateIsLoading(true);

    const data = {
      role_id: userRoles.roles.map(role => role.id)
    }

    try {
      const res = await fetchClient.put(`api/user-roles/${id}`, data);
      setNotif(prev => [...prev, { type: 'success', message: res.data.message }]);
      navigate('/user-roles');
    } catch (err) {
      console.error(err);
    }
    setUpdateIsLoading(false);
  }

  // Add Role
  const addRole = (role) => {
    const check = userRoles.roles.find(r => r.id === role.id);
    if (!check) {
      setUserRoles(prev => ({ ...prev, roles: [...prev.roles, role] }));
    }
  }

  // Remove Role
  const removeRole = (roleId) => {
    const removed = userRoles.roles.filter(role => role.id !== roleId);
    setUserRoles(prev => ({ ...prev, roles: removed }));
  }

  return (
    <div className="min-h-96">
      {isLoading ? <Loading size='xl' /> : <div>
        <div className="max-w-md mx-auto p-4 bg-white shadow-md dark:bg-gray-800 rounded-md">
          <h4 className="text-xl font-semibold text-center dark:text-gray-50 mb-5">Edit User Role</h4>

          <div className="mb-4 dark:text-gray-50">
            <div>
              <span className="text-gray-700 font-bold dark:text-gray-50">Email: </span>
              {userRoles?.email}
            </div>
            <div>
              <span className="text-gray-700 font-bold dark:text-gray-50">Name: </span>
              {userRoles?.employee.name}
            </div>

            <label htmlFor="roles" className="block text-gray-700 font-bold mb-2 dark:text-gray-50">
              Roles:
            </label>

            <div className="flex flex-wrap gap-1 mb-4">
              {userRoles.roles.map(role => (
                <div className="border px-3 py-2 rounded-md dark:text-gray-50" key={role.id}>
                  <span>{role.name}</span>
                  <i className="fa-solid fa-xmark ml-2 cursor-pointer" onClick={() => removeRole(role.id)}></i>
                </div>
              ))}
            </div>

            <TextInput
              type="search"
              icon={SearchIcon}
              placeholder="Search role..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="mb-4 max-h-56 overflow-y-auto">
            {roles.map(r => (
              <div key={r.id} className="border px-3 py-2 mb-1 dark:text-gray-50 rounded-md cursor-pointer" onClick={() => addRole(r)}>
                {r.name}
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              as={Link}
              color="failure"
              to='/user-roles'
              className="mr-2"
            >
              Cancel
            </Button>
            {updateIsLoading
              ? <Button disabled>
                <BeatLoader color="white" size={6} className='my-1 mx-2' />
              </Button>
              : <Button onClick={updateUserRoles}>
                Save
              </Button>}
          </div>
        </div>
      </div>}
    </div>
  );
}

export default EditUserRoles