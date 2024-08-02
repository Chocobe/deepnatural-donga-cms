// react
import {
  useState,
  useMemo,
  useCallback,
  memo,
} from 'react';
// ui
import { 
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn-ui/ui/tabs';
// style
import './UsersTableHeader.css';

const filteringValueMapper = {
  ALL: 'all',
  ACTIVE: 'active',
  DEACTIVE: 'deactive',
} as const;
type TFilteringValue = typeof filteringValueMapper[keyof typeof filteringValueMapper];

const mockUsersCounts = {
  [filteringValueMapper.ALL]: 300,
  [filteringValueMapper.ACTIVE]: 200,
  [filteringValueMapper.DEACTIVE]: 100,
};

function _UsersTableHeader() {
  //
  // state
  //
  const [value, setValue] = useState<TFilteringValue>(filteringValueMapper.ALL);

  //
  // cache
  //
  const items = useMemo(() => {
    return [
      {
        text: `전체 사용자 (${mockUsersCounts[filteringValueMapper.ALL]})`,
        value: filteringValueMapper.ALL,
      },
      {
        text: `사용중 (${mockUsersCounts[filteringValueMapper.ACTIVE]})`,
        value: filteringValueMapper.ACTIVE,
      },
      {
        text: `사용중지 (${mockUsersCounts[filteringValueMapper.DEACTIVE]})`,
        value: filteringValueMapper.DEACTIVE,
      },
    ];
  }, []);

  //
  // callback
  //
  const onValueChange = useCallback((newValue: string) => {
    setValue(newValue as typeof value);
  }, []);

  return (
    <div className="UsersTableHeader">
      <Tabs 
        value={value}
        onValueChange={onValueChange}
      >
        <TabsList className="UsersTableHeader-tabList">
          {items.map(item => {
            const {
              text,
              value,
            } = item;

            return (
              <TabsTrigger
                key={value}
                className=""
                value={value}>
                {text}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
}

const UsersTableHeader = memo(_UsersTableHeader);
export default UsersTableHeader;
