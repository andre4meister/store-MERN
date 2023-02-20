import { Input } from 'antd';
import cn from 'classnames';
import { Dispatch, FC, memo, SetStateAction, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ObjectWithStringValues } from 'store/commonTypes';
import { setSearchedItems } from 'store/dashboard/dashboard';
import { ItemType } from 'store/item/item-types';
import { debounce } from 'utils/debounce';
import styles from './Search.module.scss';

interface SearchProps {
  searchedItems: ItemType[];
  isSearching: boolean;
  isSearchedFocused: boolean;
  searchValue: string;
  setIsSearchedFocused: Dispatch<SetStateAction<boolean>>;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
  setSearchValue: Dispatch<SetStateAction<string>>;
  fetchSearchValue: (value: ObjectWithStringValues) => void;
}
const { Search } = Input;

const MySearch: FC<SearchProps> = ({
  isSearchedFocused,
  isSearching,
  searchValue,
  searchedItems,
  setIsSearchedFocused,
  setIsSearching,
  setSearchValue,
  fetchSearchValue,
}) => {
  const onSearchBlur = () => {
    setSearchedItems([]);
    setIsSearchedFocused(false);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const debouncedChangeHandler = useCallback(debounce(onSearchChange, 1000), []);

  useEffect(() => {
    if (searchValue !== '') {
      fetchSearchValue({ name: searchValue });
      setIsSearching(false);
    }
  }, [searchValue]);
  // WIP Fix Unclicable items and search in general
  return (
    <div className={cn(styles.search, isSearchedFocused && styles.extendedSearch)} onBlur={onSearchBlur}>
      <Search
        className={styles.searchSpan}
        onFocus={() => setIsSearchedFocused(true)}
        placeholder="I`m looking for..."
        enterButton="Search"
        size="large"
        onChange={debouncedChangeHandler}
        loading={isSearching}
      />
      {searchValue && isSearchedFocused ? (
        <ul className={styles.searchedItems}>
          {searchedItems.length ? (
            searchedItems.map((item) => {
              return (
                <li className={styles.searchedListItem} key={item._id}>
                  <Link to={`/item/${item._id}/main`}>
                    <div className={styles.imageContainer}>
                      <img src={item.photos[0]} alt={item.name} />
                    </div>
                    <div className={styles.nameAndCategory}>
                      <div>{item.name}</div>
                    </div>
                  </Link>
                </li>
              );
            })
          ) : (
            <span>Items with such name not found</span>
          )}
        </ul>
      ) : null}
    </div>
  );
};

export default memo(MySearch);
