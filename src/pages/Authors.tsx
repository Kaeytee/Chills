import React from 'react'
import useAuthors from '../hooks/useAuthors';

const Authors: React.FC = () => {
	const { authors, loading, error } = useAuthors();
      
	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error loading authors</div>;
      
	return (
	  <div>
	    {/* Render authors */}
		{authors.map((author: { _id: React.Key; name: string; bio: string; avatar: string }) => (
	      <div key={author._id}>
		<h2>{author.name}</h2>
		<p>{author.bio}</p>
		<img src={author.avatar} alt={typeof author.name === 'string' ? author.name : 'Author'} />
	      </div>
	    ))}
	  </div>
	);
      };
      

export default Authors;