import type { NextPage } from 'next'
import { useQuery, useMutation } from '@apollo/client'
import GET_RESIDENTS from '../lib/graphql/queries/residents'
import CREATE_RESIDENTS from '../lib/graphql/mutations/createResident'
import { Header } from '../components/Header'
import { Modal } from '../components/Modal'
import { useCallback, useEffect, useState } from 'react'
import {
  UserAddIcon
} from '@heroicons/react/solid'
import { Form } from '../components/Form'
import { ValuesResidents } from '../types/types'

type Header = {
  name: string
}

const ResidentsPage: NextPage = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [isSSR, setIsSSR] = useState<boolean>(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  const [isAdd, setAdd] = useState<boolean>(false)
  const [selectedResident, setSelectedResident] = useState<number | null>(null)
  const { data, loading, refetch } = useQuery(GET_RESIDENTS)

  const tableHeaders: Array<Header> = [
    { name: 'Name' },
    { name: 'Room' },
    { name: 'Admission date' },
    { name: 'Add To Program' }
  ]

  const updateCache = async (cache, { data }) => {
    setAdd(false);
    await refetch();
  }

  const [createResident] = useMutation(CREATE_RESIDENTS)

  const handleCreateResident = (values: ValuesResidents) => {
    createResident({
      variables: {...values, name: `${values.firstName} ${values.lastName}`},
      update: updateCache
    });
  }

  const handleAddProgram = useCallback((id) => {
    setSelectedResident(id)
    setOpen(true)
  }, [])

  const renderCreateForm = () => {
    return <Form handleCreateResident={handleCreateResident}/>
  }

  const renderResidentList = () => {
    if (isAdd) {
      return renderCreateForm()
    }

    if (loading) {
      return null
    }

    return (<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
      <thead className='text-xs text-gray-700 uppercase'>
      <tr>
        {tableHeaders.map(header => <th scope='col' className='py-3 px-6'>
          {header.name}
        </th>)}
      </tr>
      </thead>
      <tbody>
      {data.residents.map((resident) => (<tr className='bg-white border-b'>
          <th scope='row' className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'>
            {resident.name}
          </th>
          <td className='py-4 px-6'>
            {resident.room}
          </td>
          <td className='py-4 px-6'>
            {resident.moveInDate.slice(0, 10)}
          </td>
          <td className='py-4 px-6'>
            <button onClick={() => handleAddProgram(resident.id)} type='button'
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Add
            </button>
          </td>
        </tr>
      ))}
      </tbody>
    </table>)
  }

  return (
    <div className='bg-gray-50'>
      <Header />
      <div>
        <div className='max-w-7xl mx-auto py-10 px-8 lg:flex lg:items-center lg:justify-between'>
          <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
            <span>{isAdd ? 'Add a Resident': 'Residents'}</span>
          </h2>
          {!isSSR && loading && <div role='status'>
            <svg aria-hidden='true' className='mr-2 w-8 h-8 text-gray-200 animate-spin fill-blue-600'
                 viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor' />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill' />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
          }
          <div className='mr-10'>
            <UserAddIcon onClick={() => setAdd(!isAdd)} className={`text-lg h-10 w-10 ${isAdd ? 'text-blue-700' : ''}`}
                         aria-hidden='true' />
          </div>
        </div>
      </div>
      <div className='overflow-x-auto relative px-8 min-h-full'>
        {renderResidentList()}
      </div>
      <Modal open={open} setOpen={setOpen} selectedResident={selectedResident} />
    </div>
  )
}

export default ResidentsPage
