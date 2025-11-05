import { useState } from 'react'
import { Download } from 'lucide-react'
import Markdown from 'react-markdown'
import toast from 'react-hot-toast'

const CreationItem = ({item}) => {
    const [expanded, setExpanded] = useState(false);

    const downloadContent = () => {
      if (item.type === 'image') {
        // For images, download the image file
        fetch(item.content)
          .then(response => response.blob())
          .then(blob => {
            const element = document.createElement("a");
            element.href = URL.createObjectURL(blob);
            element.download = `${item.type}_${item.id}_${Date.now()}.png`;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            toast.success("Image downloaded successfully!");
          })
          .catch(() => toast.error("Failed to download image"));
      } else {
        // For text content (articles, blog titles, resume reviews)
        const element = document.createElement("a");
        const file = new Blob([item.content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${item.type}_${item.id}_${Date.now()}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        toast.success(`${item.type} downloaded successfully!`);
      }
    };

  return (
    <div className='p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg'>
      <div className='flex items-center justify-between gap-4'>
        <div onClick={() => setExpanded(!expanded)} className='flex-1 cursor-pointer'>
            <h2>{ item.prompt }</h2>
            <p className='text-gray-500'>{item.type} - {new Date(item.created_at).toLocaleDateString()}</p>
        </div>
        <div className='flex items-center gap-2'>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              downloadContent();
            }}
            className='flex items-center gap-1 bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-lg transition-colors'
            title="Download Content"
          >
            <Download className="w-3 h-3" />
            <span className="text-xs">Download</span>
          </button>
          <button 
            onClick={() => setExpanded(!expanded)}
            className='bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full'
          >
            {item.type}
          </button>
        </div>
      </div>

      {
        expanded && (
            <div>
                {item.type === 'image' ? (
                    <div>
                        <img src={item.content} alt='image' className='w-full mt-3 max-w-md' />
                    </div>
                ) :(
                    <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-700'>
                        <div className='reset-tw'>
                            <Markdown>{item.content}</Markdown>
                        </div>
                    </div>
                )}
            </div>
        )
      }
    </div>
  )
}

export default CreationItem
