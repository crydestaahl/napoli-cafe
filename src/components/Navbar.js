import React, { useState, useEffect, useRef } from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"
import instaLogo from '../../static/assets/instagram.png'
import style from '../pages/style.css'
// import useWindowSize from './use-window-size'; <-- Remove if shit looks good in production
// import isClient from './use-window-size'; <-- Remove if shit looks good in production

const Navbar = () => { 
    const size = useWindowSize();
    const globalWindow = typeof window !== 'undefined' && window;
    const prevScrollY = useRef(0);
    let [pos, setPos] = useState(globalWindow.pageYOffset);
    let [visible, setVisible]  = useState(true); 
    const [isActive, setActive] = useState(false);
    const [height, setheight] = useState(187);
    const [goingUp, setGoingUp] = useState(false); 
    
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


    // Listens for scroll on mobile
    useEffect(() => {
        const handleScroll = () => {
          const currentScrollY = window.scrollY;
          if (prevScrollY.current < currentScrollY && goingUp) {
            setGoingUp(false);
          }
          if (prevScrollY.current > currentScrollY && !goingUp) {
            setGoingUp(true);
          }
    
          prevScrollY.current = currentScrollY;
        };
    
        window.addEventListener("scroll", handleScroll, { passive: true });
    
        return () => window.removeEventListener("scroll", handleScroll);
      }, [goingUp]);
    
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



    function useWindowSize() {
        const isClient = typeof window === 'object'

        function getSize() {
            return {
                width: isClient ? window.innerWidth : undefined,
                height: isClient ? window.innerHeight : undefined
            };
        }

        const [windowSize, setWindowSize] = useState(getSize);

        useEffect(() => {
            if (!isClient) {
                return false;
            }

            function handleResize() {
                setWindowSize(getSize());
            }

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []); // Empty array ensures that effect is only run on mount and unmount

        return windowSize;
    }

    function toggleIsActive() {
        setActive(isActive === false ? true : false)
    }

    const desktopNav = (   
            <nav 
                className={"navbar " + (!visible ? "navbarHidden" : " ")}            
                style={{                
                    width: '100%',
                    zIndex: 1000,
                    background: 'white',
                    position: 'fixed',
                    boxShadow: '0 2px 5px 0px rgba(0,0,0,0.15)',
                    overflow: 'hidden',
                    top: 0                 
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
                                style={{color: `#333`, }} to={link.link}>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                    <li className='navlistMobile'
                        style={{ 
                            color: `#333`, 
                            listStyleType: `none`,
                            padding: `1rem`, 
                            marginLeft: 'auto' 
                            }}>
                                <a href="http://www.instagram.com/napolicafe_" target="_blank"><img src={instaLogo} style={{height: '30px', width: '30px'}}>
                            </img>
                            </a>
                        </li>
                    
                </ul>
            </nav>
    );

    const mobileNav = (
            <nav className={"donotshow mobile-navbar" + (!visible ? "navbarHidden" : " ")}>
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
                                        color: `#333`,
                                        background: 'c8f331'
                                    }} to={link.link}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        <li style={{listStyleType: `none`}}><a href="http://www.instagram.com/napolicafe_" target="_blank"><img src={instaLogo} style={{height: '25px', width: '25px'}}></img></a></li>
                    </ul>   
                </div>
            </nav>               
    );

    return(
      <div>
      { /*size.width < 450 ? mobileNav : deskotopNav */ }
      {mobileNav}
      {desktopNav}
      </div>
    );                 
                
}

export default Navbar