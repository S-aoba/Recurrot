import Image from 'next/image'
import Link from 'next/link'

/**
 * @package
 */

type HashtagListProps = {
  hashtag: string
}

export const HashtagList: React.FC<HashtagListProps> = ({ hashtag }) => {
  return (
    <Link
      href={'/dashboard/new-questions'}
      key={hashtag}
      className=' flex items-center rounded-3xl border border-solid border-gray-200 px-3 py-1 text-black no-underline'
    >
      <Image
        src={`/langIcon/${hashtag}.svg`}
        width={20}
        height={20}
        alt={hashtag == 'csharp' ? 'C#' : `${hashtag}`}
        className='mr-2 rounded-full'
      />
      {hashtag == 'csharp' ? 'C#' : hashtag}
    </Link>
  )
}
