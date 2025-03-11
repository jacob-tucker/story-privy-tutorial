type Card = {
  title: string;
  description: string;
  action: () => Promise<void>;
  icon: React.ReactNode;
};

export default function ActionCard({ card }: { card: Card }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all flex flex-col h-full">
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-6">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {card.icon}
            </svg>
          </div>
          <h3 className="text-lg font-medium">{card.title}</h3>
          <p className="mt-2 text-sm text-gray-500">{card.description}</p>
        </div>
        <div className="flex-1 flex items-end mt-auto">
          <button
            onClick={card.action}
            className="w-full rounded-md text-sm font-medium h-10 px-4 py-2 bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all"
          >
            {card.title}
          </button>
        </div>
      </div>
    </div>
  );
}
