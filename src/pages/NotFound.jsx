const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Oops, something went wrong!!!
        </h1>
        <h1 className="text-3xl font-bold text-gray-800">404: Not Found</h1>
        <div className="mt-5 p-3 bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-xl">
          <a href="/">
            <button>Kembali</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
