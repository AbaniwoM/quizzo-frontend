import React from 'react';

export default function ToolCallIndicator({ toolName, args }: { toolName: string, args: any }) {
  const getToolDisplayName = () => {
    switch (toolName) {
      case 'generate_quiz': return 'Generating Quiz...';
      case 'grade_response': return 'Grading Response...';
      case 'summarize_performance': return 'Summarizing Performance...';
      default: return `Using Tool: ${toolName}`;
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 my-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50 max-w-sm">
      <div className="flex space-x-1 items-center justify-center bg-blue-500/20 text-blue-400 p-2 rounded-full h-8 w-8 animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l1.013.792c.11.087.163.226.163.351a7.525 7.525 0 000 1.118c0 .125-.053.264-.163.351l-1.013.792a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-1.012-.792c-.11-.087-.164-.226-.164-.351a7.525 7.525 0 000-1.118c0-.125.054-.264.164-.351l1.012-.792a1.875 1.875 0 00.432-2.385l-.923-1.597a1.875 1.875 0 00-2.28-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="text-sm font-medium text-zinc-300">
        {getToolDisplayName()}
      </div>
    </div>
  );
}
