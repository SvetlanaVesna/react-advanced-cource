import React, {
  BaseSyntheticEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

function ChatListItem({ data }: { data: any }) {
  return <div>{data}</div>
}

function ChatBox() {
  const [state, setState] = useState<{ chatFetched: string[]; isFetching?: boolean }>({
    chatFetched: [],
    isFetching: false,
  })
  const listRef = useRef<HTMLDivElement | null>(null)
  const previousScrollDiff = useRef(0)

  // on mount
  useEffect(() => {
    new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
      console.log('fetching...')
      const chatFetched = [...state.chatFetched, ...['one', 'two', 'three']]
      setState({ chatFetched })
    })
  }, [])

  useLayoutEffect(() => {
    // use the captured snapshot here
    if (listRef.current)
      listRef.current.scrollTop =
        listRef.current.scrollHeight - previousScrollDiff.current
  }, [state.chatFetched])

  const onScroll = (event: BaseSyntheticEvent) => {
    const topReached = event.target.scrollTop === 0
    if (topReached && !state.isFetching) {
      setState({ ...state, isFetching: true })
      new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
        console.log('fetching...')

        const chatFetched = [...['one', 'two', 'three'], ...state.chatFetched]
        // here I am capturing the data ie.., scroll position
        if (listRef.current)
          previousScrollDiff.current =
            listRef.current.scrollHeight - listRef.current.scrollTop
        setState({ chatFetched, isFetching: false })
      })
    }
  }

  return (
    <div className="ui container">
      <div
        className="ui container chat list"
        style={{ height: '50px', width: '500px', overflow: 'auto' }}
        ref={listRef}
        onScroll={onScroll}
      >
        {state.chatFetched.map((message, i) => (
          <ChatListItem data={message} key={i} />
        ))}
      </div>
    </div>
  )
}

export default ChatBox
