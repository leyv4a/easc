export default function ToursLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-md animate-pulse">
          <div className="h-56 bg-gray-200" />
          <div className="p-6 space-y-3">
            <div className="h-6 bg-gray-200 rounded-full w-3/4" />
            <div className="h-4 bg-gray-100 rounded-full w-full" />
            <div className="h-4 bg-gray-100 rounded-full w-5/6" />
            <div className="flex gap-2 mt-3">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-5 w-20 bg-gray-100 rounded-full" />
              ))}
            </div>
            <div className="h-px bg-gray-100 mt-4" />
            <div className="flex justify-between pt-1">
              <div className="h-4 w-28 bg-gray-100 rounded-full" />
              <div className="h-4 w-16 bg-gray-100 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
