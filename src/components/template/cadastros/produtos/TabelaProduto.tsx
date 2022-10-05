import Produto from "../../../../core/Produto"
import { IconeEdicao,
         IconeLixo,
         ChevronLeftIcon, 
         ChevronRightIcon,
         ChevronDobleRightIcon,
         ChevronDobleLeftIcon
        } from "../../../icons/index";
import {PageButton,ButtonPagination} from '../PageButton'
import React,{ useState  } from 'react'
import { 
        useTable, 
        useGlobalFilter, 
        useAsyncDebounce,
        useFilters,
        useSortBy,
        usePagination,
        useExpanded  
      } from 'react-table';

import SelectColumnFilter from '../../SelectColumnFilter'

interface TabelaProps{

    produtos:Produto[]
    produtoEditar?:(produto:Produto) => void
    produtoExcluir?:(produto:Produto) => void
}

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <label className="flex gap-x-2 items-baseline">
      <span className="text-gray-700">Search: </span>
      <input
        type="text"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </label>
  )
}

export default function TabelaProduto(props){

    const flagExibeAcoes    = props.produtoEditar || props.produtoExcluir;
    const ProdutosOrdenados = props.ProdutosOrdenados
    const Produtos          = props.produtos

    const getData = () => {
      const data = Produtos

      return [...data]
    }
    
    const data = React.useMemo(() => getData(), []);

    const columns = React.useMemo(
      () => [
        {
          Header: "Id",
          accessor: "id",
        },
        {
          Header: "Código",
          accessor: "codigo",
        },
        {
          Header: "Nome",
          accessor: "nome",
        },
        {
          Header: "Categoria",
          accessor: "categoria",
          Filter: SelectColumnFilter,  // new
          filter: 'includes',  // new
        },
        {
          Header: "Unidade",
          accessor: "unidade",
        },
        {
          Header: "Preço",
          accessor: "preco",
        },
        {
          Header: "Ações", 
          Cell: ({ row }) => renderizarAcoesTable({row}),
        },
      ],

      []
    );

    const { getTableProps, 
            getTableBodyProps, 
            headerGroups, 
            prepareRow,
            page, 
            canPreviousPage,
            canNextPage,
            pageOptions,
            pageCount,
            gotoPage,
            nextPage,
            previousPage,
            setPageSize,
            state, 
            preGlobalFilteredRows, 
            setGlobalFilter,
            state: { expanded },
            rows
          } =
    useTable(
    {
      columns,
      data
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
    );


    function renderizarDados(){
        return ProdutosOrdenados?.map((produto,i) => {
            let color = "";
            
            if(i % 2 === 0){
                color = 'bg-purple-200'
            }

            return (
                <tr key ={produto.id} className = {` ${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-300' } `} >
                    <td className='text-left p-3' >{produto.id}</td>
                    <td className='text-left p-3' >{produto.codigo}</td>
                    <td className='text-left p-3' >{produto.nome}</td>
                    <td className='text-left p-3' >{produto.categoria}</td>
                    <td className='text-left p-3' >{produto.unidade}</td>
                    <td className='text-left p-3' >{produto.preco}</td>
                    { flagExibeAcoes ? ( <td className='p-3 flex items-center justify-center'>{renderizarAcoes(produto)}</td> ) : false }
                </tr>    
            )
        })
    }

    function renderizarAcoes(produto){
        return (
            <div>
                { props.produtoEditar ? (
                    <button onClick = {() => props.produtoEditar?.(produto)} className = {`
                        text-green-500
                        rounded-full
                        hover:bg-purple-50 
                        p-3
                    `}>
                        { IconeEdicao }
                    </button>
                ) : false 
                }
                { props.produtoExcluir ? (
                        <button onClick = {() => props.produtoExcluir?.(produto)} className = {`
                            text-red-600
                            rounded-full
                            hover:bg-purple-50 
                            p-3
                        `}>
                        { IconeLixo }
                        </button>
                    ) : false
                }
            </div>
        ) 
    }

    function renderizarAcoesTable({row}){
      const produto = row.values;

      return (
          <div>
              { props.produtoEditar ? (
                  <button onClick = {() => props.produtoEditar?.(produto)} className = {`
                      text-green-500
                      rounded-full
                      hover:bg-purple-50 
                      p-3
                  `}>
                      { IconeEdicao }
                  </button>
              ) : false 
              }
              { props.produtoExcluir ? (
                      <button onClick = {() => props.produtoExcluir?.(produto)} className = {`
                          text-red-600
                          rounded-full
                          hover:bg-purple-50 
                          p-3
                      `}>
                      { IconeLixo }
                      </button>
                  ) : false
              }
          </div>
      )
  }
    if(Produtos) {
        
        return (
          <>
            <div className="flex gap-x-2">
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((column) =>
                column.Filter ? (
                  <div key={column.id}>
                    {column.render("Filter")}
                  </div>
                ) : null
              )
            )}
            </div>
            <div className="mt-2 flex flex-col">
              <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                      {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map(column => (
                            <th 
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              {...column.getHeaderProps(column.getSortByToggleProps())}>
                              {column.render('Header')}
                              <span>
                                {column.isSorted
                                  ? column.isSortedDesc
                                    ? ' ▼'
                                    : ' ▲'
                                  : ''}
                              </span>
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody 
                        {...getTableBodyProps()}
                        className="bg-white divide-y divide-gray-200"
                      >
                      {page.map((row, i) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                              return <td 
                                          {...cell.getCellProps()}
                                          className="px-6 py-4 whitespace-nowrap"
                                      >
                                      {cell.render("Cell")}
                                      
                                      </td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                    </table>
                  </div>
                </div>      
              </div>
            </div>
            {/* Pagination */}
            <div className="py-3 flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <ButtonPagination onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</ButtonPagination>
                <ButtonPagination onClick={() => nextPage()} disabled={!canNextPage}>Next</ButtonPagination>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div className="flex gap-x-2">
                  <span className="text-sm text-gray-700">
                    Page <span className="font-medium">{state.pageIndex + 1}</span> of <span className="font-medium">{pageOptions.length}</span>
                  </span>
                  <label>
                  <span className="sr-only">Items Per Page</span>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    value={state.pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                    }}
                  >
                    {[5, 10, 20].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </select>
                </label>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <PageButton
                      className="rounded-l-md"
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                    >
                      <span className="sr-only">First</span>
                      {ChevronDobleLeftIcon('h-5 w-5')}
                    </PageButton>
                    <PageButton
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      <span className="sr-only">Previous</span>
                      {ChevronLeftIcon('h-5 w-5')}
                    </PageButton>
                    <PageButton
                      onClick={() => nextPage()}
                      disabled={!canNextPage
                      }>
                      <span className="sr-only">Next</span>
                      {ChevronRightIcon('h-5 w-5')}
                    </PageButton>
                    <PageButton
                      className="rounded-r-md"
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                    >
                      <span className="sr-only">Last</span>
                      {ChevronDobleRightIcon('h-5 w-5')}
                    </PageButton>
                  </nav>
                </div>
              </div>
            </div>
          </>
          )

    } else {
        return (
            <>
            </>
        )
    }
}