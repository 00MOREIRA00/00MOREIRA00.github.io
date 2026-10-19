import {useId, type ReactNode} from 'react';

type Tab<Id extends string> = {id: Id; label: ReactNode};

/** Abas horizontais com ativação automática e foco único na sequência de Tab. */
export default function AccessibleTabs<Id extends string>({
  tabs,
  selected,
  onSelect,
  label,
  className,
  id,
  panelClassName,
  children,
}: {
  tabs: readonly Tab<Id>[];
  selected: Id;
  onSelect: (id: Id) => void;
  label: string;
  className?: string;
  id?: string;
  panelClassName?: string;
  children: ReactNode;
}): ReactNode {
  const prefix = useId();
  return (
    <>
      <div
        id={id}
        className={className}
        role="tablist"
        aria-label={label}
        aria-orientation="horizontal"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={`${prefix}-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={selected === tab.id}
            aria-controls={`${prefix}-panel-${tab.id}`}
            tabIndex={selected === tab.id ? 0 : -1}
            onClick={() => onSelect(tab.id)}
            onKeyDown={(event) => {
              let next: number;
              switch (event.key) {
                case 'ArrowRight':
                  next = (index + 1) % tabs.length;
                  break;
                case 'ArrowLeft':
                  next = (index - 1 + tabs.length) % tabs.length;
                  break;
                case 'Home':
                  next = 0;
                  break;
                case 'End':
                  next = tabs.length - 1;
                  break;
                default:
                  return;
              }
              event.preventDefault();
              onSelect(tabs[next].id);
              const buttons =
                event.currentTarget.parentElement!.querySelectorAll<HTMLButtonElement>(
                  '[role="tab"]',
                );
              buttons[next].focus();
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${prefix}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${prefix}-tab-${tab.id}`}
          hidden={selected !== tab.id}
          tabIndex={0}
          className={panelClassName}
        >
          {selected === tab.id ? children : null}
        </div>
      ))}
    </>
  );
}
