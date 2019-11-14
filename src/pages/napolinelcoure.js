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
            let pictures = data.response.posts[0].photos.map((pic, i) => {            
                return(                   
                    <div>
                       <img src={pic.original_size.url} />
                   </div>
               )
            })
            this.setState({pictures: pictures});
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
                            padding: '3em 0.4em 0',
                            textAlign: 'left',
                            animation: 'transition 8s'                                                 
                            }}                
                        >
                        NAPOLI EL COURE
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
