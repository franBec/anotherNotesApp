import { useState } from "react";

const CreateEditModalChildren = ({ setShowModal, onSubmit, noteData }) => {
  const [form, setForm] = useState({
    id: noteData?.id ?? null,
    title: noteData?.title ?? "",
    content: noteData?.content ?? "",
  });

  const [badForm, setBadForm] = useState(!form.title && "Title can't be empty");

  const checkIfFormIsOk = (form) => {
    if (!form.title || form.title.trim() === "") {
      return "Title can't be empty";
    }

    if (form.title.length > 255) {
      return "Title too long";
    }

    if (form.content.length > 255) {
      return "Content too long";
    }

    return false;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const tempObj = {
      ...form,
      [name]: value,
    };
    setForm(tempObj);

    setBadForm(checkIfFormIsOk(tempObj));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    !badForm && onSubmit.action(form);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        {badForm && <p className="text-right text-red-500">*{badForm}</p>}
      </div>
      <div className="grid grid-cols-5 gap-y-4">
        <div>
          <label htmlFor="title">Title:</label>
        </div>
        <div className="col-span-4">
          <input
            className="ml-2 pl-1 border-2 border-black w-full"
            type="text"
            value={form.title}
            name="title"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
        </div>
        <div className="col-span-4">
          <textarea
            className="ml-2 pl-1 border-2 border-black w-full h-32"
            value={form.content}
            name="content"
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className="flex items-center justify-end pt-4 space-x-4">
        <button
          className="border-2 drop-shadow-xl border-black py-1 px-2"
          type="button"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
        <button
          className={`${
            badForm && "bg-red-500"
          } border-2 drop-shadow-xl border-black py-1 px-2`}
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default CreateEditModalChildren;
