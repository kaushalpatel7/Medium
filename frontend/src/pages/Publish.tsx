import axios from "axios";
import { AppBar } from "../components/AppBar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <AppBar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          <input
            onChange={(e) => {
              settitle(e.target.value);
            }}
            type="text"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Title"
          />
          <div className="pt-6">
          <TextEditor
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />
          </div>
          <button
            onClick={async () => {
              const res = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                  title,
                  content: description,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              navigate(`/blog/${res.data.id}`);
            }}
            type="submit"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
      
    </div>
  );
};

// function TextEditor({
//   onChange,
// }: {
//   onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
// }) {
//   return (
//     <form>
//       <div className="w-full mb-4 border rounded-2xl">
//         <div className="flex items-center justify-between px-3 py-2 border-b ">
//           <div className="px-4 py-2 bg-white rounded-b-lg w-full">
//             <label className="sr-only">Publish post</label>
//             <textarea
//               onChange={onChange}
//               id="editor "
//               rows={8}
//               className="block w-full px-3 text-lg text-gray-800 bg-slate-200 border-0"
//               placeholder="Write an article..."
//               required
//             ></textarea>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// }



function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [count,setCount] = useState(0)
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setCount(c=>c+1)
    onChange(e);
  };
  


  const applyStyle = (style: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);

    let formattedText = '';

    switch (style) {
      case 'bold':
        formattedText = `${selectedText}`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        // formattedText = `${selectedText}`;
        formattedText = `${selectedText}`

        break;
      case 'capitalize':
        formattedText = selectedText.toUpperCase();
        break;
      default:
        break;
    }
  
    
    const newText = text.substring(0, start) + formattedText + text.substring(end);
    setText(newText);

    setTimeout(() => {
      textarea.setSelectionRange(start, start + formattedText.length);
      textarea.focus();
    }, 0);
  };

  return (
    <form>
      <div className="w-full mb-4 border rounded-2xl">
        <div className="flex items-center justify-between px-3 py-2 border-b">
          <div className="flex space-x-2">
            <button
              type="button"
              className="px-2 py-1 text-lg font-bold"
              onClick={() => applyStyle('bold')}
            >
              <b>B</b>
            </button>
            <button
              type="button"
              className="px-2 py-1 text-lg italic"
              onClick={() => applyStyle('italic')}
            >
              <i>i</i>
            </button>
            <button
              type="button"
              className="px-2 py-1 text-lg underline"
              onClick={() => applyStyle('underline')}
            >
              U
            </button>
            <button
              type="button"
              className="px-2 py-1 text-lg capitalize"
              onClick={() => applyStyle('capitalize')}
            >
              Aa
            </button>
          </div>
        </div>
        <div className="px-4 py-2 bg-white rounded-b-lg w-full">
          <label className="sr-only">Publish post</label>
          <textarea
            onChange={handleTextChange}
            value={text}
            ref={textareaRef}
            id="editor"
            rows={8}
            className="block w-full px-3 text-lg text-gray-800 bg-slate-200 border-0"
            placeholder="Write an article..."
            required
          ></textarea>
          <div className="pt-2">Number of words are : <div></div>{count}</div>
        </div>
      </div>
    </form>
  );
}

export default TextEditor;
