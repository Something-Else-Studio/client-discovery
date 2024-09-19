export const ActionButton: React.FC<{ onClickFunction: () => void }> = ({
  onClickFunction,
}) => {
  return (
    <button
      className="block rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base px-4 sm:px-4 sm:min-w-40 h-16"
      onClick={onClickFunction}
    >
      See brand exercise
    </button>
  );
};
