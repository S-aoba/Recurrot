export const Navigation = () => {
  return (
    <div className=' col-span-2 flex justify-center'>
      <nav className=' w-full'>
        <div className=' flex w-full justify-center border-t-0 border-l-0 border-r-0 border-b border-solid border-gray-200'>
          <ul className=' flex w-9/12 list-none gap-x-5 pl-0 text-sm'>
            <li>質問</li>
            <li>イベント</li>
            <li>お知らせ</li>
            <li>ダッシュボード</li>
          </ul>
        </div>
        <div className=' flex w-full justify-center border-t-0 border-l-0 border-r-0 border-b border-solid border-gray-200'>
          <ul className=' flex w-9/12 list-none gap-x-5 pl-0 text-sm'>
            <li>新着</li>
            <li>回答募集中</li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
