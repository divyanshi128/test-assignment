import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../config";
import toast from 'react-hot-toast';


const Profile = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        jobRole: "",
        state: "",
        city: "",
    });

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [jobRoles, setJobRoles] = useState([]);


    useEffect(() => {
        // Fetch states
        axios.get(`${BACKEND_BASE_URL}/api/states/`)
            .then(res => setStates(res.data))
            .catch(err => console.error("Failed to fetch states", err));

        // Fetch cities
        axios.get(`${BACKEND_BASE_URL}/api/cities/`)
            .then(res => setCities(res.data))
            .catch(err => console.error("Failed to fetch cities", err));

        // Fetch job roles
        axios.get(`${BACKEND_BASE_URL}/api/roles/`)
            .then(res => setJobRoles(res.data))
            .catch(err => console.error("Failed to fetch job roles", err));
    }, []);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        const payload = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            job_role: formData.jobRole,
            state: formData.state,
            city: formData.city,
        };

        axios
            .post(`${BACKEND_BASE_URL}/api/profile/`, payload)
            .then(() => {
                toast.success("Profile saved successfully!");
            })
            .catch((err) => {
                console.error("Error saving profile", err);
                toast.error("Failed to save profile!");
            });
    };



    return (
        <div className="flex-col h-[70vh] justify-between p-6">
            <div>
                <h2 className="text-xl font-semibold mb-6">Manage Profile</h2>

                <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* First name */}
                    <div>
                        <label className="block text-sm mb-1 text-gray-600">First name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter your first name"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>

                    {/* Last name */}
                    <div>
                        <label className="block text-sm mb-1 text-gray-600">Last name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>

                    {/* Job Role */}
                    <div>
                        <label className="block text-sm mb-1 text-gray-600">Job Role</label>
                        <select
                            name="jobRole"
                            value={formData.jobRole}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            <option value="">Select your role</option>
                            {jobRoles.map((role) => (
                                <option key={role.id} value={role.title}>
                                    {role.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* State */}
                    <div>
                        <label className="block text-sm mb-1 text-gray-600">State</label>
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            <option value="">Select your state</option>
                            {states.map((state) => (
                                <option key={state.id} value={state.name}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* City */}
                    <div>
                        <label className="block text-sm mb-1 text-gray-600">City</label>
                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            <option value="">Select your current city</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
            </div>

            <div className="flex justify-end gap-4 mt-60">
                <button className="bg-gray-300 hover:bg-gray-400 text-white px-5 py-2 rounded-md text-sm">
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default Profile;
