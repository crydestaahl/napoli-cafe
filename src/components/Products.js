import React from 'react'; 
import { Link, useStaticQuery, graphql } from 'gatsby';
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"

import Typography from "@material-ui/core/Typography"

const Products = () => {
    
    const data = useStaticQuery(graphql`
    query {
        site {
        siteMetadata {
            title
            author
        }
        }
        allMarkdownRemark(
        filter: {
            id: { eq: "f8bf6e56-7d0c-5a78-ab56-b7a25b450b4c" }
        }
        ) {
        edges {
            node {
            frontmatter {
                title
                featuredimage_1
                featuredimage_2
                description
            }
            internal {
                content
            }
            fields {
                slug
            }
            id
            }
        }
        }
    }
    `)

    // Styles for Material Ui
    const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    })

    const classes = useStyles()
    console.log(data.allMarkdownRemark)
    return (
        <div>
        { 
        data.allMarkdownRemark.edges.map(edge => {
        return (
            <Card className={classes.root}>
            <CardActionArea>
                <Link to={edge.node.fields.slug}>
                <CardMedia
                    className={classes.media}
                    image={
                    edge.node.frontmatter.featuredimage_1
                    }
                    title={edge.node.frontmatter.title}
                />
                </Link>
                <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                >
                    {edge.node.frontmatter.title}
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                >
                    {edge.node.frontmatter.description}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                <Link to={edge.node.fields.slug}>
                    Buy now!
                </Link>
                </Button>
            </CardActions>
            </Card>
        )
        })}
        </div>
    )
}

export default Products; 

