// import Visibility from "../../../components/collage/settings/Visibility/Visibility";
// import useTranslate from "../../../hooks/useTranslate";

// const VisibilityPage = () => {
//   useTranslate();
//   return <Visibility />;
// };

// export default VisibilityPage;

import React, { useState } from "react";
import Header from "../../../components/collage/settings/Visibility/Header";
import { Switch } from "@headlessui/react";
import useTranslate from "../../../hooks/useTranslate";

const Visibility = () => {
  useTranslate();
  const [enabled, setEnabled] = useState(false);
  const [enabled1, setEnabled1] = useState(false);
  const [enabled2, setEnabled2] = useState(false);
  const [enabled3, setEnabled3] = useState(false);

  return (
    <>
      <Header />

      <div className="flex gap-40 mt-20">
        <div className="sm:w-2/6">
          <h1 className="text-lg font-bold">Profile Visibility</h1>
          <p className="text-gray-400">
            Your profile visibility settings allow you to control who can view
            your profile information. You have the option to set your profile to
            be visible to:
          </p>
        </div>
        <div>
          {/* toggle 1 */}
          <div className="flex gap-4 mb-4">
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`self-center ${
                enabled
                  ? "bg-white border-2 border-blue-600"
                  : " border-2 border-gray-400"
              } relative inline-flex h-6 w-12 pr-2 items-center rounded-full`}
            >
              <span
                className={`${
                  enabled
                    ? "translate-x-6 bg-blue-600"
                    : "translate-x-1 bg-gray-400 "
                } inline-block h-4 w-4 transform rounded-full  transition`}
              />
            </Switch>

            <div>
              <h1 className="text-lg font-bold">Public</h1>
              <p className="text-gray-400">
                Your profile is visible to anyone visiting the platform.
              </p>
            </div>
          </div>

          {/* toggle2 */}
          <div className="flex gap-4 mb-4">
            <Switch
              checked={enabled3}
              onChange={setEnabled3}
              className={`self-center ${
                enabled3
                  ? "bg-white border-2 border-blue-600"
                  : " border-2 border-gray-400"
              } relative inline-flex h-6 w-12 pr-2 items-center rounded-full`}
            >
              <span
                className={`${
                  enabled3
                    ? "translate-x-6 bg-blue-600"
                    : "translate-x-1 bg-gray-400 "
                } inline-block h-4 w-4 transform rounded-full  transition`}
              />
            </Switch>

            <div>
              <h1 className="text-lg font-bold">Logged-in Users</h1>
              <p className="text-gray-400">
                Your profile is visible only to users who are logged into the
                platform.
              </p>
            </div>
          </div>
          {/* toggle 3 */}
        </div>
      </div>

      <div className="flex gap-40 mt-10">
        <div className="sm:w-2/6">
          <h1 className="text-lg font-bold">Assessment Results</h1>
          <p className="text-gray-400">
            Your assessment results are confidential and will only be visible to
            you, unless you choose to share them with others. You have the
            option to share your results with potential employers or colleagues
            through secure links generated within the platform.
          </p>
        </div>
        <div>
          {/* toggle 1 */}
          <div className="flex gap-4 mb-4">
            <Switch
              checked={enabled1}
              onChange={setEnabled1}
              className={`self-center ${
                enabled1
                  ? "bg-white border-2 border-blue-600"
                  : " border-2 border-gray-400"
              } relative inline-flex h-6 w-12 pr-2 items-center rounded-full`}
            >
              <span
                className={`${
                  enabled1
                    ? "translate-x-6 bg-blue-600"
                    : "translate-x-1 bg-gray-400 "
                } inline-block h-4 w-4 transform rounded-full  transition`}
              />
            </Switch>

            <div>
              <h1 className="text-lg font-bold">Public</h1>
              <p className="text-gray-400">
                Make your assessment results visible to everyone.
              </p>
            </div>
          </div>

          {/* toggle2 */}
          <div className="flex gap-4 mb-4">
            <Switch
              checked={enabled2}
              onChange={setEnabled2}
              className={`self-center ${
                enabled2
                  ? "bg-white border-2 border-blue-600"
                  : " border-2 border-gray-400"
              } relative inline-flex h-6 w-12 pr-2 items-center rounded-full`}
            >
              <span
                className={`${
                  enabled2
                    ? "translate-x-6 bg-blue-600"
                    : "translate-x-1 bg-gray-400 "
                } inline-block h-4 w-4 transform rounded-full  transition`}
              />
            </Switch>

            <div>
              <h1 className="text-lg font-bold">Logged-in Users</h1>
              <p className="text-gray-400">
                Your profile is visible only to users who are logged into the
                platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Visibility;
