import { Search } from "lucide-react";

type Props = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: string;
  onFilterChange: (value: string) => void;
};

function TodoFilters({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
}: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2" />

          <input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10"
            placeholder="Search todos..." // Improves UX
          />
        </div>

        {/* Filter status dropdown */}
        <select
          value={filterStatus}
          onChange={(e) => onFilterChange(e.target.value)}
          className="px-3 py-2 border rounded-md"
          // Adds basic styling and improves consistency with input
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
    </div>
  );
}

export default TodoFilters;
