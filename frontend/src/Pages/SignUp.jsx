import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import SignUpImg from '../assets/SUIMG.png';

export default function SignupDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const emailFromLogin = state?.email || '';

  if (!emailFromLogin) {
    navigate('/', { replace: true });
  }

  const [form, setForm] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table({ email: emailFromLogin, ...form });
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 bg-white">
        <div className="max-w-md w-full">
          <div className='text-black font-medium flex items-center justify-center text-3xl mb-10'>
            <Link to='/'>BAZARR</Link>
          </div>

          <h2 className="text-xl font-semibold mb-6">Your wardrobe glow-up begins now</h2>

          <div className="flex justify-between items-center mb-4">
            <p>{emailFromLogin}</p>
            <button
              className="text-sm underline"
              onClick={() => navigate(-1)}
            >
              Edit
            </button>
          </div>

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
              {['womenswear', 'menswear'].map((val) => (
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

      {/* Right: Image */}
      <div className="hidden md:block md:w-1/2 h-screen">
        <img
          src={SignUpImg}
          alt="Fashion model"
          className="w-full h-full object-contain flex justify-end"
        />
      </div>
    </div>
  );
}
