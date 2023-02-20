import { Avatar } from '@mantine/core'
import Image from 'next/image'

const QuestionDetail = () => {
  return (
    <main className=' flex h-fit flex-col items-center gap-y-10 p-5'>
      <div className=' w-10/12 border-t-0 border-r-0 border-b border-l-0 border-solid border-gray-200 bg-white px-3'>
        <h1>
          この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ
        </h1>
      </div>
      <div className=' w-8/12 border border-solid border-gray-200 bg-white p-5'>
        <div className=' py-5'>
          <div className=' flex items-center gap-x-2 border-t-0 border-r-0 border-b border-l-0 border-solid border-gray-200 pb-2 text-lg'>
            <Avatar radius={'xl'} />
            <span>質問者: Aoba</span>
            <span>質問投稿日: 2023 / 2 / 19</span>
          </div>
          <div className=' py-5'>
            <a className=' rounded-3xl border border-solid border-gray-200 p-3'>
              <Image
                src={'/typescript.png'}
                width={30}
                height={30}
                alt={'typescriptIcon'}
                className='mr-2 rounded-full'
              />
              <span>typescript</span>
            </a>
          </div>
          <DummyBody />
        </div>
      </div>

      <div className=' w-10/12 border-t-0 border-r-0 border-b border-l-0 border-solid border-gray-200 bg-white px-3'>
        <p className=' mb-0 pb-2 text-2xl'>
          <span className=' font-semibold text-blue-500'>4</span> 件の回答
        </p>
      </div>

      <DummyAnswer />
      <DummyAnswer />
      <DummyAnswer />
      <DummyAnswer />
    </main>
  )
}
export default QuestionDetail

const DummyBody = () => {
  return (
    <div>
      <ul>
        <li>何に困っているか:</li>
      </ul>
      <p>
        画面左側にある関数の入出力例を試したところ、最後の例（perfectNumberList(10000)）でタイムアウトによるエラーが発生する。
      </p>
      <ul>
        <li>期待する動作:</li>
      </ul>
      <p>タイムアウトが発生しないようにしたい。</p>
      <ul>
        <li>エラーの内容:</li>
      </ul>
      <p>
        エラーを検出しました。提出したコードはタイムアウトしました。提出したコードの計算量が多い、あるいは無限ループを持つ可能性があります。サーバで問題がありました。
      </p>
      <ul>
        <li>ソースコード:</li>
      </ul>
      <div className=' bg-gray-200 p-5'>
        <code>
          def perfectNumberList(n): output = for i in range(1, n + 1): # 調べる数は1からnまで(n含む) sumDivisor = 0 for
          j in range(1, i): # その数自身を除く数字 if i % j == 0: sumDivisor += j if sumDivisor == i: output += str(i) +
          - if output == : return none else: return output[:-1]
        </code>
      </div>
      <ul>
        <li>試したこと</li>
      </ul>
      <p>
        とにかく効率化しなければならないと思い、以下の二点を試しました。 1.
        出力がnoneになるのはnが1～5の時なので、nがこれらの時はループに入らないよう、最初に例外的に処理しました。 2. j を
        1～i まで動かすのではなく、1～i//2+1までしか動かさないようにしました。（内側ループは j が i
        の約数かどうかを調べるループですが、i が奇数でも偶数でも「2×○+ 1or0」の形をとるため。）
      </p>
    </div>
  )
}

const DummyAnswer = () => {
  return (
    <div className=' w-8/12 border border-solid border-gray-200 bg-white p-5'>
      <div className=' py-5'>
        <div className=' flex items-center gap-x-2 border-t-0 border-r-0 border-b border-l-0 border-solid border-gray-200 pb-2 text-lg'>
          <Avatar radius={'xl'} />
          <span>回答者: Aoba</span>
          <span>回答日: 2023 / 2 / 20</span>
        </div>
        <DummyBody />
      </div>
    </div>
  )
}
