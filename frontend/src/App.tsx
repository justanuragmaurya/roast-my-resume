import "./App.css";
import { useState } from "react";

function App() {

  const [file, setFile] = useState<File | null>(null);

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
    console.log(file?.name)
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
    console.log(file?.name)
  }

  return (
    <div className="text-white flex flex-col items-center mt-10 h-screen">
      <h2 className="font-black text-7xl font-mono mt-24">Roast my Resume</h2>
      <div className="flex flex-col gap-5 justify-center items-center mt-48">
        <p className="text-[#6a6a6a]">Upload your resume to get started!</p>
        <div
          className="bg-[#1e1e1e] border-[#3e3e3e] border-[1px] rounded-md flex items-center justify-center h-[500px] w-[800px]"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="bg-[#1e1e1e]"
            accept=".pdf"
            onChange={handleFileUpload}
          />
        </div>
        {file && <p className="text-green-500 mt-2">File selected: {file.name}</p>}
        <button className="bg-red-500 p-3 rounded-md px-10 text-[#0e0e0e] font-bold">
          Generate Roast!
        </button>
      </div>
    </div>
  );
}

export default App;
