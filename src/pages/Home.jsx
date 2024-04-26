import React from 'react'
import styles from './Home.module.css'
import { Link } from 'react-router-dom'
import HomeNav from '../components/HomeNav'

function Home() {
    return (
        <main className={styles.home}>
            <HomeNav />
            <section>
                <h1>
                    You travel the world.
                    <br />
                    Journey Mapper keeps track of your adventures.
                </h1>
                <Link to='/journey' className={styles.cta}>Start Tracking Now</Link>
            </section>
        </main>
    )
}

export default Home