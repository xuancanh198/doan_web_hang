'use client';

import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationProps {
  total: number;
  page: number;
  limit: number;
  onPageChange: (newPage: number) => void;
}

export default function BasicPagination({
  total,
  page,
  limit,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / limit);

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    onPageChange(value); 
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        color="primary"
      />
    </Stack>
  );
}
