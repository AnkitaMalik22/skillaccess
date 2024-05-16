import { toast } from "react-hot-toast";

class Notify {
  success(message) {
    toast.success(message, {
      id: "success",
      duration: 5000,
    });
  }

  error(message) {
    toast.error(message, {
      id: "error",
    });
  }

  timedSuccess(message, time) {
    toast.success(message, {
      duration: time,
    });
  }

  errorWithCustomIcon(message) {
    toast.error(message, {
      id: "errorCustomIcon",
      icon: "⚠️",
    });
  }

  load(message) {
    toast.loading(message, {
      id: "loading",
    });
  }

  clearloading() {
    toast.dismiss("loading");
  }
}

export const notify = new Notify();
