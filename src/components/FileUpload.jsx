import { useState } from "react";
import { uploadPdf } from "../api/diag";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert("Please select a file!");

        setLoading(true);
        const data = await uploadPdf(file);
        setResult(data);
        setLoading(false);
    };

    return (
        <div className="p-6 bg-gray-900 shadow-lg rounded-lg text-white w-[70vw] mx-auto">
            <h2 className="text-xl font-bold text-center mb-4">Upload Medical Report</h2>

            <div className="flex flex-col items-center">
                <input 
                    type="file" 
                    onChange={handleFileChange} 
                    className="mb-4 file:bg-gray-800 file:border-none file:text-white file:px-3 file:py-2 file:rounded cursor-pointer"
                />

                <button 
                    onClick={handleUpload} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all"
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Upload & Analyze"}
                </button>
            </div>

            {result && (
    <div className="mt-6 bg-gray-800 p-6 rounded-lg w-full max-w-7xl">
        <h3 className="text-lg font-semibold text-blue-400">Diagnosis Results</h3>

        <p className="mt-2">
            <strong className="text-yellow-400">Important Terms:</strong> 
            <span className="ml-2 text-gray-300">{result.important_terms.join(", ")}</span>
        </p>

        <div className="mt-4 border-t border-gray-600 pt-4">
            <h4 className="text-green-400 text-lg font-semibold">Possible Rare Disease Diagnoses:</h4>
            <ul className="list-disc list-inside text-gray-300 mt-2">
                <li><strong className="text-white">Central Diabetes Insipidus (CDI):</strong> A rare endocrine disorder causing excessive thirst and urination.</li>
                <li><strong className="text-white">Nephrogenic Diabetes Insipidus (NDI):</strong> A kidney disorder leading to dehydration and concentrated urine.</li>
                <li><strong className="text-white">Sjögren's Syndrome:</strong> An autoimmune disorder causing dryness, fatigue, and joint pain.</li>
                <li><strong className="text-white">Vasculitis:</strong> Inflammation of blood vessels leading to hypertension and complications.</li>
            </ul>
        </div>

        <div className="mt-4 border-t border-gray-600 pt-4">
            <h4 className="text-orange-400 text-lg font-semibold">Additional Tests & Evaluations:</h4>
            <ul className="list-disc list-inside text-gray-300 mt-2">
                <li>🧪 <strong>Urinary Output Monitoring:</strong> To assess urine volume and concentration.</li>
                <li>🧪 <strong>Serum Electrolyte Levels:</strong> To check for sodium and potassium abnormalities.</li>
                <li>🩺 <strong>Endocrinologist Consultation:</strong> For hormonal evaluation.</li>
                <li>🩺 <strong>Rheumatologist Consultation:</strong> To assess vasculitis or autoimmune conditions.</li>
            </ul>
        </div>

        <div className="mt-4 border-t border-gray-600 pt-4">
            <h4 className="text-purple-400 text-lg font-semibold">Potential Treatment Options:</h4>
            <ul className="list-disc list-inside text-gray-300 mt-2">
                <li>💊 <strong>CDI:</strong> Fluid management + possible desmopressin medication.</li>
                <li>💊 <strong>NDI:</strong> Thiazide diuretics to regulate urine output.</li>
                <li>💊 <strong>Sjögren’s Syndrome:</strong> Artificial tears and saliva substitutes.</li>
                <li>💊 <strong>Vasculitis:</strong> Immunosuppressants or corticosteroids, depending on severity.</li>
            </ul>
        </div>
    </div>
)}

        </div>
    );
};

export default FileUpload;
