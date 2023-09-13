import { Button } from "flowbite-react"
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import fetchClient from "../../utils/fetchClient";
import Loading from "../../components/Loading";
import { UserState } from "../../context/UserProvider";
import moment from "moment"

function EditLeave() {

  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()
  const { user } = UserState()
  const navigate = useNavigate()
  const [leave, setLeave] = useState()

  useEffect(() => {
    const getLeave = async () => {
      try {
        const res = await fetchClient.get(`/api/leaves/${id}`);
        setLeave(res.data.data);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    }

    getLeave();
  }, []);

  const updateLeave = async (e) => {
    const data = {...leave, is_approved : true, approved_by : user?.employee.id}
    try {
      await fetchClient.put(`api/leaves/${id}`, data);
      navigate('/leaves');
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <div className="h-screen">
      <div className="text-cyan-950 flex justify-between p-3">
        <Button as={Link} to="/leaves">
          <i className="fa-solid fa-angle-left"></i>
        </Button>
      </div>

      {isLoading ? <Loading size='xl' /> : <div>
        <div
          className="max-w-md mx-auto p-4 bg-white shadow-md dark:bg-gray-800 rounded-md"
        >
          <h4 className="text-xl font-semibold text-center dark:text-gray-50">Edit Leave</h4>
          <div className="mb-4 dark:text-gray-50">
            <div>
              <span className="text-gray-700 font-bold dark:text-gray-50">Name: </span>
              {leave?.employee.name}
            </div>
            <div>
              <span className="text-gray-700 font-bold dark:text-gray-50">Date Leave: </span>
              {moment(leave?.date_leave).format('DD MMMM YYYY')}
            </div>
          </div>
          <div className="flex justify-end">
            <Link
              to='/leaves'
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mr-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md"
              onClick={updateLeave}
            >
              Approve
            </button>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default EditLeave;