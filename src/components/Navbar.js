import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"
import style from '../pages/style.css'


const Navbar = () => {
    let [pos, setPos] = useState(window.pageYOffset);
    let [visible, setVisible]  = useState(true); 
    const data = useStaticQuery(graphql`
        query Navbar {
            site {
                siteMetadata {
                    menuLinks {
                        name
                        link
                    }
                }
            }
        }
    `)  
    const { menuLinks } = data.site.siteMetadata

    useEffect(()=> {
        const handleScroll = () => {
            let temp = window.pageYOffset;

            setVisible(pos > temp);
            setPos(temp);
        };
        window.addEventListener("scroll", handleScroll);
            return(() => {
                window.removeEventListener("scroll", handleScroll);
            })
    })


    return(
        <div>
            <nav 
                className={"navbar " + (!visible ? "navbarHidden" : " ")}            
                style={{                
                    width: '100%',
                    zIndex: 1000,
                    background: 'white',
                    position: 'fixed',
                    boxShadow: '0 2px 5px 0px rgba(0,0,0,0.15)',
                    overflow: 'hidden'                
                }}
                >
                <ul 
                    style={{
                        display: "flex",
                        flex: 1,
                    }}>
                    {menuLinks.map(link => (
                        <li
                            key={link.name}
                            style={{
                                listStyleType: `none`,
                                padding: `1rem`,
                            }}
                        >
                            <Link 
                                className='navlistMobile'
                                style={{
                                    color: `black`,
                            }} to={link.link}>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div> 
    )
}

export default Navbar