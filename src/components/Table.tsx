import {
  Column,
  ColumnFiltersState,
  createColumnHelper,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,

} from '@tanstack/react-table'
import Moment from 'moment';
import React from 'react';

// To fix the typescript typing warning, copied from the documentation
// (https://tanstack.com/table/latest/docs/framework/react/examples/filters)
declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select'
  }
}

interface Repo {
  id: number,
  name: string,
  description: string,
  html_url: string,
  stargazers_count: number,
  forks_count: number,
  open_issues_count: number,
  language: string,
  created_at: string,
  updated_at: string,
}

const columnHelper = createColumnHelper<Repo>()

const columns = [
  columnHelper.accessor('name', {
    cell: info => info.getValue(),
    meta: {
      filterVariant: 'text',
    }
  }),
  columnHelper.accessor('description', {
    meta: {
      filterVariant: 'text',
    }
  }),
  columnHelper.accessor('stargazers_count', {
    header: () => 'stars',
    meta: {
      filterVariant: 'text',
    }
  }),
  columnHelper.accessor('forks_count', {
    header: () => 'forks',
  }),
  columnHelper.accessor('open_issues_count', {
    header: 'open issues',
  }),
  columnHelper.accessor('language', {
    meta: {
      filterVariant: 'text',
    }
  }),
  columnHelper.accessor('created_at', {
    cell: info => Moment.utc(info.getValue()).format('LL'),
  }),
  columnHelper.accessor('updated_at', {}),
]

function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue()
  const { filterVariant } = column.columnDef.meta ?? {}
  return filterVariant === 'text' ? (
    <div>
      <input type='text'
        onChange={event => column.setFilterValue(event.target.value)}
        placeholder={`Search`}
        value={(columnFilterValue ?? '') as string} 
        />
    </div>
  ) : <></>
}

export const Table = ({ repos }: { repos: Repo[] }) => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const table = useReactTable({
    data: repos,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
  })

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} />
                          </div>
                        ) : null}
                      </>
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div />
    </div>
  )
}