import React, { Component } from 'react';
import Navbar from '../components/Navbar'
import Fade from 'react-reveal/Fade'
import { graphql } from "gatsby"


class napoliNelCorie extends Component {
   constructor() {
       super(); 
       this.state = {
           pictures: [],
       };
   }

    componentDidMount() {
        fetch("https://api.tumblr.com/v2/blog/napolicafeforever/posts/photo?api_key=FKLU3Uz1GfECLuNgoZ1U8qkjXtF2Zj9oCp0a25YOE1prDT5TIk")
        .then(results => {
            return results.json();
        }).then(data => {

            let layer1 = data.response.posts.map(albums => albums.photos) 
            let pictures = layer1.map(array => array.map((array2, i)  => {
                return(
                    <Fade cascade>                    
                        <div>
                            <img 
                                src={array2.original_size.url} 
                                loading="lazy" 
                                alt="photos from the heart of Napoli" 
                                style={{
                                    height: 'auto'
                                }}    
                                />
                        </div>
                    </Fade>
                )
            }))
            this.setState({ pictures: pictures });
        })           
    }

       render() {
        return(
            <Fade cascade>                        
                <div                    
                    style={{
                        textAlign: `center`
                    }}
                >
                    <Navbar />
                    <h2 
                        className="transition"                        
                        style={{
                            marginTop: `auto`,
                            padding: '3.5em 0.4em 0',
                            textAlign: 'left',
                            animation: 'transition 8s'                                                 
                            }}                
                        >
                        NAPOLI NEL CUORE
                    </h2>
                    <div>
                    {this.state.pictures}            
                    </div>
                </div>           
            </Fade>
        )
    }
}
export default napoliNelCorie
