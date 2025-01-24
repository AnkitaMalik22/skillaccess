import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import {
  googleRegisterCollege,
  registerCollege,
} from "../../../redux/college/auth/authSlice";
import { useDispatch } from "react-redux";
import { LuEye, LuEyeOff } from "react-icons/lu";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Layout from "./Layout";
import CircularLoader from "../../../components/CircularLoader";
import {
  GetCountries,
  GetState,
  GetCity,
  GetLanguages,
  GetRegions,
  GetPhonecodes,
} from "react-country-state-city";

//to do
// form validation
// handle location get error
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [phone, setPhone] = useState("+91");
  const [Credentials, setCredentials] = useState({
    Email: "",
    Password: "",
    Phone: null,
    University: "",
  });
  const [type, setType] = useState("password");

  // Location states
  const [region, setRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  // Lists for dropdowns
  const [regionsList, setRegionsList] = useState([]);
  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  // checkbox
  const [checked, setChecked] = useState(false);

  // Initial data fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const regions = await GetRegions();
        const countries = await GetCountries();

        setRegionsList(regions);
        setCountriesList(countries);

        // Set default values
        if (regions.length > 0) setRegion(regions[0].name);
        if (countries.length > 0) {
          setSelectedCountry(countries[0]);
          // Fetch states for default country
          const states = await GetState(countries[0].id);
          setStateList(states);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast.error("Error loading location data");
      }
    };

    fetchInitialData();
  }, []);

  // Fetch states when country changes
  const handleCountryChange = async (e) => {
    const country = countriesList[e.target.value];
    setSelectedCountry(country);
    setSelectedState(null);
    setSelectedCity(null);
    setCityList([]);

    try {
      const states = await GetState(country.id);
      setStateList(states);
    } catch (error) {
      console.error("Error fetching states:", error);
      toast.error("Error loading states");
    }
  };

  // Fetch cities when state changes
  const handleStateChange = async (e) => {
    const state = stateList[e.target.value];
    setSelectedState(state);
    setSelectedCity(null);

    try {
      console.log(selectedCountry, state);
      const cities = await GetCity(selectedCountry.id, state.id);
      console.log(cities);
      setCityList(cities, "citites");
    } catch (error) {
      console.error("Error fetching cities:", error);
      toast.error("Error loading cities");
    }
  };

  // Handle city selection
  const handleCityChange = (e) => {
    const city = cityList[e.target.value];
    setSelectedCity(city);
  };

  const changeHandler = (e) => {
    e.preventDefault();
    const cred = e.target.name;
    const val = e.target.value;

    if ((cred === "FirstName" || cred === "LastName") && val.length > 15) {
      return;
    }

    setCredentials((prev) => ({ ...prev, [cred]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const { Email, Password, Phone, University, ZipCode } = Credentials;

    if (phone.length !== 12) {
      toast.error("Please enter a valid phone number");
      setLoader(false);
      return;
    }

    if (!selectedCountry || !selectedState) {
      toast.error("Please select country and state");
      setLoader(false);
      return;
    }

    if (!ZipCode) {
      toast.error("Please enter a valid zip code");
      setLoader(false);
      return;
    }

    const data = {
      Phone: phone,
      Email,
      Password,
      CollegeName: University,
      Country: selectedCountry?.name,
      State: selectedState?.name,
      City: selectedCity?.name,
      Region: region,
      ZipCode: ZipCode,
    };

    try {
      const ch = await dispatch(registerCollege(data));
      if (ch.meta.requestStatus === "fulfilled") {
        setCredentials({});
        setLoader(false);
        navigate("/college/dashboard");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed");
    } finally {
      setLoader(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex gap-2 justify-center mb-4 md:mb-8">
          {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="43"
                height="32"
                viewBox="0 0 43 32"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.4993 8.00009L16.4993 8.00012L12.4997 11.9997L21.4997 21.0006L30.4997 11.9997L26.4929 8.0001H16.4993V8.00009ZM21.4997 32.0004L21.499 31.9997L0.5 10.9998L12.5033 0H30.4997L42.5003 10.9998L21.5004 31.9997L21.4997 32.0004Z"
                  fill="#0052CC"
                />
              </svg>
              <h1 className="font-bold text-[22px]">Skill Access</h1> */}
          <img src="/images/logoFinal.png" alt="logo" className="w-60" />
        </div>

        <h2 className="font-bold text-2xl text-center text-[#171717] mb-2">
          Sign Up to Skill Access
        </h2>
        <h2 className="font-normal text-center text-[#8F92A1] text-sm mb-8">
          Create an account to continue!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white">
          {/* College Name Field */}
          <div>
            <label
              htmlFor="CollegeName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              College Name
            </label>
            <input
              type="text"
              name="CollegeName"
              id="CollegeName"
              value={Credentials.CollegeName}
              onChange={changeHandler}
              placeholder="Enter your college name"
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-accent focus:border-transparent transition-colors px-4 py-3"
            />
          </div>

          {/* Phone & University Name Input */}
          <div className="flex gap-2">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <PhoneInput
                country={"in"}
                value={phone}
                onChange={(value) => setPhone(value)}
                containerClass="w-full h-[50px] !rounded-3xl"
                inputClass="w-full !rounded-lg !h-[49px] border-gray-300 shadow-sm focus:ring-1 focus:ring-accent focus:border-transparent transition-colors px-4 py-3"
                buttonClass="!rounded-lg border-gray-300 shadow-sm !h-[49px]"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                University Name
              </label>
              <input
                type="text"
                name="University"
                id="University"
                value={Credentials.University}
                onChange={changeHandler}
                placeholder="Enter your university name"
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-accent focus:border-transparent transition-colors px-4 py-3"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              name="Email"
              id="Email"
              value={Credentials.Email}
              onChange={changeHandler}
              placeholder="Enter your email"
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-accent focus:border-transparent transition-colors px-4 py-3"
            />
          </div>

          {/* Website Link Field */}
          <div>
            <label
              htmlFor="Website"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Website Link
            </label>
            <input
              type="text"
              name="Website"
              id="Website"
              value={Credentials.Website}
              onChange={changeHandler}
              placeholder="Enter your website link"
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-accent focus:border-transparent transition-colors px-4 py-3"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={type}
                name="Password"
                id="Password"
                value={Credentials.Password}
                onChange={changeHandler}
                placeholder="Enter your password"
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-accent focus:border-transparent transition-colors px-4 py-3"
              />
              <button
                type="button"
                onClick={() =>
                  setType(type === "password" ? "text" : "password")
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {type === "password" ? (
                  <LuEyeOff className="w-5 h-5" />
                ) : (
                  <LuEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Location Fields */}
          <div className="flex gap-2">
            <div className="w-1/2">
              <label
                htmlFor="Region"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Region
              </label>
              <select
                id="Region"
                // value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-accent focus:border-transparent transition-colors px-4 py-3"
              >
                {regionsList.map((reg, index) => (
                  <option key={index} value={reg.name}>
                    {reg.name}
                  </option>
                ))}
              </select>
            </div>

            {/* zipcode */}
            <div className="w-1/2">
              <label
                htmlFor="ZipCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Zip Code
              </label>
              <input
                type="text"
                name="ZipCode"
                id="ZipCode"
                value={Credentials.ZipCode}
                onChange={changeHandler}
                placeholder="Enter your zip code"
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-accent focus:border-transparent transition-colors px-4 py-3"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="w-1/3">
              <label
                htmlFor="Country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Country
              </label>
              <select
                id="Country"
                // value={selectedCountry?.name || ""}
                onChange={handleCountryChange}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-accent focus:border-transparent transition-colors px-4 py-3"
              >
                {countriesList.map((country, index) => (
                  <option key={index} value={index}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-1/3">
              <label
                htmlFor="State"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                State
              </label>
              <select
                id="State"
                // value={selectedState?.name || ""}
                onChange={handleStateChange}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-accent focus:border-transparent transition-colors px-4 py-3"
              >
                {stateList.map((state, index) => (
                  <option key={index} value={index}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-1/3">
              <label
                htmlFor="City"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>
              <select
                id="City"
                // value={selectedCity?.name || ""}
                onChange={handleCityChange}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-accent focus:border-transparent transition-colors px-4 py-3"
              >
                {cityList.map((city, index) => (
                  <option key={index} value={index}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* checkbox */}
          <label className=" flex items-center gap-2 cursor-pointer mx-auto w-full max-w-xl">
            <input
              type="checkbox"
              onChange={(e) => setChecked(e.target.checked)}
              checked={checked}
              className="checkbox checkbox-primary bg-secondary opacity-20 w-6 h-6"
            />
            <span className="text-lGray font-bold text-xs">
              By creating an account, you agree to our{" "}
              <Link className="text-blued" to="/terms&policies">
                Terms & Policy
              </Link>
              {/* and, <Link>Notification Settings</Link> */}
            </span>
          </label>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-accent text-white rounded-lg shadow-md hover:bg-accent-dark transition-colors disabled:bg-opacity-50 cursor-not-allowed"
            disabled={loader || !checked || !Credentials.Email}
          >
            {loader ? <CircularLoader size="small" /> : "Sign Up"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
