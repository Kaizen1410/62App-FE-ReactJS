import { Button } from "flowbite-react"
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import fetchClient from "../../utils/fetchClient";
import Loading from "../../components/Loading";

const EditUserRoles = () => {
  const [userRoles, setUserRoles] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchRole, setSearchRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate()

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
  }, []);

  useEffect(() => {
    const getRoles = async () => {
      const res = await fetchClient.get(`/api/roles?search=${searchRole}`);
      setRoles(res.data.data);
    }

    getRoles();
  }, [searchRole]);


  const updateUserRoles = async (e) => {
    e.preventDefault();

    const data = {
      role_id: userRoles.roles.map(role => role.id)
    }

    console.log(data)

    try {
      await fetchClient.put(`api/user-roles/${id}`, data);
      navigate('/user-roles');
    } catch (err) {
      console.error(err);
    }
  }

  const addRole = (r) => {
    const check = userRoles.roles.find(role => role === r);
    if (!check) {
      setUserRoles(prev => ({ ...prev, roles: [...prev.roles, r] }));
    }
  }

  const removeRole = (roleId) => {
    const removed = userRoles.roles.filter(role => role.id !== roleId);
    setUserRoles(prev => ({ ...prev, roles: removed }));
  }

  return (
    <div className="h-screen">
      <div className="text-cyan-950 flex justify-between p-3 xt-">
        <Button as={Link} to="/user-roles">
          <i className="fa-solid fa-angle-left"></i>
        </Button>
      </div>

      {isLoading ? <Loading size='xl' /> : <div>
        <form
          className="max-w-md mx-auto p-4 bg-white shadow-md dark:bg-gray-800 rounded-md"
          onSubmit={updateUserRoles}
        >
          <h4 className="text-xl font-semibold text-center mb-4 dark:text-gray-50">Edit User Role</h4>
          
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

            <input
              type="text"
              id="roles"
              className="border rounded-md py-1 px-2 text-gray-700  focus:outline-none focus:ring focus:border-blue-300 w-full"
              onChange={(e) => setSearchRole(e.target.value)}
            />
          </div>

          <div className="mb-4 max-h-64 overflow-y-auto">
            {roles.map(r => (
              <div key={r.id} className="border px-3 py-2 mb-1 dark:text-gray-50 rounded-md cursor-pointer" onClick={() => addRole(r)}>
                {r.name}
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Link
              to='/user-roles'
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mr-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>}
    </div>
  );
}

export default EditUserRoles