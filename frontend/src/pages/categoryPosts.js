import Post from "../components/Post";
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
// import Category from "../../../backend/models/Category";

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [Category, setCategory] = useState([null]);

   const {id} =  useParams()

    // const fetchPosts = async () => {
    //     const response = await axios.get(`http://localhost:8000/api/posts/category/${id}`)
    //     setPosts(response.data);
    // }
    const fetchPosts = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/posts/category/${id}`);
          setPosts(response.data);
        } catch (error) {
          if (error.response) {
            console.error('Server responded with an error:', error.response.data);
          } else if (error.request) {
            console.error('No response received:', error.request);
          } else {
            console.error('Error:', error.message);
          }
        }
      };
      

	const fetchCategory = async () => {
        const response = await axios.get(`http://localhost:8000/api/categories/${id}`)
        setCategory(response.data);
    }


    useEffect(() => {
        fetchPosts();
		fetchCategory();
    }, [])

    if (!Category) {
        return <p>Loading...</p>
        
       }



    return <>

<main>
        <div class="container mt-4">
            <div class="row">
               
                <div class="col-lg-8">
                    <h1 class="mb-4">{Category.name}</h1>

                    {
                        posts.length > 0 ? posts.map((post) => <Post post={post} />) : <h4>No posts available</h4>
                    }

                 
                   
                </div>

               
            </div>
        </div>
    </main>

    </>
}