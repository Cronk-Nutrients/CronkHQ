'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export interface FilterConfig<T extends Record<string, string>> {
  defaultValues: T;
  basePath: string;
}

export function useUrlFilters<T extends Record<string, string>>({
  defaultValues,
  basePath,
}: FilterConfig<T>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filters, setFilters] = useState<T>(defaultValues);
  const [initialized, setInitialized] = useState(false);

  // Initialize filters from URL
  useEffect(() => {
    if (!initialized) {
      const newFilters = { ...defaultValues };
      Object.keys(defaultValues).forEach((key) => {
        const value = searchParams.get(key);
        if (value) {
          (newFilters as Record<string, string>)[key] = value;
        }
      });
      setFilters(newFilters);
      setInitialized(true);
    }
  }, [searchParams, initialized, defaultValues]);

  // Update URL when filters change
  const updateUrl = useCallback(
    (newFilters: Partial<T>) => {
      const merged = { ...filters, ...newFilters };
      const params = new URLSearchParams();

      Object.entries(merged).forEach(([key, value]) => {
        if (value && value !== defaultValues[key as keyof T]) {
          params.set(key, value);
        }
      });

      const url = params.toString() ? `${basePath}?${params.toString()}` : basePath;
      router.replace(url, { scroll: false });
    },
    [router, filters, defaultValues, basePath]
  );

  // Set a single filter
  const setFilter = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      updateUrl({ [key]: value } as unknown as Partial<T>);
    },
    [updateUrl]
  );

  // Clear a single filter
  const clearFilter = useCallback(
    <K extends keyof T>(key: K) => {
      setFilters((prev) => ({ ...prev, [key]: defaultValues[key] }));
      updateUrl({ [key]: defaultValues[key] } as unknown as Partial<T>);
    },
    [updateUrl, defaultValues]
  );

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setFilters(defaultValues);
    router.replace(basePath, { scroll: false });
  }, [router, defaultValues, basePath]);

  // Build active filters list for display
  const getActiveFilters = useCallback(
    (labelMap: Record<string, Record<string, string>>) => {
      const active: Array<{ key: string; label: string; value: string }> = [];
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== defaultValues[key as keyof T]) {
          const labels = labelMap[key] || {};
          active.push({
            key,
            label: key.charAt(0).toUpperCase() + key.slice(1),
            value: labels[value] || value,
          });
        }
      });
      return active;
    },
    [filters, defaultValues]
  );

  return {
    filters,
    setFilter,
    clearFilter,
    clearAllFilters,
    getActiveFilters,
    initialized,
  };
}
