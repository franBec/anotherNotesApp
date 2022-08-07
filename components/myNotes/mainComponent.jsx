import useSWR from "swr";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import yn from "yn";

import Grid from "./grid";
import Navbar from "./navbar";

import Modal from "../utils/modal";
import CreateEditModalChildren from "./createEditModalChildren";

import LoadingGrid from "../utils/loadingGrid";
import ErrorComponent from "../utils/errors/errorComponent";

const MainComponent = ({ archived }) => {
  //* ----- main content -----

  const fetchURL = `/api/notes?action=findAll&archived=${
    yn(archived) ? "true" : "false"
  }`;

  const fetchNotes = async (url) => {
    const res = await fetch(url);
    const resjson = await res.json();
    if (!resjson.success) {
      throw new Error(resjson.errorMessage);
    }
    return resjson;
  };

  const { data, error, mutate } = useSWR(fetchURL, fetchNotes);

  const renderContent = () => {
    if (error) {
      return <ErrorComponent message={error.toString()} />;
    }

    if (!data?.data) {
      return <LoadingGrid />;
    }

    return (
      <div className="space-y-5">
        <Navbar handleCreateNote={handleCreateNote} archived={archived} />
        <Grid
          data={data.data}
          actions={{
            handleEditNote,
            handleDeleteNote,
            handleArchiveNote,
          }}
        />
      </div>
    );
  };

  //* ----- Modal create/edit content -----

  const [showModal, setShowModal] = useState(false);
  const [noteInModal, setNoteInModal] = useState(null);
  const [handleSubmit, sethandleSubmit] = useState(null);

  const renderModal = () => {
    return (
      <Modal modalTitle="Create/Edit Note">
        <CreateEditModalChildren
          setShowModal={setShowModal}
          onSubmit={handleSubmit}
          noteData={noteInModal}
        />
      </Modal>
    );
  };

  //* ----- Handlers -----

  const handleCreateNote = () => {
    setNoteInModal(null);
    sethandleSubmit({ action: saveNote });
    setShowModal(true);
  };

  const handleEditNote = (id) => {
    setNoteInModal(data.data.filter((it) => it.id === id)[0]);
    sethandleSubmit({ action: editNote });
    setShowModal(true);
  };

  const handleDeleteNote = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this note?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNote(id);
      }
    });
  };

  const handleArchiveNote = (id, setArchive) => {
    archiveNote(id, setArchive);
  };

  //* ----- Save, Edit, Delete, Archive -----

  const saveNote = async (form) => {
    toast.promise(toast_savePromise(form), {
      loading: "Saving...",
      success: <b>Note saved!</b>,
      error: <b>Could not save</b>,
    });
  };

  const editNote = async (form) => {
    toast.promise(toast_editPromise(form), {
      loading: "Editing...",
      success: <b>Note edited!</b>,
      error: <b>Could not save</b>,
    });
  };

  const deleteNote = async (id) => {
    toast.promise(toast_deletePromise(id), {
      loading: "Deleting...",
      success: <b>Note deleted!</b>,
      error: <b>Could not delete</b>,
    });
  };

  const archiveNote = async (id, setArchive) => {
    toast.promise(toast_archivePromise(id, setArchive), {
      loading: `${setArchive ? "Archiving" : "Restoring"}...`,
      success: <b>Note {setArchive ? "archived" : "restored"}!</b>,
      error: <b>Could not {setArchive ? "archive" : "restore"}</b>,
    });
  };

  //* ----- Toast promises -----
  const toast_savePromise = async (form) => {
    setShowModal(false);
    setNoteInModal(null);

    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        action: "create",
        title: form.title,
        content: form.content,
      }),
    });

    mutate(fetchURL);

    const resjson = await res.json();
    if (resjson.status !== 200) {
      handleFetchError(resjson.errorMessage);
    }
  };

  const toast_editPromise = async (form) => {
    setShowModal(false);
    setNoteInModal(null);

    const res = await fetch("/api/notes", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        action: "update",
        id: form.id,
        title: form.title,
        content: form.content,
      }),
    });

    mutate(fetchURL);

    const resjson = await res.json();
    if (resjson.status !== 200) {
      handleFetchError(resjson.errorMessage);
    }
  };

  const toast_deletePromise = async (id) => {
    const res = await fetch("api/notes", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        action: "deleteById",
        id: id,
      }),
    });

    mutate(fetchURL);

    const resjson = await res.json();
    if (resjson.status !== 200) {
      handleFetchError(resjson.errorMessage);
    }
  };

  const toast_archivePromise = async (id, setArchive) => {
    const res = await fetch("api/notes", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        action: "archive",
        id: id,
        archived: setArchive,
      }),
    });

    mutate(fetchURL);

    const resjson = await res.json();
    if (resjson.status !== 200) {
      handleFetchError(resjson.errorMessage);
    }
  };

  //* ----- If fetch fails -----

  const handleFetchError = (error) => {
    console.error(error);
    throw new Error(error);
  };

  //* ----- Component return -----
  return (
    <div className="">
      {renderContent()}
      {showModal && renderModal()}
    </div>
  );
};

export default MainComponent;
