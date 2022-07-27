import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import { ValuesResidents } from '../../types/types'

interface FormProps {
  handleCreateResident: (values: ValuesResidents) => void;
}

export const Form: React.FC<FormProps> = ({handleCreateResident}: FormProps) => {

  const [values,setValues] = useState<ValuesResidents>({
    firstName : "",
    lastName : "",
    room : "",
    birthDate : "",
    moveInDate: "",
    ambulation: "NOLIMITATIONS",
    levelOfCare: "INDEPENDENT"
  });
  const [errors, setErrors] = useState<Array<string>>([])

  const handleChange = (event : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setValues({...values,[event.target.name] : event.target.value});
    setErrors([]);
  }

  const onAdmissionSelect = (value: Date) => {
    setValues({...values, 'moveInDate' : value.toISOString()});
    setErrors([]);
  }

  const onBirthSelect = (value: Date) => {
    setValues({...values, 'birthDate' : value.toISOString()});
    setErrors([]);
  }

  const handleValidation = () => {
    let errorsList = [];
    if (values.firstName === '') {
      errorsList.push('First Name is missing')
    }
    if (values.lastName === '') {
      errorsList.push('Last Name is missing')
    }
    if (values.room === '') {
      errorsList.push('Room No is missing')
    }
    if (values.birthDate === '') {
      errorsList.push('Birth Date is missing')
    }
    if (values.moveInDate === '') {
      errorsList.push('Move In Date is missing')
    }
    setErrors(errorsList);
    return errorsList.length === 0
  }

  const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (handleValidation()) {
      handleCreateResident(values);
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} >
      <div className='grid gap-6 mb-6 md:grid-cols-2'>
        <div>
          <label htmlFor='firstName' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600'>First
            name</label>
          <input type='text' name='firstName'
                 onChange={handleChange}
                 className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                 placeholder='John' />
        </div>
        <div>
          <label htmlFor='lastName' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600'>Last
            name</label>
          <input type='text' name='lastName'
                 onChange={handleChange}
                 className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                 placeholder='Doe' />
        </div>
        <div>
          <label htmlFor='birthDate' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600'>DOB
          </label>
          <DatePicker maxDate={Date.now()} value={values.birthDate? values.birthDate.slice(0, 10): ''} onSelect={onBirthSelect} customInput={
            <input type='text' name='birthDate'
                   className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                   placeholder='Birth Date' />
          }/>
        </div>
        <div>
          <label htmlFor='moveInDate' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600'>Admission Date
          </label>
          <DatePicker maxDate={Date.now()} value={values.moveInDate? values.moveInDate.slice(0, 10): ''} onSelect={onAdmissionSelect} customInput={
            <input type='text' name='moveInDate'
                   className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                   placeholder='Admission Date' />
          }/>
        </div>
        <div>
          <label htmlFor='room' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600'>Room
            No</label>
          <input type='text' name='room'
                 onChange={handleChange}
                 className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                 placeholder='Room' />
        </div>
        <div>
          <label htmlFor="ambulation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Select
            an ambulation</label>
          <select name="ambulation"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="NOLIMITATIONS">NO LIMITATIONS</option>
            <option value="CANE">CANE</option>
            <option value="WALKER">WALKER</option>
            <option value="WHEELCHAIR">WHEELCHAIR</option>
          </select>
        </div>
        <div>
          <label htmlFor="levelOfCare" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Level
            of care</label>
          <select name="levelOfCare"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="INDEPENDENT">INDEPENDENT</option>
            <option value="ASSISTED">ASSISTED</option>
            <option value="MEMORY">MEMORY</option>
            <option value="LONGTERM">LONGTERM</option>
          </select>
        </div>
      </div>
      {errors.map(error => <p>{error}</p>)}
      <button type="submit"
              className="text-white mt-5 mb-20 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
      </button>
    </form>)
}
