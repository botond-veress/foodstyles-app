import React from 'react';

import { TodoItemCheckbox } from './TodoItemCheckbox';
import { TodoItemDeleteButton } from './TodoItemDeleteButton';

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

interface Props {
  items: TodoItem[];
  onToggle(id: string, completed: boolean): Promise<void>;
  onDelete(id: string): Promise<void>;
}

export const TodoList: React.FC<Props> = ({ items, onToggle, onDelete }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item.id} className="flex justify-between group cursor-default select-none">
        <div className="flex">
          <TodoItemCheckbox
            checked={item.completed}
            className="flex-shrink-0 mt-[2px]"
            onToggle={(checked) => onToggle(item.id, checked)}
          />

          <div className="px-2">{item.title}</div>
        </div>

        <TodoItemDeleteButton
          className="flex-shrink-0 mt-[2px] opacity-0 group-hover:opacity-100"
          onClick={() => onDelete(item.id)}
        />
      </li>
    ))}
  </ul>
);
