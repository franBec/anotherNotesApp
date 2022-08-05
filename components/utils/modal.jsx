//https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/modals/large

const Modal = ({ modalTitle, children }) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-6xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between px-4 py-2">
              <h3 className="text-3xl font-semibold">{modalTitle}</h3>
            </div>
            {/*body*/}
            <div className="relative py-4 pr-8 pl-4 flex-auto">{children}</div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
