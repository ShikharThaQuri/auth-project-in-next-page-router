export default function Layout({ children }: any) {
  return (
    <>
      <div className="h-[60vh] bg-[#353535] flex justify-center items-center">
        {children}
      </div>
    </>
  );
}
