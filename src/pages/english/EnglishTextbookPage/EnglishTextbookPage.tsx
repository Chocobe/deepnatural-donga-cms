// FIXME: mockup page

// react
import {
  memo,
} from 'react';

function _EnglishTextbookPage() {
  return (
    <div style={{
      height: '100%',
      overflow: 'hidden',
    }}>
      <div className="p-5 h-full flex flex-col gap-5 overflow-auto">
        <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
          EN Box 1
        </div>
        <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
          EN Box 2
        </div>
        <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
          EN Box 3
        </div>
        <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
          EN Box 4
        </div>
        <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
          EN Box 5
        </div>
        <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
          EN Box 6
        </div>
        <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
          EN Box 7
        </div>
        <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
          EN Box 8
        </div>
        <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
          EN Box 9
        </div>
        <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
          EN Box 10
        </div>
      </div>
    </div>
  );
}

const EnglishTextbookPage = memo(_EnglishTextbookPage);
export default EnglishTextbookPage;
