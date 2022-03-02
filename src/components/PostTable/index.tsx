import * as React from 'react'
import { useEffect } from 'react'
import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridValueGetterParams,
} from '@mui/x-data-grid'
import dayjs from 'dayjs'
import './styles.css'
import { CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useFetchPosts from '../../hooks/useFetchPosts'

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', flex: 2, cellClassName: 'cell1' },
  { field: 'url', headerName: 'URL', flex: 2, cellClassName: 'cell2' },
  {
    field: 'author',
    headerName: 'Author',
    flex: 1,
    cellClassName: 'cell3',
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    description: 'This column has a created at value',
    sortable: true,
    flex: 1,
    cellClassName: 'cell4',
    valueGetter: (params: GridValueGetterParams) =>
      dayjs(params.row.created_at).format('MMM D, YYYY'),
  },
]

interface RowsState {
  page: number
  pageSize: number
  rows: GridRowModel[]
}

export default function PostTable() {
  const [rowsState, setRowsState] = React.useState<RowsState>({
    page: 0,
    pageSize: 20,
    rows: [],
  })

  const { data, status } = useFetchPosts(rowsState.page)

  const handleData = () => {
    if (data?.hits === rowsState.rows) {
      return
    }

    if (data) {
      const newRows = { ...rowsState, loading: false, rows: data.hits }
      setRowsState(newRows)
    }
  }

  useEffect(() => {
    handleData()
  }, [data])

  const navigate = useNavigate()

  return (
    <div style={{ width: '100%', marginBottom: 5 }}>
      {status === 'loading' && <CircularProgress role="Loader" />}
      {rowsState.rows?.length > 0 && (
        <DataGrid
          autoHeight
          columns={columns}
          rowsPerPageOptions={[20]}
          pagination
          rowCount={Math.floor(data.nbHits / rowsState.pageSize)}
          {...rowsState}
          getRowId={(row) => row.title}
          paginationMode="server"
          onPageChange={(page) => setRowsState((prev) => ({ ...prev, page }))}
          onPageSizeChange={(pageSize) =>
            setRowsState((prev) => ({ ...prev, pageSize }))
          }
          onCellClick={(cell) => {
            navigate('/details', {
              state: cell.row,
            })
          }}
        />
      )}
    </div>
  )
}
