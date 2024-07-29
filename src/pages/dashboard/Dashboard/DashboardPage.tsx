// FIXME: mockup page

// react
import {
  memo,
} from 'react';

function _DashboardPage() {
  return (
    <div className="p-5 flex flex-col justify-center items-center gap-5">
      <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
        Box 1
      </div>
      <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
        Box 2
      </div>
      <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
        Box 3
      </div>
      <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
        Box 4
      </div>
      <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
        Box 5
      </div>
      <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
        Box 6
      </div>
      <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
        Box 7
      </div>
      <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
        Box 8
      </div>
      <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
        Box 9
      </div>
      <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
        Box 10
      </div>
    </div>
  );
}

const DashboardPage = memo(_DashboardPage);
export default DashboardPage;
