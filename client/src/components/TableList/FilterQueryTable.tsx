import React from 'react'
import CategoryFilter from './List/Filters/CategoryFilter'
import ProductFilter from './List/Filters/ProductFilter'

interface Filter {
    query  : string|null
 }
function FilterQueryTable({ query = null }: Filter) {
  let content;

  switch (query) {
    case "category":
      content = <CategoryFilter />;
      break;
     case "product":
      content = <ProductFilter />;
      break;
    default:
      undefined;
  }

  return <div className='my-[20px]'>{content}</div>;
}


export default FilterQueryTable