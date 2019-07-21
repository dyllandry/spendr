import React from 'react'
import styles from './Header.module.css'
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerFlex}>
        <h1 className={styles.siteTitle}>
          <Link className={styles.headerLink} to={'/'}>
            Spendr
            </Link>
        </h1>
        <nav role='navigation' aria-label='main navigation'>
          <ul
            role='menubar'
            className={styles.headerNavList}
          >
            <li role='none'>
              {/* only first menubar menuitem is tab-focusable */}
              <a
                href={'https://github.com/dyllandry/spendr'}
                role='menuitem'
                tabIndex={0}
                className={`${styles.headerLink} ${styles.headerNavLink}`}
              >
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
