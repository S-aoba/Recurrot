export const Footer = () => {
  return (
    <footer className=' flex justify-center border-t border-r-0 border-b-0 border-l-0 border-solid border-gray-200 py-5'>
      <div className=' flex w-9/12'>
        <span className=' text-3xl'>Recurrot</span>
        <div>
          <ul className=' flex list-none flex-col gap-y-3'>
            <li className=' text-xl font-semibold'>About</li>
            <li>Recurrotについて</li>
            <li>コミュニティガイドライン</li>
            <li>使い方</li>
            <li>よくある質問</li>
            <li>リリースノート</li>
            <li>開発ロードマップ</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
