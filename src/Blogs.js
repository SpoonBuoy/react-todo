import React from 'react';
import {useState} from 'react';
import useFetch from './useFetch';
import {
    Link
  } from 'react-router-dom';
const Blogs = () => {
    const {data : blogs, isPending, upvote_cnt} = useFetch('http://localhost:3000/blogs');
    const [upvotes, set_upvote] = useState(upvote_cnt);
    //console.log(upvote_cnt);
    function upvote_blog(id){
       var new_upvote_cnt = [...upvotes];
       new_upvote_cnt[id]++;
       set_upvote(new_upvote_cnt);
       console.log(new_upvote_cnt);
       const new_blog = blogs[id];
        new_blog.upvotes = upvotes[id];

       fetch('http://localhost:3000/blogs/' + id, {
           method : "PUT",
           upvotes : upvotes[id]
       })
       .then(() => {
           console.log("upvoted");
       })
    }
    if(upvote_cnt && upvotes === null){
        set_upvote(upvote_cnt);
    }
    return (
        <div className="Blogs">
            {isPending && <p>Loading...</p>}
            {upvotes && blogs && blogs.map((blog) => (
                <div className="Blog" key = {blog.id}>
                   <Link to = {'/blogs/'+ blog.id}> <h2 className="blog_title">{blog.title}</h2> </Link>
                   <h4 className="blog_author">{blog.author}</h4>
                   <span className="upvote_cnt">Upvotes : {upvotes[blog.id]}</span>
                   <span className="upvote_blog"> <button onClick = {()=>upvote_blog(blog.id)}> Upvote </button></span>
                  <br />
                   <span className="downvote_cnt">Downvotes : {blog.downvotes}</span>
                   <span className="downvote_blog"> <button> Downvote </button></span>

                </div>
            ))}
        </div>
      );
}
 
export default Blogs;