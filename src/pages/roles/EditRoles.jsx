import { Button } from "flowbite-react"
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import fetchClient from "../../utils/fetchClient";
import Loading from "../../components/Loading";

const EditRoles = () => {
  const [role, setRole] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate()

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
  }, []);

  const updateRole = async (e) => {
    e.preventDefault();
    try {
      await fetchClient.put(`api/roles/${id}`, role);
      navigate('/roles');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="text-cyan-950 flex justify-between p-3 xt-">
        <Button as={Link} to="/roles">
          <i className="fa-solid fa-angle-left"></i>
        </Button>
      </div>

      {isLoading ? <Loading size='xl' /> : <div>
        <form
          className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md"
          onSubmit={updateRole}
        >
          <h4 className="text-xl font-semibold text-center">Edit Role</h4>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Role
            </label>
            <input
              type="text"
              value={role?.name}
              id="name"
              name="name"
              className="border rounded-md py-1 px-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-300 w-full"
              onChange={(e) => setRole({...role, name: e.target.value})}
            />
          </div>
          <div className="flex justify-end">
            <Link
              to='/roles'
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
    </>
  );
}

export default EditRoles