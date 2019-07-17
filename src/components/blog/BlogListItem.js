import React from 'react';
import { CommentCount } from 'disqus-react';
import { Link } from 'gatsby';
import { Paper } from '@material-ui/core';

const BlogListItem = ({ path, node, config }) => {

    return (
        <Paper className="blog-item">
                <Link to={path} className="link">
                    <div className="image-holder">
                        <img
                            src={node.frontmatter.image}
                            className="image"
                            alt={node.frontmatter.title}
                        />
                    </div>
                    <div
                        className="post-info"
                        style={{ padding: '1em 1.4em 1.4em' }}
                    >
                        <span className="blog-item-meta date">
                            {node.frontmatter.date}
                        </span>
                        <span className="blog-item-meta comments">
                            <CommentCount
                                shortname={config.siteMetadata.disqusShortName}
                                config={{
                                    url: `${config.siteMetadata.siteUrl}${path}`,
                                    identifier: node.id,
                                    title: node.frontmatter.title,
                                }}
                            >
                                ...
                            </CommentCount>
                        </span>
                        <h4>{node.frontmatter.title}</h4>
                        {/* <p>{node.excerpt}</p> */}
                    </div>
                </Link>
        </Paper>
    );
};

export default BlogListItem;
