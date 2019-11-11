import React, { Component } from 'react';
import Navbar from '../components/Navbar'
import Fade from 'react-reveal/Fade'


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
                    {this.state.pictures}            
                </div>           
            </Fade>
        )
    }
}
export default napoliNelCorie
    
const key = 'FKLU3Uz1GfECLuNgoZ1U8qkjXtF2Zj9oCp0a25YOE1prDT5TIk'   
const hela = "https://api.tumblr.com/v2/blog/napolicafeforever/posts/photo?api_key=FKLU3Uz1GfECLuNgoZ1U8qkjXtF2Zj9oCp0a25YOE1prDT5TIk"