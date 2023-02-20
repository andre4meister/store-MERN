import { useParams } from 'react-router-dom';
import { useAppSelector } from './redux';

export const useGetItemInfo = () => {
  const { id } = useParams();
  const { itemInfo } = useAppSelector((state) => state.itemReducer);

  return { itemInfo, id };
};
