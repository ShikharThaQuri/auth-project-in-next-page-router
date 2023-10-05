export default function homeLayout() {
  return (
    <>
      <div className="h-[70vh] flex justify-center items-center bg-[#353535]">
        <div className="text-center">
          <h1 className="text-[2rem] font-bold text-[#80ed99] mb-[1rem]">
            Home Page
          </h1>
          <h2 className="text-[1.4rem] text-[#57cc99] leading-7">
            This website is made only for practice. You can make an user
            <br />
            and with that user you can access protected route.
          </h2>
        </div>
      </div>
    </>
  );
}
