import BlogList from "../blogs/pages/BlogList";

export default function Home() {
  return (
    <div>

      <div className="max-w-4xl mx-auto text-center mt-10 mb-7">
        <h1 className="text-3xl sm:text-6xl font-bold sm:leading-16 text-gray-900 dark:text-white">
          Share Your <span className="text-primary">Ideas</span> <br />
          With the World
        </h1>

        <p className="mt-6 sm:mt-8 max-w-2xl mx-auto text-sm sm:text-lg text-gray-600 leading-7">
          Create, publish, and share insightful articles with ease. Whether you're
          a developer, writer, entrepreneur, or storyteller, our platform gives you
          the tools to express your ideas, grow your audience, and make every word
          count.
        </p>
      </div>

      <BlogList />


    </div>
  )
}
