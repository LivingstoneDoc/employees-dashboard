import { create } from "zustand";
import type { Status } from "../types/employee";
import { PAGINATION } from "../constants/config";

export type SortDirection = "asc" | "desc" | null;

interface FilterState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: Status | null;
  setStatusFilter: (status: Status | null) => void;
  sortDirection: SortDirection;
  setSortDirection: (direction: SortDirection) => void;
  page: number;
  setPage: (page: number) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  statusFilter: null,
  setStatusFilter: (status) => set({ statusFilter: status }),
  sortDirection: null,
  setSortDirection: (direction) => set({ sortDirection: direction }),
  page: PAGINATION.DEFAULT_PAGE,
  setPage: (page) => set({ page }),
}));
