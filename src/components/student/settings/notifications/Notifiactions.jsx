import React, { useState } from "react";
import Header from "./Header";

import { Switch } from "@headlessui/react";

const Notifiactions = () => {
  const [enabled, setEnabled] = useState(false);
  const [enabled1, setEnabled1] = useState(false);
  const [enabled2, setEnabled2] = useState(false);
  const [enabled3, setEnabled3] = useState(false);
  const [enabled4, setEnabled4] = useState(false);
  const [enabled5, setEnabled5] = useState(false);
  const [enabled6, setEnabled6] = useState(false);
  const [enabled7, setEnabled7] = useState(false);

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
                  ? "bg-white border-2 border-blued"
                  : " border-2 border-gray-400"
              } relative inline-flex h-6 w-12 pr-2 items-center rounded-full`}
            >
              <span
                className={`${
                  enabled
                    ? "translate-x-6 bg-blued"
                    : "translate-x-1 bg-gray-400 "
                } inline-block h-4 w-4 transform rounded-full  transition`}
              />
            </Switch>

            <div>
              <h1 className="text-lg font-bold">Companies Onboarded</h1>
              <p className="text-gray-400">
                Updates about new companies onboarded
              </p>
            </div>
          </div>

          {/* toggle2 */}
          <div className="flex gap-4 mb-4">
            <Switch
              checked={enabled4}
              onChange={setEnabled4}
              className={`self-center ${
                enabled4
                  ? "bg-white border-2 border-blued"
                  : " border-2 border-gray-400"
              } relative inline-flex h-6 w-12 pr-2 items-center rounded-full`}
            >
              <span
                className={`${
                  enabled4
                    ? "translate-x-6 bg-blued"
                    : "translate-x-1 bg-gray-400 "
                } inline-block h-4 w-4 transform rounded-full  transition`}
              />
            </Switch>

            <div>
              <h1 className="text-lg font-bold">Job Openings</h1>
              <p className="text-gray-400">Updates about latest job openings</p>
            </div>
          </div>
          {/* toggle 3 */}
          <div className="flex gap-4 mb-4">
            <Switch
              checked={enabled5}
              onChange={setEnabled5}
              className={`self-center ${
                enabled5
                  ? "bg-white border-2 border-blued"
                  : " border-2 border-gray-400"
              } relative inline-flex h-6 w-12 pr-2 items-center rounded-full`}
            >
              <span
                className={`${
                  enabled5
                    ? "translate-x-6 bg-blued"
                    : "translate-x-1 bg-gray-400 "
                } inline-block h-4 w-4 transform rounded-full  transition`}
              />
            </Switch>

            <div>
              <h1 className="text-lg font-bold">Test Performance</h1>
              <p className="text-gray-400">
                Updates about your test scores and performances
              </p>
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <Switch
              checked={enabled6}
              onChange={setEnabled6}
              className={`self-center ${
                enabled5
                  ? "bg-white border-2 border-blued"
                  : " border-2 border-gray-400"
              } relative inline-flex h-6 w-12 pr-2 items-center rounded-full`}
            >
              <span
                className={`${
                  enabled6
                    ? "translate-x-6 bg-blued"
                    : "translate-x-1 bg-gray-400 "
                } inline-block h-4 w-4 transform rounded-full  transition`}
              />
            </Switch>

            <div>
              <h1 className="text-lg font-bold">Inbox</h1>
              <p className="text-gray-400">
                Updates about new messages in your inbox
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-40 mt-10">
        <div className="sm:w-2/6">
          <h1 className="text-lg font-bold">Push Notifcation</h1>
          <p className="text-gray-400">
            Get push notifications in-app to find out what’s going on when you
            are online.
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
                  ? "bg-white border-2 border-blued"
                  : " border-2 border-gray-400"
              } relative inline-flex h-6 w-12 pr-2 items-center rounded-full`}
            >
              <span
                className={`${
                  enabled1
                    ? "translate-x-6 bg-blued"
                    : "translate-x-1 bg-gray-400 "
                } inline-block h-4 w-4 transform rounded-full  transition`}
              />
            </Switch>

            <div>
              <h1 className="text-lg font-bold">Companies Onboarded</h1>
              <p className="text-gray-400">
                Updates about new companies onboarded
              </p>
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <Switch
              checked={enabled7}
              onChange={setEnabled7}
              className={`self-center ${
                enabled7
                  ? "bg-white border-2 border-blued"
                  : " border-2 border-gray-400"
              } relative inline-flex h-6 w-12 pr-2 items-center rounded-full`}
            >
              <span
                className={`${
                  enabled7
                    ? "translate-x-6 bg-blued"
                    : "translate-x-1 bg-gray-400 "
                } inline-block h-4 w-4 transform rounded-full  transition`}
              />
            </Switch>

            <div>
              <h1 className="text-lg font-bold">Job Openings</h1>
              <p className="text-gray-400">Updates about latest job openings</p>
            </div>
          </div>
          {/* toggle2 */}
          <div className="flex gap-4 mb-4">
            <Switch
              checked={enabled2}
              onChange={setEnabled2}
              className={`self-center ${
                enabled2
                  ? "bg-white border-2 border-blued"
                  : " border-2 border-gray-400"
              } relative inline-flex h-6 w-12 pr-2 items-center rounded-full`}
            >
              <span
                className={`${
                  enabled2
                    ? "translate-x-6 bg-blued"
                    : "translate-x-1 bg-gray-400 "
                } inline-block h-4 w-4 transform rounded-full  transition`}
              />
            </Switch>

            <div>
              <h1 className="text-lg font-bold">Test Performance</h1>
              <p className="text-gray-400">
                Updates about your test scores and performances
              </p>
            </div>
          </div>
          {/* toggle 3 */}
          <div className="flex gap-4 mb-4">
            <Switch
              checked={enabled3}
              onChange={setEnabled3}
              className={`self-center ${
                enabled3
                  ? "bg-white border-2 border-blued"
                  : " border-2 border-gray-400"
              } relative inline-flex h-6 w-12 pr-2 items-center rounded-full`}
            >
              <span
                className={`${
                  enabled3
                    ? "translate-x-6 bg-blued"
                    : "translate-x-1 bg-gray-400 "
                } inline-block h-4 w-4 transform rounded-full  transition`}
              />
            </Switch>

            <div>
              <h1 className="text-lg font-bold">Inbox</h1>
              <p className="text-gray-400">
                Updates about new messages in your inbox
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifiactions;
