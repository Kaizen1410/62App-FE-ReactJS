import { Table, Button } from "flowbite-react"
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from "../../components/Loading";
import PopUpModal from "../../components/DeleteModal";

const EditRoles = () => {

  const [userRoles, setUserRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);


  return (

    <div className="">
      <div className="row">
        <div className="col-start-12">
          <div className="">
            <div className="card-title text-cyan-950 flex justify-between p-3 xt-">
            <Button to="/roles" className="btn btn-light float-end justify-left">
                Back
              </Button>
              
              
            </div>
            <div className="card-body">
            <form
        className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md"
      >
        <h4 className="text-xl font-semibold text-center">Edit Role</h4>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Role
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="position" className="block text-gray-700 font-bold mb-2">
            Members
          </label>
          <input
            type="text"
            id="members"
            name="mebers"
            className="border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300 w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mr-2"
          >
          Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
           Save
          </button>
        </div>
      </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditRoles