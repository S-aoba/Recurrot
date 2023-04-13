type QuestionLayoutProps = {
  children: React.ReactNode
}

export const QuestionLayout: React.FC<QuestionLayoutProps> = ({ children }) => {
  return (
    <main className=' flex h-fit flex-1 justify-center bg-[#fafafa]'>
      <div className=' flex w-full max-w-[1200px] justify-center px-8'>
        <div className=' grid h-fit grid-cols-1 place-items-center gap-5 py-5 xs:grid-cols-2 sm:grid-cols-2 sm:place-items-stretch md:grid-cols-3 md:place-items-stretch'>
          {children}
        </div>
      </div>
    </main>
  )
}
