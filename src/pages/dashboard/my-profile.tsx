import { MyProfilePage } from '@/component/page/my-profile'

const MyProfile = () => {
  return <MyProfilePage />
}

export const getServerSideProps = async () => {
  return {
    props: {
      layout: 'WrapperLayout',
    },
  }
}

export default MyProfile
