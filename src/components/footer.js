import React from 'react'; 

import '../pages/style.css';

const Footer = () => {
    return(
        <footer>
            © {new Date().getFullYear()}, Built with
              {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>{` `}
            edited by acidCode.
              Got something on your mind? Contact <a href="mailto:dimmi@napoli-cafe.com">Dimmi</a>.
        </footer>
    )
}

export default Footer; 