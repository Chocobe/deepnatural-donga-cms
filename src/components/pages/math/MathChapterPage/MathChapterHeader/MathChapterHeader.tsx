// react
import {
  useState,
  useMemo,
  useCallback,
  memo,
} from 'react';
// ui
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shadcn-ui/ui/accordion';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
import SearchModalTrigger from '@/components/shadcn-ui-custom/searchModals/SearchModalTrigger/SearchModalTrigger';
import TBUTooltip from '@/components/shadcn-ui-custom/TBUTooltip/TBUTooltip';
// icon
import {
  LuChevronDown,
  LuFileOutput,
  LuPlus,
} from 'react-icons/lu';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathChapterHeader.css';

function _MathChapterHeader() {
  //
  // state
  //
  const [accordionValue, setAccordionValue] = useState('filters');
  // TODO: store 구현 후, 적용하기
  const [searchParams, setSearchParams] = useState({
    textbook: 'All',
  });

  //
  // callback
  //
  const openTextbookSearchModal = useCallback(() => {
    setSearchParams(old => ({
      ...old,
      textbook: old.textbook === 'All'
        ? `(Mock) 교과서 ${Math.ceil(Math.random() * 3)}`
        : 'All',
    }));
  }, []);

  //
  // cache
  //
  const filterItems = useMemo(() => [
    {
      Component: (
        <TBUTooltip key="textbook">
          <SearchModalTrigger
            // key="textbook"
            id="textbook"
            label="교과서"
            value={searchParams.textbook}
            onOpen={openTextbookSearchModal} />
        </TBUTooltip>
      ),
    },
  ], [searchParams, openTextbookSearchModal]);

  return (
    <div className="MathChapterHeader">
      <Accordion
        className="MathChapterHeader-accordion"
        type="single"
        value={accordionValue}
        onValueChange={setAccordionValue}
        collapsible>
        <AccordionItem
          className="border-0"
          value="filters">
          <AccordionTrigger 
            className="trigger" 
            isHideChevronIcon>
            <div className="title">
              교과서 단원 / Filter
              <LuChevronDown className={cn(
                'icon',
                accordionValue ? 'open' : 'close'
              )} />
            </div>
          </AccordionTrigger>

          <AccordionContent className="filters">
            {filterItems.map(item => {
              const {
                Component,
              } = item;

              return Component;
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="MathChapterHeader-actions">
        <TBUTooltip>
          <Button
            className="actionButton"
            disabled>
            <LuFileOutput className="icon" />
            Import
          </Button>
        </TBUTooltip>

        <TBUTooltip>
          <Button
            className="actionButton"
            disabled>
            <LuPlus className="icon" />
            Add 교과서 단원(대)
          </Button>
        </TBUTooltip>
      </div>
    </div>
  );
}

const MathChapterHeader = memo(_MathChapterHeader);
export default MathChapterHeader;
