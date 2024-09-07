import { useEffect, useState } from "react";
import appwriteService from '../appwrite/confg';
import {Container, PostCard} from '../components';

function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        appwriteService.getPosts().then((posts) =>{
            if(posts){
                setPosts(posts.documents);
            }
        });
    },[])
  
    if(posts.length !== 0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard {...post}/>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
    else{
        return(
            <h1 className="text-gray-500 dark:text-white text-3xl">Login to see the blogs</h1>
        )
    }
}

export default Home