import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  }
  //as we are submitting the form, it takes time to refect changes, so use async await
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent default form submission
    //check if any of the fields are missing
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage('All fields are required');
    }
    try {
      setLoading(true);
      setErrorMessage(null); //clean any previious error we had 
      const res = await fetch('api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      //convert it to json
      const data = await res.json();

      if(data.sucess === false){
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in');
      }
    } catch(err){
      setErrorMessage('Something went wrong, Please try again');
      setLoading(false);
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left side */}
        <div className="flex-1"> 
          <Link to="/" className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Basic's</span>
            Blogger
          </Link>
          <p className='text-sm mt-5'> This is the Basic's Blogger Project. To continue further, please signup with your email and Password or Googel Account</p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div >
              <Label value='Your Username' />
              <TextInput type='text' placeholder='Username' id='username' onChange={handleChange}/>
            </div>
            <div >
              <Label value='Your Email' />
              <TextInput type='email' placeholder='Email' id='email' onChange={handleChange}/>
            </div>
            <div >
              <Label value='Your Password' />
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange}/>
            </div>
            <Button gradientDuoTone="purpleToPink" type='submit' className='w-full' pill disabled={loading}> 
              {loading ? (
                <>
                <Spinner size='sm' />
                <span className='pl-3'>Loading...</span>
                </>
              ) : 'Sign Up'}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className='text-blue-500'> Sign In </Link>
          </div>
          {
            errorMessage && (
              <Alert type='error' className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
