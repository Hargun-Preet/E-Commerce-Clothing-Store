const Modal = ({isOpen, onClose, children}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="absolute top-[40%] right-[50%] bg-black border-2 border-gray-700 p-4 rounded-lg z-10">
                    <div className=" flex flex-row gap-24">
                        <div className=" text-white font-semibold p-2">Update Category</div>
                        <button className="text-white font-semibold hover:text-gray-700 focus:outline-none mr-2 text-right" onClick={onClose}>X</button>
                    </div>
                    
                    {children}
                </div>
        </div>
      )} 
    </>
  );
};

export default Modal;
