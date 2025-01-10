import React from 'react';
import EditorPanel from './_components/EditorPanel';
import OutputPanel from './_components/OutputPanel';

export default function Page() {
  return (
    <div className="min-h-screen mt-[4%]">
      <div className="mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <EditorPanel />
          <OutputPanel />
        </div>
      </div>
    </div>
  );
}
