import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import Head from 'next/head'

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>
                    LOCAL FOOD-EXPRESS
                </title>
                <meta name='description' content='Get Your Intercontinental Dishes Delivered In No TIme' />
                <link rel="icon" href="/icon.png" />
            </Head>
            <NavBar />
            {children}
            <Footer />
        </>
    )
}

export default Layout