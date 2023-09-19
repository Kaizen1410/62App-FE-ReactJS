import { Button, Select, ToggleSwitch } from "flowbite-react"
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { UserState } from "../../context/UserProvider";
import { BeatLoader } from "react-spinners";
import { getEmployees } from "../../api/ApiEmployee";
import { oneLeave, updateLeave } from "../../api/ApiLeave";

function EditLeave() {
  const [isLoading, setIsLoading] = useState(true);
  const [updateIsLoading, setUpdateIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [leave, setLeave] = useState();
  const { setNotif } = UserState();

  const { id } = useParams();
  const navigate = useNavigate();

  // Retrieve selected leave data
  useEffect(() => {
    const getLeave = async () => {
      setIsLoading(true);
      const { data, error } = await oneLeave(id);
      if(error) {
        console.error(error);
      } else {
        setLeave(data);
      }
      setIsLoading(false);
    }
    
    getAllEmployees();
    getLeave();
  }, [id]);

  const getAllEmployees = async () => {
    setIsLoading(true);
    const { data, error } = await getEmployees();
    if (error) {
      console.error(error);
      setIsLoading(false);
    } else {
      setEmployees(data);
    }
  }

  // Update Leave
  const _updateLeave = async (e) => {
    setUpdateIsLoading(true);
    const body = {
      employee_id: leave.employee_id,
      date_leave: leave.date_leave,
      is_approved: leave.is_approved,
    }

    if(leave.is_approved) {
      body.approved_by = leave.approved_by.id;
    }

    const { error, message } = await updateLeave(id, body);
    if(error) {
      console.error(error);
      setNotif(prev => [...prev, { type: 'failure', message: error }]);
    } else {
      setNotif(prev => [...prev, { type: 'success', message }]);
      navigate('/leaves');
    }
    setUpdateIsLoading(false);
  }

  return (
    isLoading ? <Loading size='xl' /> :
      <div
        className="max-w-md mx-auto p-4 bg-white shadow-md dark:bg-gray-800 rounded-md"
      >
        <h4 className="text-xl font-semibold text-center mb-5 dark:text-gray-50">Edit Leave</h4>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 dark:text-gray-50 font-bold mb-2">Name</label>
          <Select id="name" value={leave?.employee_id} onChange={e => setLeave(prev => ({...prev, employee_id: e.target.value}))}>
            {employees.map(employee => (
              <option key={employee.id} value={employee.id}>{employee.name}</option>
            ))}
          </Select>

          <label htmlFor="date_leave" className="block text-gray-700 dark:text-gray-50 font-bold mb-2">
            Date Leave
          </label>
          <input type="date" id="date_leave" className="w-full rounded-md" value={leave?.date_leave} onChange={e => setLeave(prev => ({...prev, date_leave: e.target.value}))} />

          <label htmlFor="isApproved" className="block text-gray-700 dark:text-gray-50 font-bold mb-2">
            Is Approved
          </label>
          <ToggleSwitch
            checked={leave?.is_approved}
            onChange={() => setLeave(prev => ({...prev, is_approved: !prev.is_approved}))}
          />

          {leave?.is_approved ? (
            <>
              <label htmlFor="approvedBy" className="block text-gray-700 dark:text-gray-50 font-bold mb-2">Approved By</label>
              <Select id="approvedBy" value={leave?.approved_by?.id} onChange={e => setLeave(prev => ({...prev, approved_by: {...prev.approved_by, id: e.target.value}}))}>
                {employees.map(employee => (
                  <option key={employee.id} value={employee.id}>{employee.name}</option>
                ))}
              </Select>
            </>
          ) : <></>}
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
            : <Button type="button" onClick={_updateLeave}>
              Approve
            </Button>}
        </div>
      </div>
  )
}

export default EditLeave;