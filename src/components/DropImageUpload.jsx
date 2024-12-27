import React from 'react'
import { useDropzone } from 'react-dropzone';
import { RxCross1 } from "react-icons/rx";
import { FiUpload } from "react-icons/fi";

const DropImageUpload = ({ setImage, image, setFile }) => {


    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setFile(file); // Set the file to state
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result); // Set the image preview to state
        };
        reader.readAsDataURL(file); // Read the file
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
    });
    return (
        <div className="flex flex-col items-center my-2 mx-6">
            {!image && <div
                {...getRootProps()}
                className={`border-2 w-full border-dashed rounded-lg p-6 cursor-pointer flex flex-col items-center justify-center ${isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100'
                    }`}
            >
                <input {...getInputProps()} />
                <p className="text-center text-gray-600">
                    {isDragActive ? 'Drop the files here...' : 'Drag and drop an image, or click to select one'}
                </p>

                <FiUpload className="text-3xl m-6 text-gray-400" />
            </div>}

            {/* Display the selected or dropped image */}
            {image && (

                <div className="indicator w-full">
                    <span className="indicator-item ">
                        <RxCross1 className="bg-accent text-white rounded-full p-1 w-6 h-6 cursor-pointer " onClick={() => { setImage("") }} />
                    </span>
                    <div className="mt-4">
                        <img src={image} alt="Uploaded" className=" rounded-lg shadow-md" />
                    </div>
                </div>

            )}
        </div>
    )
}

export default DropImageUpload