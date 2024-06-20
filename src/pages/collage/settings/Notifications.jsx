import React, { useState } from "react";
import Header from "../../../components/collage/settings/notifications/Header";

import { Switch } from "@headlessui/react";
import useTranslate from "../../../hooks/useTranslate";

const Notifications = () => {
  //useTranslate();
  const [enabled, setEnabled] = useState(false);
  const [enabled1, setEnabled1] = useState(false);
  const [enabled2, setEnabled2] = useState(false);
  const [enabled3, setEnabled3] = useState(false);
  const [enabled4, setEnabled4] = useState(false);
  const [enabled5, setEnabled5] = useState(false);

  return (
    <>
      <Header />

      <div className="flex gap-40 mt-20">
        <div className="sm:w-2/6">
          <h1 className="text-lg font-bold">Email Notification</h1>
          <p className="text-gray-400">
            Get Emails to find out what’s going on when you are not online. You
            can turn these offs
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
              <h1 className="text-lg font-bold">News & Updates</h1>
              <p className="text-gray-400">News about product and features</p>
            </div>
          </div>

          {/* toggle2 */}
          <div className="flex gap-4 mb-4">
            <Switch
              checked={enabled4}
              onChange={setEnabled4}
              className={`self-center ${
                enabled4
                  ? "bg-white border-2 border-blue-600"
                  : " border-2 border-gray-400"
              } relative inline-flex h-6 w-12 pr-2 items-center rounded-full`}
            >
              <span
                className={`${
                  enabled4
                    ? "translate-x-6 bg-blue-600"
                    : "translate-x-1 bg-gray-400 "
                } inline-block h-4 w-4 transform rounded-full  transition`}
              />
            </Switch>

            <div>
              <h1 className="text-lg font-bold">News & Updates</h1>
              <p className="text-gray-400">News about product and features</p>
            </div>
          </div>
          {/* toggle 3 */}
          <div className="flex gap-4 mb-4">
            <Switch
              checked={enabled5}
              onChange={setEnabled5}
              className={`self-center ${
                enabled5
                  ? "bg-white border-2 border-blue-600"
                  : " border-2 border-gray-400"
              } relative inline-flex h-6 w-12 pr-2 items-center rounded-full`}
            >
              <span
                className={`${
                  enabled5
                    ? "translate-x-6 bg-blue-600"
                    : "translate-x-1 bg-gray-400 "
                } inline-block h-4 w-4 transform rounded-full  transition`}
              />
            </Switch>

            <div>
              <h1 className="text-lg font-bold">News & Updates</h1>
              <p className="text-gray-400">News about product and features</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-40 mt-10">
        <div className="sm:w-2/6">
          <h1 className="text-lg font-bold">Push Notifiaction</h1>
          <p className="text-gray-400">
            Get Emails to find out what’s going on when you are not online. You
            can turn these offs
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
              <h1 className="text-lg font-bold">News & Updates</h1>
              <p className="text-gray-400">News about product and features</p>
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
              <h1 className="text-lg font-bold">News & Updates</h1>
              <p className="text-gray-400">News about product and features</p>
            </div>
          </div>
          {/* toggle 3 */}
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
              <h1 className="text-lg font-bold">News & Updates</h1>
              <p className="text-gray-400">News about product and features</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
