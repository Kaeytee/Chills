// components/ErrorFallbacks.tsx
export const BlogListError = () => (
	<div className="p-8 text-center">
	  <h2 className="text-2xl font-bold text-red-600 mb-4">
	    Failed to load blog posts
	  </h2>
	  <p className="text-gray-600 dark:text-gray-400">
	    Please try refreshing the page or check back later.
	  </p>
	</div>
      );
      
      export const BlogDetailError = () => (
	<div className="p-8 text-center">
	  <h2 className="text-2xl font-bold text-red-600 mb-4">
	    Article load failed
	  </h2>
	  <p className="text-gray-600 dark:text-gray-400">
	    The requested article could not be loaded.
	  </p>
	</div>
      );
      
      export const CreatePostError = () => (
	<div className="p-8 text-center">
	  <h2 className="text-2xl font-bold text-red-600 mb-4">
	    Post creation failed
	  </h2>
	  <p className="text-gray-600 dark:text-gray-400">
	    Please try again or check your network connection.
	  </p>
	</div>
      );