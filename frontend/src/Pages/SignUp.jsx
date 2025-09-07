import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SignupPageVid from '../assets/signuppagevid.mp4'
import { signUpUser } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

export default function SignupDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    dobDay: '',
    dobMonth: '',
    dobYear: '',
    interest: '',
    newsletter: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const result = await dispatch(signUpUser(form)).unwrap()
      if(result){
        navigate('/')
      }
    } catch(err){
      console.error('signup failed:', err)
    }
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="flex h-screen">

      <div className="w-1/2 overflow-y-auto px-10 py-8 flex justify-center items-start hide-scrollbar">
        <div className='max-w-md w-full'>
          <div className='text-black font-bold text-center text-3xl mb-10'>
            <Link to='/'>BAZARR</Link>
          </div>

          <h2 className="text-xl font-semibold mb-6">Your wardrobe glow-up begins now</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
           
            <input
              name="firstName"
              placeholder="First name*"
              className="w-full border p-2 rounded"
              value={form.firstName}
              onChange={handleChange}
              required
            />

            <input
              name="lastName"
              placeholder="Last name*"
              className="w-full border p-2 rounded"
              value={form.lastName}
              onChange={handleChange}
              required
            />

             <input
              type="email"
              name="email"
              placeholder="Email*"
              className="w-full border p-2 rounded"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password* (min 10 chars)"
              className="w-full border p-2 rounded"
              minLength={10}
              value={form.password}
              onChange={handleChange}
              required
            />
            <p className="text-xs text-gray-500 -mt-3">Must be 10 or more characters</p>

            <label className="block text-sm font-medium">Date of birth*</label>
            <div className="flex gap-2">
              <select
                name="dobDay"
                className="w-full border p-2 rounded"
                onChange={handleChange}
                value={form.dobDay}
                required
              >
                <option value="">Day</option>
                {days.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>

              <select
                name="dobMonth"
                className="w-full border p-2 rounded"
                onChange={handleChange}
                value={form.dobMonth}
                required
              >
                <option value="">Month</option>
                {months.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>

              <select
                name="dobYear"
                className="w-full border p-2 rounded"
                onChange={handleChange}
                value={form.dobYear}
                required
              >
                <option value="">Year</option>
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            <label className="block text-sm font-medium mt-3">Mostly interested in*</label>
            <div className="flex gap-4">
              {['womenwear', 'menwear', 'unisex'].map((val) => (
                <label key={val} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="interest"
                    value={val}
                    checked={form.interest === val}
                    onChange={handleChange}
                    required
                  />
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </label>
              ))}
            </div>

            <div className="border p-3 rounded mt-4 text-sm">
              <p className="mb-2 font-medium">BE IN THE KNOW</p>
              <p>
                I want to receive exclusive discounts, new drops and personalised offers, style tips, and more from ASOS and our partners via email in line with our privacy notice. I can opt out anytime.
              </p>
              <label className="flex items-center mt-2 gap-2">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={form.newsletter}
                  onChange={handleChange}
                />
                Yes, sign me up!
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 font-bold rounded hover:opacity-90 transition mt-4"
            >
              JOIN BAZARR
            </button>
          </form>
        </div>
        </div>

      <div className='w-1/2 h-screen hidden md:block fixed right-0 top-0 bottom-0'>
      <video
      className='w-full h-full object-cover'
      autoPlay
      loop
      muted
      playsInline>
        <source src={SignupPageVid} type= "video/mp4" />
      </video>
      </div>
      </div>
  );
} 