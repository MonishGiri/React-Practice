import React from 'react';
import service from '../appwrite/confg';
import {Link} from 'html-react-parser';
function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        

<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg" src={service.getFilePreview(featuredImage)} alt={title} />
    <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}
        
    </div>
</div>

    </Link>
  )
}

export default PostCard