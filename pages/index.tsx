import type { NextPage } from 'next'
import Head from 'next/head'

import Link from 'next/link'


const Home: NextPage = () => {
  const style = {
    display: 'flex', justifyContent:'space-between', height:"20vh", margin:"30px"
  }
  return (
    <div style={{height: '100%'}}>
      <Head>
        <title>YumEdu Project</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header style={style}>
        <div>Navigation</div>
        <Link href="/sign-in">
          <a style={{color:"red"}}>Log In</a>
        </Link>       
      </header>

      <main style={{height:"60vh"}}>
        body
      </main>

      <footer style={{height:"20vh"}}>footer</footer>

    </div>
  )
}

export default Home
