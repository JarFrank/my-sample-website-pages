const Blockquote = ({ children }: { children: React.ReactNode }) => {
  const before =
    "before:top-0 before:text-5xl before:absolute before:left-0 before:content-left-quote";
  const after =
    "after:bottom-[-25px] after:text-5xl after:absolute after:right-0 after:content-right-quote";
  const base = "text-base text-gray-600 my-5 relative italic p-5";
  return (
    <blockquote className={`${base} ${before} ${after}`}>{children}</blockquote>
  );
};
export default Blockquote;
