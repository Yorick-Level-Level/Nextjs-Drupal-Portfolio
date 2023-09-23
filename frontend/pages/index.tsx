import { initializeApollo } from '../src/lib/apolloClient'
import { ALL_PROJECTS_QUERY } from '../src/graphql/all_projects'
import { useQuery } from '@apollo/client'

import MainContainer from '@components/atoms/MainContainer/Component'
import Header from '@components/organisms/Header/Component'
import About from '@components/organisms/About/Component'
import Experience from '@components/organisms/Experience/Component'

export default function Home (): JSX.Element {
  const { data } = useQuery(ALL_PROJECTS_QUERY)

  return (
    <MainContainer>
      <Header />
      <About />
      <Experience />
    </MainContainer>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_PROJECTS_QUERY,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}
