"use client";
import Filters from "@/components/Filters";
import Operations from "@/components/Operations";
import useFilters from "@/core/hooks/useFilters";
import { Operation } from "@/core/layouts/domain";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import { AnimatePresence } from "framer-motion";

const OperationsPage = () => {
  const { filtersOperations } = useFilters();
  const [operations, setOperations] = useState<Operation[]>([]);

  useEffect(() => {
    const loadOperations = async (): Promise<Operation[]> => {
      const response = await fetch("/api/operations");
      const operations = await response.json();
      return operations;
    };

    loadOperations().then((operations) => {
      setOperations(operations);
    });
  }, []);

  // useEffect(() => {
  //   let filteredOperations: Operation[] = []; // Initialize filteredOperations as an empty array
  //   if (operations.length > 0) {
  //     console.log("operations2", operations);
  //     operations.forEach(
  //       (operation: Operation) =>
  //         filteredOperations.push(...filtersOperations([operation])) // Wrap operation inside an array
  //     );
  //     console.log("filteredOperations", filteredOperations);
  //   }
  // }, [filtersOperations, operations]);

  return (
    <AnimatePresence>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="container mx-auto">
          <Filters />
          <Operations operations={filtersOperations(operations)} />
        </div>
      </Suspense>
    </AnimatePresence>
  );
};

export default OperationsPage;
