import { useQuery } from 'react-query'
import axios from 'axios'
import { API_URL } from '../util/constants'

function useFetchPosts(page: number) {
  const { data, status } = useQuery(
    ['posts', page],
    async () => {
      const { data } = await axios.get(`${API_URL}?tags=story&page=${page}`)
      return data
    },
    { refetchInterval: 10000, keepPreviousData: true }
  )

  return { data, status }
}

export default useFetchPosts
