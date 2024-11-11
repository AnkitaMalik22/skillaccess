import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ handleFilter, setStudents, uploadedStudents, students }) => {
    return (
        <header className="bg-gray-100 p-4 rounded shadow-md mt-4">

            <div className="flex space-x-4 mb-4">
                <input
                    onChange={(e) => setStudents(uploadedStudents.filter((student) => student.name.toLowerCase().includes(e.target.value.toLowerCase())))}
                    type="text"
                    placeholder="Search Students"
                    className="border p-2 rounded w-1/2"
                />
                <button onClick={handleFilter} className="bg-blued text-white px-4 py-2 rounded">Search Students</button>
            </div>
            <p className="text-lg">Total Students: {students.length}</p>
        </header>
    );
};

Header.propTypes = {
    handleFilter: PropTypes.func.isRequired,
    setStudents: PropTypes.func.isRequired,
    uploadedStudents: PropTypes.array.isRequired,
    students: PropTypes.array.isRequired,
};

export default Header;