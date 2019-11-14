import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"
import style from '../pages/style.css'
import useWindowSize from './use-window-size';


const Navbar = () => {
    const globalWindow = typeof window !== 'undefined' && window;
    let [pos, setPos] = useState(globalWindow.pageYOffset);
    let [visible, setVisible]  = useState(true); 
    const [isActive, setActive] = useState(false);
    const [height, setheight] = useState(98);
    
    const size = useWindowSize();
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

    function toggleIsActive() {
      setActive(isActive === false ? true : false) 
    }

    const deskotopNav = (   
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
    );

    const mobileNav = (
            <nav >
            <div 
                class={"container" + (isActive ? ' change' : '')} 
                onClick={ toggleIsActive }                
                >
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
            </div>     
                <div
                    class="mobile-nav-links"
                    style={{ 
                        height: (isActive ? height : 6),                        
                    }}
                >
                    <ul>
                        {menuLinks.map(link => (
                            <li
                                key={link.name}
                                style={{
                                    listStyleType: `none`,
                                    
                                }}
                            >
                                <Link                                
                                    style={{
                                        color: `black`,
                                        background: 'c8f331'
                                    }} to={link.link}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                            
                </div>
            </nav>               
    );

    return(
      <div>
      { size.width < 450 ? mobileNav : deskotopNav }
      </div>
    );                 
                
}

export default Navbar