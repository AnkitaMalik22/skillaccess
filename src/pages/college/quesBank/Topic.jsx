import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosSearch } from 'react-icons/io';
import { FaChevronLeft } from 'react-icons/fa';
import Folder from '../../../components/college/quesBank/home/icon/Folder';
import DeletePoP from '../../../components/PopUps/DeleetPoP';
import { getAllTopicsQB, deleteTopics } from '../../../redux/college/test/thunks/topic';
import { setCurrentTopic, setFilteredSections } from '../../../redux/college/test/testSlice';
import { getCategories } from '../../../redux/category/categorySlice';
import  { isUni,isCompany } from '../../../util/isCompany';

const Topic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const level = searchParams.get('level');

  const [selectedSections, setSelectedSections] = useState([]);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [query, setQuery] = useState({
    category: '',
    accessibleDepartments: [],
    hasAccessToAllDepartments: false,
    hasAccessToAllCategories: false
  });

  const { sections, filteredSections, GET_TOPICS_LOADING } = useSelector((state) => state.test);
  const { categories } = useSelector((state) => state.category);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllTopicsQB(query));
    dispatch(getCategories());
  }, [dispatch, query]);

  const handleFilterSections = (e) => {
    const value = e.target.value;
    if (value.trim() === '') {
      dispatch(setFilteredSections(sections));
    } else {
      dispatch(setFilteredSections(
        sections.filter((section) =>
          section.Heading.toLowerCase().includes(value.toLowerCase())
        )
      ));
    }
  };

  const handleSelect = (id) => {
    setSelectedSections(prev =>
      prev.includes(id) ? prev.filter(sectionId => sectionId !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    dispatch(deleteTopics(selectedSections));
    setVisible(false);
    setSelectedSections([]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'hasAccessToAllDepartments') {
        setQuery(prev => ({
          ...prev,
          hasAccessToAllDepartments: checked,
          accessibleDepartments: checked ? [] : prev.accessibleDepartments,
        }));
      } else if (name === 'accessibleDepartments') {
        setQuery(prev => ({
          ...prev,
          accessibleDepartments: prev.accessibleDepartments.includes(value)
            ? prev.accessibleDepartments.filter(dept => dept !== value)
            : [...prev.accessibleDepartments, value]
        }));
      }
    } else if (name === 'category') {
      setQuery(prev => ({
        ...prev,
        category: value,
        accessibleDepartments: [],
      }));
    }
  };

  const handleApplyFilter = () => {
    dispatch(getAllTopicsQB(query));
    setShowFilterPopup(false);
  };

  const getTotalQuestions = (topic) => {
    return (
      topic?.questions?.length +
      topic?.video?.length +
      topic?.compiler?.length +
      topic?.essay?.length +
      topic?.findAnswers?.length
    );
  };

  const randomImage = () => {
    const images = [
      '/images/FrontEnd.png',
      '/images/HR.png',
      '/images/Marketing.png',
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  return (
    <>
      {visible && (
        <DeletePoP
          visible={visible}
          setVisible={setVisible}
          handleDelete={handleDelete}
          handleCancel={() => {
            setVisible(false);
            setSelectedSections([]);
          }}
        />
      )}
      <div className="flex w-full mx-auto justify-between mb-6">
        <div className="flex gap-3">
          <button
            className="self-center object-center rounded-lg h-10 w-10"
            onClick={() => navigate(-1)}
          >
            <FaChevronLeft className="p-3 rounded-lg h-10 w-10 self-center bg-gray-200" />
          </button>
        </div>
        <div className="rounded-xl w-full sm:h-12 h-10 flex">
          <div className="w-fit mx-auto flex self-center bg-[#F8F8F9] rounded-xl px-5 py-3 gap-3">
            <IoIosSearch className="self-center w-6 h-6 bg-gray-100 rounded-s-lg text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              onChange={handleFilterSections}
              className="placeholder p-0 border-none self-center bg-gray-100 focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
            />
          </div>
        </div>
        <div className="flex gap-3 ">
          <div
            className="flex self-center bg-[#D9E1E7] rounded-lg p-2 cursor-pointer"
            onClick={() => setShowFilterPopup(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </div>
        </div>
      </div>
      {showFilterPopup && (
        <div className="absolute right-5 top-10 mt-12 mr-4 bg-white shadow-lg rounded-lg p-4 z-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">Filter Options</h3>
            <button onClick={() => setShowFilterPopup(false)} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              name="category"
              value={query.category}
              onChange={handleChange}
            >
              <option value="">All Categories</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                name="hasAccessToAllDepartments"
                checked={query.hasAccessToAllDepartments}
                onChange={handleChange}
                className="mr-2"
              />
              Has Access to All Departments
            </label>
          </div>
          {!query?.hasAccessToAllDepartments && (
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Departments</label>
              <select
                multiple
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                name="accessibleDepartments"
                value={query?.accessibleDepartments || []}
                onChange={(e) => {
                  const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
                  setQuery((prevQuery) => ({
                    ...prevQuery,
                    accessibleDepartments: selectedOptions,
                  }));
                }}
              >
                {categories &&
                  categories
                    .find((cat) => cat._id === query.category)?.departments?.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
              </select>
            </div>
          )}

          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleApplyFilter}
            >
              Apply
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-4 w-full justify-center bg-gray-100 p-5 rounded-3xl">
        <div className="w-full flex justify-between mb-5">
          <h2 className="font-bold text-xl">Choose a Topic</h2>
          <button className="flex gap-2 items-center">
            {selectedSections?.length > 0 && (
              <h3 className="text-sm mr-3 font-bold text-gray-500">
                {selectedSections?.length} / {sections?.length}
              </h3>
            )}
            <input
              name="select"
              type="checkbox"
              checked={selectedSections?.length > 0}
              className={`rounded bg-[#DEEBFF] border-none ${selectedSections.length > 0 ? 'w-6 h-6 ' : ' focus:ring-0 '
                }`}
              onChange={() => setVisible(selectedSections?.length > 0)}
            />
            {selectedSections?.length > 0 ? (
              <button
                className="rounded-xl bg-accent text-sm font-bold text-white py-2 px-4 ml-2 flex items-center gap-1"
                onClick={handleDelete}
              >
                Delete Selected
              </button>
            ) : (
              <label htmlFor="select" className="text-sm pl-1">
                Delete Selected
              </label>
            )}
          </button>
        </div>
        <div className="flex gap-5 flex-wrap">
          {GET_TOPICS_LOADING
            ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="w-[17rem] mb-4 bg-gray-200 rounded-2xl animate-pulse"
              >
                <div className="h-40 bg-gray-300 rounded-t-2xl"></div>
                <div className="card-body">
                  <div className="h-6 bg-gray-300 rounded-full w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded-full w-1/2"></div>
                </div>
              </div>
            ))
            : filteredSections &&
            filteredSections.map((section) => (
              <div
                className={`w-[17rem] mb-4 bg-white rounded-2xl cursor-pointer ${selectedSections.includes(section._id) ? 'border-2 border-[#0052CC]' : ''
                  }`}
                key={section._id}
                onClick={() => handleSelect(section._id)}
              >
                <figure>
                  <img src={randomImage()} alt="cover" />
                </figure>
                <div className="card-body">
                  <h2 className="font-bold text-xl first-letter:uppercase">
                    {section?.Heading}
                  </h2>
                  <div
                    className="flex gap-2"
                    onClick={() => {
                      dispatch(setCurrentTopic({ topic: section }));
                      localStorage.setItem('TopicDetails', JSON.stringify(section));
                      navigate(
                        isUni()
                          ? `/university/pr/quesbank/topic/${section._id}`
                          : (
                            isCompany() ? `/company/pr/quesbank/topic/${section._id}` : `/college/quesbank/topic/${section._id}`
                          )
                      );
                    }}
                  >
                    <Folder />
                    <p className="text-blued text-sm">{getTotalQuestions(section)} Files</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {filteredSections?.length === 0 && (
          <div className="w-full flex justify-center items-center mb-4 bg-white rounded-2xl">
            <h2 className="text-xl font-bold text-center">No Topics Found</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default Topic;