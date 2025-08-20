import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "@/lib/redux/store";
import { upsertFilterQueryObject, setIsServerSide } from "@/lib/redux/Features/Crud";

interface ClickComponentProps {
  column: string;
  value: string;
  children: React.ReactNode;
  className?: string;
}

const ClickComponent = ({ column, value, children, className }: ClickComponentProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isServerSide = useSelector((state: RootState) => state.crud.isServerSide);

  const handleClick = () => {
    if (!isServerSide) {
      dispatch(setIsServerSide(true));
    }
    dispatch(upsertFilterQueryObject({ column, value }));
  };

  return (
    <div onClick={handleClick} className={`cursor-pointer ${className || ''}`}>
      {children}
    </div>
  );
};

export default ClickComponent;
