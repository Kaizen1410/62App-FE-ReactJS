import { Button } from "flowbite-react"
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import fetchClient from "../../utils/fetchClient";
import Loading from "../../components/Loading";
import { UserState } from "../../context/UserProvider";
import moment from "moment"
import { BeatLoader } from "react-spinners";

function EditLeave() {
  const [isLoading, setIsLoading] = useState(true);
  const [updateIsLoading, setUpdateIsLoading] = useState(false);
  const { user, setNotif } = UserState();
  const [leave, setLeave] = useState();

  const { id } = useParams();
  const navigate = useNavigate();

  // Retrieve selected leave data
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
  }, [id]);

  // Update Leave
  const updateLeave = async (e) => {
    setUpdateIsLoading(true);
    const data = { ...leave, is_approved: true, approved_by: user?.employee.id }
    try {
      const res = await fetchClient.put(`api/leaves/${id}`, data);
      setNotif(prev => [...prev, { type: 'success', message: res.data.message }]);
      navigate('/leaves');
    } catch (err) {
      console.error(err);
    }
    setUpdateIsLoading(false);
  }

  return (
    <div className="min-h-96">
      {isLoading ? <Loading size='xl' /> : <div>
        <div
          className="max-w-md mx-auto p-4 bg-white shadow-md dark:bg-gray-800 rounded-md"
        >
          <h4 className="text-xl font-semibold text-center mb-5 dark:text-gray-50">Edit Leave</h4>
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
            <Button
              color="failure"
              as={Link}
              to='/leaves'
              className="mr-2"
            >
              Cancel
            </Button>
            {updateIsLoading
              ? <Button type="button" disabled>
                <BeatLoader color="white" size={6} className='my-1 mx-2' />
              </Button>
              : <Button type="button" onClick={updateLeave}>
                Approve
              </Button>}
          </div>
        </div>
      </div>}
    </div>
  )
}

export default EditLeave;