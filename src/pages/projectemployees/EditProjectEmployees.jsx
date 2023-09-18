import { Button, Label, Select, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'

const EditProjectEmployees = () => {
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md dark:bg-gray-800 rounded-md">
      <h4 className="text-xl font-semibold text-center dark:text-gray-50 mb-5">Edit Project Employee</h4>

      <div className="mb-4 dark:text-gray-50">
        <div>
        <label  className="text-gray-700 font-bold dark:text-gray-50"   htmlFor="start_date ">Start Date</label>
          <TextInput
            type="date"
            id="start_date"
            name="start_date"
          />
        </div>
        <div>
          <label className="text-gray-700 font-bold dark:text-gray-50" htmlFor="end_date">End Date</label>
          <TextInput
            type="date"
            id="end_date"
            name="end_date"
          />
        </div>
        <div
      className="max-w-md"
      id="select"
    >
      <div className="mb-2 block">
        <Label
          htmlFor="status"
          value="Status"
          
        />
      </div>
      <Select
        id="Status"
        required
      >
        <option>
          Planning
        </option>
        <option>
            Join
        </option>
        </Select>
        </div>


        </div>

        <div className="flex justify-end">
        <Button
            as={Link}
            color="failure"
            to='/projectemployees'
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
              type="submit"
            >
              Save
            </Button>
        </div>
        </div>
  )
}

export default EditProjectEmployees