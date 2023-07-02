import React from 'react'
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
            {children}
           
        </>
    )
}

export default Layout