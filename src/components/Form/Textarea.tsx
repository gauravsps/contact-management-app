import React from "react";

const Textarea = () => {
  return (
    <textarea
      name="message"
      className="
            block
            w-full
            mt-2 px-16 py-8
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
      rows={5}
    ></textarea>
  );
};

export default Textarea;
