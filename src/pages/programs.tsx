import type { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { Header } from '../components/Header'
import {
  ViewGridAddIcon
} from '@heroicons/react/solid'
import GET_PROGRAMS from '../lib/graphql/queries/programs'

const ProgramsPage: NextPage = () => {
  const { data, loading } = useQuery(GET_PROGRAMS)
  const tableHeaders = [
    { name: 'Name' },
    { name: 'Location' },
    { name: 'Start at' },
    { name: 'End at' }
  ]

  const renderProgramList = () => {
    if (loading) {
      return <></>
    }
    return data.programs.map((program) => (<tr className='bg-white border-b'>
        <th scope='row' className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'>
          {program.name}
        </th>
        <td className='py-4 px-6'>
          {program.location}
        </td>
        <td className='py-4 px-6'>
          {program.start.slice(0, 10)}{' '}{program.start.slice(11, 16)}
        </td>
        <td className='py-4 px-6'>
          {program.end.slice(0, 10)}{' '}{program.end.slice(11, 16)}
        </td>
      </tr>
    ))
  }

  return (
    <div className='bg-gray-50'>
      <Header />
      <div>
        <div className='max-w-7xl mx-auto py-10 px-8 lg:flex lg:items-center lg:justify-between'>
          <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
            <span className='block'>Programs</span>
          </h2>
          <div className='mr-10'>
            <ViewGridAddIcon className='text-lg h-10 w-10 text-blue-700' aria-hidden='true' />
          </div>
        </div>
      </div>
      <div className='overflow-x-auto relative px-8'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase'>
          <tr>
            {tableHeaders.map(header => <th scope='col' className='py-3 px-6'>
              {header.name}
            </th>)}
          </tr>
          </thead>
          <tbody>
          {renderProgramList()}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProgramsPage
