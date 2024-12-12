import "./App.css";
import { useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [roast, setRoast] = useState<string>("");
  const BACKENDURL = import.meta.env.VITE_BACKEND_URL;

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
    console.log(file?.name);
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
    console.log(file?.name);
  }

  async function handleGenerateRoast() {
    if (!file) {
      alert("Please upload a resume first!");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch(BACKENDURL + "/roast/resume/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload resume");
      }

      const data = await response.json();
      setRoast(data.roast);
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Failed to upload resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (roast) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-4xl space-y-8 bg-transparent">
          <div className="bg-gradient-to-b from-[#0e0e0e] to-[#100000] border border-[#3e3e3e] rounded-xl p-6 md:p-8 text-white shadow-2xl">
            <div className="flex items-center gap-3 mb-6 bg-transparent">
              <div className="bg-red-500 rounded-full p-2">
                <FileText size={24} className="text-[#0e0e0e] bg-transparent" />
              </div>
              <h2 className="font-bold text-xl md:text-2xl text-red-500 bg-transparent">
                Can you handle this roast ?{" "}
              </h2>
            </div>
            <div className="prose prose-invert max-w-none bg-transparent">
              <p className="leading-relaxed whitespace-pre-wrap text-gray-300 bg-transparent">
                {roast}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-[#0e0e0e] p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="font-black text-4xl md:text-6xl lg:text-7xl text-center text-white font-mono mt-8 md:mt-12">
            Roast my Resume
          </h1>

          <div className=" flex flex-col space-y-4">
            <p className="text-[#6a6a6a] text-center">
              Upload your resume to get started!
            </p>

            <div
              className={`
                bg-[#0e0e0e] border-2 border-dashed border-[#3e3e3e] rounded-lg
                flex flex-col items-center justify-center p-6 md:p-10
                min-h-[300px] md:min-h-[400px] transition-colors
                ${!file ? "hover:border-red-500/50 cursor-pointer" : ""}
              `}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {file ? (
                <div className="text-center space-y-3">
                  <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                    <FileText className="h-6 w-6 text-green-500 bg-transparent" />
                  </div>
                  <p className="text-green-500">File selected: {file.name}</p>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
                    <Upload className="h-6 w-6 text-red-500 bg-transparent" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-white">Drag & drop your resume here</p>
                    <p className="text-sm text-[#6a6a6a]">or</p>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#2e2e2e] rounded-md cursor-pointer hover:bg-[#3e3e3e] transition-colors">
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        onChange={handleFileUpload}
                      />
                      <span className="text-white bg-transparent">
                        Choose file
                      </span>
                    </label>
                  </div>
                  <p className="text-sm text-[#6a6a6a]">PDF files only</p>
                </div>
              )}
            </div>
            <div className="flex justify-center items-center">
              <button
                className={`w-1-/2 md:w-1/2 px-8 py-3 rounded-lg font-semibold
                  flex items-center justify-center gap-2
                  transition-all duration-200
                  ${
                    isLoading
                      ? "bg-red-500/50 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 active:scale-95"
                  }
                `}
                onClick={handleGenerateRoast}
                disabled={isLoading || !file}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin bg-transparent" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="h-5 w-5 bg-transparent" />
                    Generate Roast!
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
