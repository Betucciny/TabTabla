export default function Loading() {
  return (
    <div className="h-screen w-screen items-center justify-center flex bg-loteria-blue flex-col space-y-24">
      <div className="text-5xl md:text-9xl animate-pulse text-white">
        Loading...
      </div>
      <span className="loader"></span>
    </div>
  );
}
