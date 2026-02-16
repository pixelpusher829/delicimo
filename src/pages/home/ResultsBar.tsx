import { useSearchParams } from "react-router";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Recipe } from "@/types";

interface ResultsBarProps {
  recipes: Recipe[];
  allCuisines: string[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  selectedCuisine: string;
  setSelectedCuisine: (cuisine: string) => void;
}

const ITEMS_PER_PAGE = 5;

const ResultsBar: React.FC<ResultsBarProps> = ({
  recipes,
  allCuisines,
  currentPage,
  setCurrentPage,
  selectedCuisine,
  setSelectedCuisine,
}) => {
  const [searchParams] = useSearchParams();
  const searchLabel = searchParams.get("q");
  const totalPages = Math.ceil(recipes.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex justify-between flex-col md:flex-row gap-4 lg:grid grid-cols-3 items-center">
      <span className="text-2xl font-semibold">
        {recipes?.length || 0} Recipes
        {searchLabel && ` for "${searchLabel}"`}
      </span>
      <div>
                  <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        
      </div>
      <div className="flex items-center justify-end gap-2">
        <span className="hidden lg:block">Filter Results</span>
        <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Cuisine" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Cuisines</SelectItem>
              {allCuisines.map((cuisine) => (
                <SelectItem key={cuisine} value={cuisine}>
                  {cuisine}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ResultsBar;
