import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useMutation, useQuery } from '@apollo/client'
import GET_PROGRAMS from '../../lib/graphql/queries/programs'
import SET_ATTENDANCE from '../../lib/graphql/mutations/setAttendance'

type Status = {
  name: string
}

const statusList: Array<Status> = [
  {name: 'Active'},
  {name: 'Passive'},
  {name: 'Declined'},
  {name: 'Undefined'},
]

interface ModalProps {
  open: boolean,
  setOpen: (values: boolean) => void;
  selectedResident: number;
}

export const Modal: React.FC<ModalProps> = ({open, setOpen, selectedResident}: ModalProps) => {

  const cancelButtonRef = useRef(null)
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState(statusList[0].name)
  const { data, loading } = useQuery(GET_PROGRAMS);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProgram(e.target.value);
  };

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const handleSubmit = (cache, {data}) => {
    setOpen(false);
  };

  const [setAttendance] = useMutation(SET_ATTENDANCE);

  const handleAttendance = async (event : React.MouseEvent<HTMLButtonElement>) => {
      await setAttendance({
        variables: {
          residentId: selectedResident,
          programId: selectedProgram,
          status: selectedStatus
        },
        update: handleSubmit
      });
  }

  const renderSelectPrograms = () => {
    if (loading) {
      return <></>
    }
    return data.programs.map(program => <option value={program.id}>{program.name}</option>)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Add To Program
                      </Dialog.Title>
                      <div className="mt-2">
                        <label htmlFor="programs"
                               className="block mb-2 text-sm font-medium text-gray-900">Select a program</label>
                        <select onChange={handleChange} id="programs"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                          <option selected>Select</option>
                          {renderSelectPrograms()}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <div className="mt-2">
                        <label htmlFor="status"
                               className="block mb-2 text-sm font-medium text-gray-900">Select Status</label>
                        <select onChange={handleChangeStatus} id="status"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                          {statusList.map((status, index) => <option value={status.name}>{status.name}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-700 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleAttendance}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
