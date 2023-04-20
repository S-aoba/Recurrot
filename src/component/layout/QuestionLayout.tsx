type QuestionLayoutProps = {
  children: React.ReactNode
}

export const QuestionLayout: React.FC<QuestionLayoutProps> = ({ children }) => {
  return (
    <main className=' flex h-fit flex-1 justify-center bg-[#fafafa]'>
      <div className=' flex w-full max-w-[1200px] justify-center px-8'>
        <div className=' flex w-full max-w-[850px] flex-wrap place-content-start justify-center gap-5 py-5 sm:justify-between'>
          {children}
        </div>
      </div>
    </main>
  )
}
